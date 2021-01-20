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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pixelr</title>
      </Head>
      <Provider value={overmind}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
