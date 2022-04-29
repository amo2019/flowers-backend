import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import prisma from '../../../db';
import bcrypt from 'bcryptjs';
import {passwordPcrypt} from '../../../utils/bcrypt';

const secret = process.env.SECRET;

export default async function (req, res) {
  const { email, password } = JSON.parse(req.body);
  let user = {}
  try {
     user = await prisma.user.findFirst({
     where: {
       email
     }
   })
    //res.status(200).json({ user });
   } catch (err) {
    console.log("err::",err);
     //res.status(400).json({ message: 'Something went wrong' });
   }
  // Check in database
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;
  let token = null;
  const isMatch = await bcrypt.compare(password, user.password);
  //const match = passwordPcrypt(password, user.password);
  if (email === user.email && isMatch) {
    token = sign(
      {
        exp, 
        email,
      },
      secret
    );

    const serialised = serialize("MySiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 2,
      path: "/",
    });
    //const sessionToken = serialised.split('MySiteJWT=')[1].split(';')[0];
    const firstDay = new Date();
    const data = {sessionToken:token, userId: user.id, expires:exp};

    let session = null
      try {
        const allSessions = await prisma.session.findFirst({
          where: {
            userId: user.id,
          }
        })
        const existingItem = allSessions
        if (existingItem) {
          session =    await prisma.session.updateMany({
            where: {
              userId: existingItem.userId,
            },
            data: {
              ...data, expires: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
            }
          })
          //res.status(200).json(session);
        } else {

          session =   await prisma.session.create({
            data: {
              ...data, expires: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
              }
            }
          )
      //res.status(200).json(session);
        }
  } catch (err) {
    console.log("err:",err)
    res.status(400).json({ message: JSON.stringify(err)});
  }


    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}

