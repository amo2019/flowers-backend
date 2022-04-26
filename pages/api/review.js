import prisma from './../../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(req.body);
      const reviews = await prisma.review.findMany({
        where: {
          productId: data.productId
        }
      });

      res.status(200).json({ reviews });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    let review = null
    try {
      const allReviews = await prisma.review.findFirst({
        where: {
          userId: data.userId,
          productId: data.productId,
        }
      })
      const existingReview = allReviews
      if (existingReview) {
        review =    await prisma.review.updateMany({
          where: {
            userId: data.userId,
            productId: data.productId,
          },
          data: {
            ...data
          }
        })
        res.status(200).json(review);
      } else {

      const review = await prisma.review.create({
        data: {
          text: data.text,
          rating: data.rating,
          user: {
            connect: {
              id: data.userId
            }
          },
          product: {
            connect: {
              id: data.productId
            }
          }
        },
        include: {
          user: true
        }
      });

      res.status(200).json(review);
    }
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
};
