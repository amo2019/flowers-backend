import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

const Layout = ({ children }) => {
  const router = useRouter()
  const Navbar = dynamic(
    () => import('./Navbar'),
    { ssr: false }
)
  const match = router.pathname.includes('/admin')
  return (
    <div className={styles.layout}>
      <>
       {!match && <Navbar />}
        {children}
        <Footer/>
      </>
    </div>
  );
};

export default Layout;