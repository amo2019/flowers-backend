import Layout from "../components/Layout";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  //const queryClient = new QueryClient()
  return (
      <Layout>
      <Component {...pageProps} /> 
      </Layout>
  );
}

export default MyApp;