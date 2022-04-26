import React from 'react';
import style from "../../styles/ChechoutItem.module.css"

const ChechoutItem = ({ cartItem }) => {
  const { productId, name, image, price, quantity, category } = cartItem;
  return (
    <div className={style.checkoutItemContainer}>
      <div className='imageContainer'>
        <img src={image} alt='item' width ={100} height={100} />
      </div>
      <span className={style.textContainer}>{productId.substring(productId.length - 8)}</span>
      <div className={style.quantityContainer}>
        <div onClick={()=>{}}>&#10094;</div>
        <span className={style.spanClass}>{quantity}</span>
        <div onClick={() => {}}>&#10095;</div>
      </div>
      <span className={style.priceContainer}>{price}</span>
      <div className={style.removeButtonContainer} onClick={()=>{}}>
        &#128317;	
      </div>
    </div>
  );
};

export default ChechoutItem;
