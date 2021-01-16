import "../styles/index.css";
import Head from "next/head";
import { createOvermind } from "overmind";
import { config } from "../overmind";
import { Provider } from "overmind-react";

function MyApp({ Component, pageProps }) {
  const overmind = createOvermind(config);
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>Pixel Splash</title>
      </Head>
      <Provider value={overmind}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
