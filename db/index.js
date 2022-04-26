import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  console.log("connected-pro")
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    console.log("connected-dev")

  }
  prisma = global.prisma;
  console.log("connected....")

}

export default prisma;
