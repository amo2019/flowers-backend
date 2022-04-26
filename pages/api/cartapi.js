import prisma from '../../db'; 

export const getUser = async function(user) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: user.id,
      }
    })
  } catch (error) {
  }
}
export const getCartItems = async function({id}) {
  try {
    return await prisma.cartItem.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
       user: true,
      }
    })
  } catch (error) {
  }
}

const formatMoney = function(amount) {
  const formatter = Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  })
  return formatter.format(amount)
}

export const  itemsInCart = async function(user, cartItem) {
  try {
    const items = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
        id: cartItem.id
      },
      include: {
        product: true
      }
    })
    return items
  } catch (error) {
  }
}
export const subTotalFormatted = async function(user, cartItem) {
  try {
    const items = await itemsInCart(user, cartItem)
    let finalTotal = 0
    let subTotatlFormatted = ''
    items?.forEach((item) => {
      finalTotal = item.quantity * +item.product.price
      subTotatlFormatted = `${item.quantity} x ${formatMoney(+item.product.price)} = ${formatMoney(finalTotal)}`
    })
    return subTotatlFormatted
  } catch (error) {
    return 0
  }
}

export const subTotal = async function(user, cartItem) {
  try {
    const items = await itemsInCart(user, cartItem)
    let finalTotal = 0
    items?.forEach((item) => {
      finalTotal = item.quantity * +item.product.price
    })
    return finalTotal
  } catch (error) {
    return 0
  }
}

export default async (req, res) => {
if (req.method === 'POST') {
  const data = JSON.parse(req.body);
  const user = await getUser({id: data.userId, name: "", email:"", password: ""});
  const cartItems = await getCartItems(user)
  //const items: any = await itemsInCart(user, cartItems)
  const total = await subTotal(user, cartItems)
  res.status(200).json(total);
}
}
