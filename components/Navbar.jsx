import React, { useState } from 'react';
import style from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  useLogin,
  useLogout,
  useCartItems,
  UserData,
  useSearchField,
  useSearchItem
} from "../zustand-store"
import CartDropdown from './cartDropdown/CartDropdown';

export default function Navbar() {
  const [toggleState, setToggleState] = useState(true);
  const login = useLogin();
  const logout = useLogout();
  const data = useCartItems()
  const user = UserData();
  const searchItem = useSearchItem()
  const searchField = useSearchField();
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
              <input type="text" placeholder="Search" value={searchItem} onChange={(e) => searchField({searchItem: e.target.value})} className={style.searchInput}/>
              <Image src="/img/search.png" width="20" height="20" alt="" className={style.searchIcon}/>
          </div>
      </div>
      <div className={style.navItem}>
         <ul>
         <div className={style.logoContainer} onClick={() => setToggleState(!toggleState)}>
           <a><Image src="/img/shopping_cart.svg" width="30" height="30" className={style.logo} alt="app logo" /></a>
          </div>
            <Link href="/signin-signup"><a>{!user && <li onClick={login} className={style.btn}>Login/Signup</li>}</a></Link>
            {/* {user && <li>{user}</li>} */}
            {user && <li onClick={logout} className={style.btn}>Logout</li>}
          </ul>
      </div>
      {toggleState ? null : <CartDropdown data={data} toggleState={toggleState} setToggleState={setToggleState}/>}
  </div>
  </nav>
)
}