import prisma from '../../db';
import flowers from "../../flowers.json"; 


export default async ( req, res ) => {
  if (req.query.email && req.method === 'GET'){
    try {
     const user = await prisma.user.findFirst({
      where: {
        name: req.query.email
      },
      include: {
        orders: true,
      }
      
    })
     res.status(200).json({ user });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.query.id && req.method === 'GET'){

    try {
     const user = await prisma.user.findFirst({
      where: {
        id: req.query.id
      },
      include: {
        orders: true,
      }
    })
     res.status(200).json({ user });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'GET') {
    try {
      let users = []
      users = await prisma.user.findMany({})
     res.status(200).json({ users });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  if (req.method === 'POST') {
    let user = null
    const data = JSON.parse(req.body);
      try {
        const allUsers = await prisma.user.findFirst({
          where: {
            email: data.email,
          }
        })
        const existingusers = allUsers
        if (existingusers) {
          user =    await prisma.user.updateMany({
            where: {
              email: existingusers.email,
            },
            data: {
              ...data
            }
          })
          res.status(200).json(user);
        } else {

          user =   await prisma.user.create({
            data: {
              ...data
            }
          })
      res.status(200).json(user);
        }
  } catch (err) {
    console.log("err:",err)
    res.status(400).json({ message: JSON.stringify(err)});
  }
}

if (req.method === 'DELETE') {
    const data = JSON.parse(req.body);
    try {
        const user = await prisma.user.findFirst({
          where: {
            id: data.userId,
          }
        })
        if (!user) {
          res.status(400).json({ message: JSON.stringify({err: "not found"})});
        } 
       const response = await prisma.user.deleteMany({
          where: {
            id: user.id
          },
        })
        res.status(200).json(response);
    }catch (err) {
    res.status(400).json({ message: JSON.stringify(err)});
  }
 }

}

/* ,
      include: {
        review: {
          include: {
            user: true
          }
        }
      } */