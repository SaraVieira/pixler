import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <html lang="en-us" />
          <meta charset="utf-8" />
          <title>Pixel Splash</title>

          <meta name="description" content="Convert any image into art" />
          <meta name="image" content="https://pixelsplash.art/twitter.png" />

          <meta itemProp="name" content="Pixel Splash" />
          <meta itemProp="description" content="Convert any image into art" />
          <meta
            itemProp="image"
            content="https://pixelsplash.art/twitter.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pixel Splash" />
          <meta
            name="twitter:description"
            content="Convert any image into art"
          />
          <meta name="twitter:creator" content="@NikkitaFTW" />
          <meta
            name="twitter:image:src"
            content="https://pixelsplash.art/twitter.png"
          />
          <meta name="og:title" content="Pixel Splash" />
          <meta name="og:description" content="Convert any image into art" />
          <meta name="og:image" content="https://pixelsplash.art/twitter.png" />
          <meta name="og:url" content="https://pixelsplash.art/" />
          <meta name="og:site_name" content="Pixel Splash" />
          <meta name="og:type" content="website" />
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
        </Head>
        <body>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css"
            rel="stylesheet"
          />
          <Main />
          <NextScript />

          <script
            src="https://cdn.usefathom.com/script.js"
            data-site="FWUMYUKE"
            defer
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
