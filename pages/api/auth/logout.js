import { serialize } from "cookie";

export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.MySiteJWT;

  if (!jwt) {
    return res.json({ message: "you are not logged in!" });
  } else {
    const serialised = serialize("MySiteJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "You have successfuly logged out!" });
  }
}