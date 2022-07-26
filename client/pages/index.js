import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

const image = require("../public/images/signup.png");
const Home = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>INICIO</title>
      </Head>

      <main className={styles.main}>
        <Image
          quality={100}
          src={image}
          width="1200"
          height="800"
          placeholder="blur"
        />
        {props.currentUser}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  // Realizarlos de forma generica
  const response = await axios
    .get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: context.req.headers.host,
          Cookies: context.req.headers.cookie,
        },
      }
    )
    .catch((err) => {
      console.log(err.message);
    });
  console.log("---------------------------------------------");
  console.log(context.req.headers);
  return { props: response.data };
};
