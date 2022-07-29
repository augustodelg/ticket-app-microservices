import Layout from "../components/layout/layout";
import { UserProvider } from "../context/UserContext";
import ApiClient from "../services/ApiClient";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <UserProvider user={pageProps.currentUser}>
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
