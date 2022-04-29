import prisma from '../../db';

export default async (req, res) => {

  if (req.method === 'GET') {
    try {
      const data = JSON.parse(req.body);
      const session = await prisma.Session.findUnique({
        where: {
          email: data.email
        }
      });

      res.status(200).json({ session });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }

  if (req.method === 'PUT') {
      const data = JSON.parse(req.body);
        try {
          const session = await prisma.session.upsert({
            where: {
              email: data.email,
            },
            update: {
                ...data, expires: new Date(data.expires * 1000)
            },
            create: {
              ...data, expires: new Date(data.expires * 1000),
                user: {
                  connect: {
                    id: data.userId
                  }
                }
            },
          })
        res.status(200).json(session);
          
    } catch (err) {
      console.log("err:",err)
      res.status(400).json({ message: JSON.stringify(err)});
    }
  }
};






