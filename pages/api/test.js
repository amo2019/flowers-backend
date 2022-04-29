export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.MySiteJWT;

  if (!jwt) {
    return res.json({ message: "Invalid token!" });
  }

  return res.json({ data: "secret data!" });
}