export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.productId === cartItemToAdd.productId
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.productId === cartItemToAdd.productId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
export const addItemsToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.productId === cartItemToAdd.productId
  );

if (!existingCartItem) return [...cartItems, { ...cartItemToAdd}];
  return [...cartItems];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.productId === cartItemToRemove.productId
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.productId !== cartItemToRemove.productId);
  }

  return cartItems.map(cartItem =>
    cartItem.productId === cartItemToRemove.productId
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const formatMoney = function(amount) {
  const formatter = Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  })
  return formatter.format(amount)
}

export const subTotalFormatted = (cartItems) => {
    let finalTotal = 0
    let subTotatlFormatted = ''
    cartItems.map((item) => {
      finalTotal += item.quantity * item.price
      subTotatlFormatted = `${formatMoney(finalTotal)}`
    })
    return subTotatlFormatted
}
