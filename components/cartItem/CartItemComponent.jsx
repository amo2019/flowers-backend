import style from "../../styles/cartItem.module.css";
import {
 useRemoveFromCart, useCartItems
} from "../../zustand-store";
import Image from "next/image";


const CartItemComponent  = ({ cartItem }) => {
  const removeFromCart = useRemoveFromCart();
  const cartItems = useCartItems()
  const { productId, image, price, quantity, title } = cartItem;
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
      <div className={style.removeItemContainer} onClick={removeFromCart.bind(this, { productId })}>
        &#128465;
      </div>
    </div>
  );
};


export default CartItemComponent;
