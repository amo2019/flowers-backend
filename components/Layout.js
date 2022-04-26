import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
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