const flowers = require('../flowers.json');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const data = flowers.map((item) => ({
  name: item.title,
  category: item.category,
  description: item.description,
  image: item.image,
  price: Math.floor(item.price),
}))

async function main() {
  for (let entry of data) {
    await prisma.product.create({
      data: {
        name: entry.name,
        category: entry.category,
        description: entry.description,
        image: entry.image,
        price: entry.price,
      },
    })
  }
}

main().finally(async () => {
  await prisma.$disconnect()
})