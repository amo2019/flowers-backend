import React, { useEffect, useState } from "react";
import CartItemComponent from "../cartItem/CartItemComponent";
import style from "../../styles/cartDropdown.module.css";
import CustomButton from '../customButton/CustomButton';
import {
  useCartItems, useClearCart, useRemoveFromCart
} from "../../zustand-store"

export default function CartDropdown({ toggleState, setToggleState }) {
  const items = useCartItems()
  useEffect(()=>{
  },[ items])
  const clearCart = useClearCart();
  return (
  <div className={style.cartDropdownContainer} >
    {items?.length ? (
      <div className={style.cartItemsContainer}>
        {items.map((cartItem) => (
          <CartItemComponent key={cartItem.productId} cartItem={cartItem}/>
        ))}
      </div>
    ) : (
      <span className={style.emptyMessageContainer}> {false? 'Your cart is empty': 'Your cart is empty (please login)'}</span>
    )}
    <div className={style.flexDiv}>
    {items?.length ? (
      <>
      <CustomButton
        onClick={() => {
          /* navigate("/checkout"); */
          setToggleState(!toggleState);
        }}
      >
        CHECKOUT
      </CustomButton>
      <CustomButton onClick={()=>clearCart()} >CLEAR CART</CustomButton>
      </>
    ) : (
      null
    )}
  </div>
  </div>
);
}