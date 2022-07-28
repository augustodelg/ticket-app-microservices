import Head from "next/head";
import Image from "next/image";
import useUser from "../hooks/useUser";
import styles from "../styles/Home.module.css";

const image = require("../public/images/signup.png");
const Home = (props) => {
  const user = useUser();
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
        {props.currentUser ? (
          <h1 className="block text-gray-700 text-xl font-bold m-2">
            Hi {user.email}
          </h1>
        ) : (
          <h1> You are NOT signed in</h1>
        )}
      </main>
    </div>
  );
};

export default Home;


