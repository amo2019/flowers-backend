import style from "../styles/Footer.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {

  return (    
  <div className={style.wrapper}>
  <div className={style.container}>
    <h3 className={style.title}>FLOWERS.</h3>
    <h3 className={style.linkTitle}>
      <Link href="/contact" className={style.link} passHref>
          <span className={style.linkText}>CONTACT US</span>
      </Link>
    </h3>
</div>
</div>
  )
}