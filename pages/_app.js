import Layout from "../components/Layout";
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { getToggle } from "../zustand-store";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <div  style={{background: getToggle()? '#202032': 'white', color: getToggle()? 'white': 'black'}}>
      <Layout >
      <Component {...pageProps}/> 
      </Layout>
      </div>
  );
}

export default MyApp;

//, color: getToggle()? 'black': 'white'}