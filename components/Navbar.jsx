import React from 'react';
import style from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { filteredProducts, filteredField } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const searchField = useSelector((state) => state.product.searchField);
  const dispatch = useDispatch();
  return (
  <nav>
  <div className={style.navTop}>
      <div className={style.navItem}>
        <Link href="/" className={style.navImage} passHref>
        <a>
          <Image src="/img/flowers.svg"  height="50px" width="50px" alt=''/>
        </a>
        </Link>
      </div>
      <div className={style.navItem}>
          <div className={style.search}>
              <input type="text" placeholder="Search" value={searchField} onChange={(e) => dispatch(filteredField(e.target.value))} className={style.searchInput}/>
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