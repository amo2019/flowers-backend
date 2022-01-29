import style from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (    
  <div className={style.container}>
    <h3 className={style.title}>FLOWERS.</h3>
    <h3 className={style.linkTitle}>
      <Link href="/contact" className={style.link} passHref>
        <>
          <span className={style.linkText}>CONTACT US</span>
        </>
      </Link>
    </h3>
</div>
  )
}
