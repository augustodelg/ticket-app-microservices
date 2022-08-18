import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ApiClient from "../../services/ApiClient";

const Layout = ({ children }) => {
  return (
    <>
     
      <Navbar />
      <main className="bg-indigo-200 pb-10" >{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
