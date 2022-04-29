import prisma from '../../db';
import flowers from "../../flowers.json"; 


export default async ( req, res ) => {
  if (req.query.title && req.method === 'GET'){
    try {
     const product = await prisma.product.findFirst({
      where: {
        name: req.query.title
      },
      include: {
        reviews: true,
      }
      
    })
     res.status(200).json({ product });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.query.id && req.method === 'GET'){
    try {
     const product = await prisma.product.findFirst({
      where: {
        id: req.query.id
      },
      include: {
        reviews: true,
      }
    })
     res.status(200).json({ product });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'GET') {
    try {
      let products = []
      products = await prisma.product.findMany({})
     res.status(200).json({ products });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  if (req.method === 'PUT') {
    let product = null
    const data = JSON.parse(req.body);
      try {
        if(data.id){
        const allProductss = await prisma.product.findFirst({
          where: {
            id: data.id,
          }
        })
        const existingProduct = allProductss
        if (existingProduct) {
          product =    await prisma.product.update({
            where: {
              id: existingProduct.id,
            },
            data: {
              ...data
            }
          })
          res.status(200).json(product);
        }} else {
          delete data.id;
          product =   await prisma.product.create({
            data: {
              ...data
            }
          })
      res.status(200).json(product);
        }
  } catch (err) {
    console.log("err:",err)
    res.status(400).json({ message: JSON.stringify(err)});
  }
}

if (req.method === 'DELETE') {
    const data = JSON.parse(req.body);
    try {
        const product = await prisma.product.findFirst({
          where: {
            id: data.productId,
          }
        })
        if (!product) {
          res.status(400).json({ message: JSON.stringify({err: "not found"})});
        } 
      const response =  await prisma.product.deleteMany({
          where: {
            id: product.id
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


      product = await prisma.product.upsert({
            where: {
              id: data.id,
            },
            update: {
                ...data
            },
            create: {
                ...data
            },
          })
      } */