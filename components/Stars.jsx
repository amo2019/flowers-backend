import React, { useState, useRef } from 'react'
import style from "../styles/Stars.module.css";

export const Stars = ({review, setUserReview, userReview}) => {
  const listRef = useRef();
  const divRef = useRef();
  const starsArray = (Array(7).fill(0))
  const [currentValue, setCurrentValue] = useState(review);
  const [previousValue, setPreviousValue] = useState(review);
  const [hoverValue, setHoverValue] = useState(undefined);
  
  const handleClick = (ref, value) => {
    setCurrentValue(value);
    setPreviousValue(value);
    setUserReview({ ...userReview, starsNo: value });
    (hoverValue || currentValue) > value ? (ref.currentTarget.classList.add("Stars_star__as_6J"), ref.currentTarget.classList.remove("Stars_rated__BbAJY")) : (ref.currentTarget.classList.add("Stars_rated__BbAJY"), ref.currentTarget.classList.remove("Stars_star__as_6J"));
    starSpans();
  }

  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
    setCurrentValue(previousValue)
  }
  const starSpans = ()=>
     starsArray.map((item, index) => (
       <span key={index} className={(currentValue > index) ? style.rated : style.star } onMouseOver={() => {setHoverValue(index + 1); setCurrentValue(index + 1);}}
       onMouseLeave={()=>handleMouseLeave(currentValue)} ref={listRef} onClick={(item)=>handleClick( item, index + 1)}>&nbsp;</span>
       ))

  return (
    <>
    <h3> 7-Star Rating</h3>
    <div className={style.stars} ref={divRef} data-rating="4">
    { starSpans() }
    </div>
    </>
  )
}