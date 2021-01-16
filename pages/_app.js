import "../styles/index.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pixel Splash</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
