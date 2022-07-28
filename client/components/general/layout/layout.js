import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ApiClient from "../../../services/ApiClient";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
