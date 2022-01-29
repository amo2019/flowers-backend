
import React from 'react';
import style from "../styles/Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
  <nav>
  <div className={style.navTop}>
      <div className={style.navItem}>
        <div className={style.navImage}>
          <Image src="/img/gift.png"  
                      className={style.navImage}
                      width="60px"
                      height="40px"
                      layout="responsive"
                      objectFit="cover"
                      alt=""/>
         </div>
      </div>
      <div className={style.navItem}>
          <div className={style.search}>
              <input type="text" placeholder="Search" className={style.searchInput}/>
              <Image src="/img/search.png" width="20" height="20" alt="" className={style.searchIcon}/>
          </div>
      </div>
      <div className={style.navItem}>
          <span className={style.login}>Login</span>
      </div>
  </div>
  </nav>
)
}


