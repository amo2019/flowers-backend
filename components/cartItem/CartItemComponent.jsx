import style from "../../styles/cartItem.module.css";
import {
 useRemoveFromCart, useCartItems, useAddToCart
} from "../../zustand-store";
import Image from "next/image";



const CartItemComponent  = ({ cartItem }) => {
  const cartItems = useCartItems()
  const addToCart = useAddToCart()
  const { productId, image, price, quantity, title } = cartItem;
  const removeFromCart = useRemoveFromCart();
  const handleCart = async (method) => {
    try {
      const req = await fetch('/api/cart', {
        method,
        body: JSON.stringify({
          quantity:   1, 
          userId: '18ec7f0c-68fc-4589-8294-06e6623971f4',
          productId: productId
        })
      });
      if (method !== 'POST') {removeFromCart({ productId });} else {
        addToCart(cartItem)
      }
      const res = await req.json();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.cartItemContainer}>
      <div className={style.cartItemImage}>
      <Image src={image} width="40" height="40" alt="item" />
      </div>
      <div className={style.itemDetailsContainer}>
        <span className={style.titleSpan}>{title}</span>
        <span >
          {quantity} x ${price}
        </span>
      </div>
      <div className={style.iconsContainer}>
      <div className={style.removeItemContainer} onClick= {handleCart.bind(this,'POST')}>
      &#128316;
      </div>
      <div className={style.removeItemContainer} onClick= {handleCart.bind(this,'DELETE')}>
      &#128317;
      </div>
      </div>
    </div>
  );
};


export default CartItemComponent;
