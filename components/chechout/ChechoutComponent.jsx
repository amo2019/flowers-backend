import ChechoutItem from '../chechoutItem/ChechoutItem';
import style from "../../styles/Chechout.module.css";
import {
  useChechoutCart
} from "../../zustand-store";
import { useState } from 'react';

const CheckoutPage = ({cartItems}) => {
  const chechoutCartObj = useChechoutCart();
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const currency = "USD";
  const styles = { layout: "vertical" };
  const API_SERVER = "http://localhost:8080";

  const chechoutCart = Object.values(chechoutCartObj).flat();

  const total = chechoutCart.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  ) 

  return (
  <>
  <div className={style.checkoutPageContainer}>
    <div className={style.checkoutHeaderContainer}>
      <div className={style.headerBlockContainer}>
        <span>Product</span>
      </div>
      <div className={style.headerBlockContainer}>
        <span>Description</span>
      </div>
      <div className={style.headerBlockContainer}>
        <span>Quantity</span>
      </div>
      <div className={style.headerBlockContainer}>
        <span>Price</span>
      </div>
      <div className={style.headerBlockContainer}>
        <span>Remove</span>
      </div>
    </div>
    {chechoutCart.map((cartItem, index) => {
      return <ChechoutItem key={cartItem.id} cartItem={cartItem} />
    }
    )}
 <button onClick={() => setOpen(true)} className={style.button}>
              CHECKOUT NOW!
            </button>

    <button className={style.clearButton} onClick={()=>{}} >
              Clear Cart
    </button>
    </div>
    <div className={style.warningContainer}>
     Transaction
    </div>
</>
  )
}

export default CheckoutPage;
