import prisma from '../../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(req.body);
      const cartItems = await prisma.cartItem.findMany({
        where: {
          userId: data.userId
        }
      });

      res.status(200).json({ cartItems });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
  if (req.method === 'POST') {
      let cartItem = null
      const data = JSON.parse(req.body);
        try {
          const allCartItems = await prisma.cartItem.findFirst({
            where: {
              userId: data.userId,
              productId: data.productId
            }
          })
          const existingItem = allCartItems
          if (existingItem) {
            cartItem =    await prisma.cartItem.updateMany({
              where: {
                productId: existingItem.productId,
                userId: data.userId
              },
              data: {
                quantity: existingItem.quantity + 1
              }
            })
            res.status(200).json(cartItem);
          } else {

            cartItem =   await prisma.cartItem.create({
              data: {
                product: {
                  connect: {
                    id: data.productId
                  }
                },
                user: {
                  connect: {
                    id: data.userId
                  }
                }
              }
            })
        res.status(200).json(cartItem);
          }
    } catch (err) {
      console.log("err:",err)
      res.status(400).json({ message: JSON.stringify(err)});
    }
  }

  if (req.method === 'DELETE') {
    let cartItem = null
      const data = JSON.parse(req.body);
      console.log("data::", data)
      try {
      if(data.productId==="delete"){
          const productsInCart = await prisma.cartItem.findMany({
            where: {
              userId: data.userId,
            }
          })
          const [existsInCart] = productsInCart
          if (!existsInCart) {
            res.status(400).json({ message: JSON.stringify({err: "not found"})});
          } else {
            const { userId } = existsInCart
            await prisma.cartItem.deleteMany({
              where: {
                userId
              },
            })
            res.status(200).json({ message: JSON.stringify({err: "deleted"})});
          }
      } else {
          const productInCart = await prisma.cartItem.findFirst({
            where: {
              userId: data.userId,
              productId: data.productId
            }
          })
          if (!productInCart) {
            res.status(400).json({ message: JSON.stringify({err: "not found"})});
          } else {
  
            const { productId , quantity } = productInCart
            if (quantity > 1) {
              cartItem = await prisma.cartItem.updateMany({
                where: {
                  productId: productId,
                  userId: data.userId
                },
                data: {
                  quantity: quantity - 1
                }
              })
              res.status(200).json(cartItem);
              } else {
              cartItem = await prisma.cartItem.deleteMany({
                where: {
                  productId: productInCart?.productId,
                  userId: data.userId
                }
              })
              res.status(200).json(cartItem);
              }
          }
        } 
      }catch (err) {
      res.status(400).json({ message: JSON.stringify(err)});
    }
   }
};

