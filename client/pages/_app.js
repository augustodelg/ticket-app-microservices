import Head from "next/head";
import Layout from "../components/layout/layout";
import { UserProvider } from "../context/UserContext";
import ApiClient from "../services/ApiClient";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <UserProvider user={pageProps.currentUser}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
App.getInitialProps = async (context) => {
  // Realizarlos de forma generica
  const { data } = await ApiClient(context.ctx).get("/api/users/currentuser");
  return { pageProps: data };
};

export default App;
