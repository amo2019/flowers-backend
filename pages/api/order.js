import prisma from '../../db';

export default async ( req, res ) => {
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(req.body);
      let orders = []
      orders = await prisma.order.findMany({
        where: {
          userId: data.userId
        },
        include: {
          items: {
            include: {
              products: true
            }
          },
          user: true
        }
      })
     res.status(200).json({ orders });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
  if (req.method === 'POST') {
      const data = JSON.parse(req.body);

      try {
        if (!data.userId) {
          res.status(400).json({ message: "please login"});
        }
  
        const userInDb = await prisma.user.findUnique({
          where: {
            id: data.userId
          },
          include: {
            cartItem: {
              include: {
                product: true
              }
            }
          }
        })
        const items = userInDb?.cartItem.filter((item) => item.product)
        const total = items?.reduce((newItem, product) => newItem += +product.product.price * product.quantity, 0)
        const extractedItems = items?.map((item) => {
          const orderItem = {
            quantity: item.quantity,
            products: { connect: { id: item.product.id } },
          }
          return orderItem
        })
        if (extractedItems?.length === 0 || total === 0) {
          res.status(400).json({ message: "You can not create an order with empty cart"});
        }
        await prisma.order.create({
          data: {
            total,
            items: { create: extractedItems },
            user: {
              connect: {
                id: userInDb?.id
              }
            }
          }
        })
        res.status(200).json({ items });
      } catch (error) {
        console.log("err:",error)
        res.status(400).json({ message: JSON.stringify(error)});
      }
    }

  if (req.method === 'DELETE') {
      const data = JSON.parse(req.body);
      console.log("data::", data)
      try {
        await prisma.cartItem.deleteMany({
          where: {
            user: {
              id: data.userId
            }
          }
        })
        res.status(200).json({ message: "deleted successfully" });
      }catch (err) {
      console.log("err:",err)
      res.status(400).json({ message: JSON.stringify(err)});
    }
   }
};