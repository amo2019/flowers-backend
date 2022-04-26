import React, { useEffect, useState } from "react";
import CartItemComponent from "../cartItem/CartItemComponent";
import style from "../../styles/cartDropdown.module.css";
import CustomButton from '../customButton/CustomButton';
import {
  useCartItems, useClearCart, useAddItemsToChechoutCart
} from "../../zustand-store"
import {subTotalFormatted} from '../../utils/cart.utils'
import Router from 'next/router'


export default function CartDropdown({ toggleState, setToggleState }) {
  const items = useCartItems()
  const subTotal = subTotalFormatted(items)

  useEffect(()=>{
  },[ items])
  const clearCart = useClearCart();
  const addItemsToChechoutCart = useAddItemsToChechoutCart();
  const handleCart = async (method) => {
    try {
      const req = await fetch('/api/order', {
        method,
        body: JSON.stringify({
          userId: '18ec7f0c-68fc-4589-8294-06e6623971f4',
        })
      });
      setToggleState(!toggleState);
      const res = await req.json();
      addItemsToChechoutCart(items);
      Router.push("/checkout");
      clearCart();

    } catch (err) {
      console.log(err);
    }
  };
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
    {
      subTotal? <span className={style.total}>Total: {subTotal}</span> : <span className={style.total}>Cart Is Empty</span>
    }
    
    <div className={style.flexDiv}>

    {items?.length ? (
      <>
      <CustomButton
        onClick={ handleCart.bind(this,'POST')}
      >
        CHECKOUT
      </CustomButton>
      <CustomButton onClick= {handleCart.bind(this,'DELETE')} >CLEAR CART</CustomButton>
      </>
    ) : (
      null
    )}
  </div>
  </div>
);
}