import styles from "../../styles/ListItem.module.css";
import {
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ListItem({ product, index, title }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.listItem}
      style={{ left: isHovered && index * 255 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link  href={`/flowers/${title}`} passHref>
        <div className={styles.imageStyle}>
            <Image
            src={`${process.env.NEXT_PUBLIC_URL}/flowers/${product.image}`}  
            alt="" 
            width="150"
            height="120"
            objectFit="cover"
            />
      </div>
      </Link>
      {isHovered && (
        <>
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
              <Add className={styles.icon} />
              <ThumbUpAltOutlined className={styles.icon} />
              <ThumbDownOutlined className={styles.icon} />
            </div>
            <Link  href={`/flowers/${title}`} passHref>
                <div className={styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
            </Link>
          </div>
        </>
              )}

    </div>
  );
}
