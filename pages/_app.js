import Layout from "../components/Layout";
import '../styles/globals.css'
import store from "../redux/store";
import { Provider } from "react-redux";
//import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function MyApp({ Component, pageProps }) {
  //const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <Layout>
      <Component {...pageProps} /> 
      </Layout>
    </Provider>
  );
}

export default MyApp;