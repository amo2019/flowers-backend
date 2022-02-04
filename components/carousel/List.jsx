import styles from "../../styles/List.module.css"
import ListItem from "./ListItem";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import products from "../../flowers.json"

export default function List() {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const list = products.slice(0, 10)
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 4) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className={styles.list}>
      <div className={styles.wrapper}>
{/*         <ArrowBackIosOutlined
          className={styles.sliderArrow}
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        /> */}
        <div className={styles.container} ref={listRef}>
        {list.map(card => (
              <ListItem key={card.productId} product={card} index={card.productId - 1 } title={card.title}/>
          ))}
        </div>
{/* 
        <ArrowForwardIosOutlined
          className={styles.sliderArrow}
          onClick={() => handleClick("right")}
        /> */}
      </div>
    </div>
  );
}
