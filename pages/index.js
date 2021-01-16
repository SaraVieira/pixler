import { useRef, useState } from "react";

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { toDataURL, pixelit, download } from "../scripts/pixelit";
import Color from "color";

import Palettes from "../components/Palettes";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const tabs = ["Unsplash Link", "File Upload", "Url"];

export default function IndexPage() {
  const [link, setLink] = useState("1U0xyCNniTs");
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(8);
  const [grayscale, setGrayscale] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [palette, setPalette] = useState(null);
  const [method, setMethod] = useState(tabs[0]);
  const [fileUploaded, setFileUploaded] = useState(null);

  const canvas = useRef();
  const imageEl = useRef();

  const pixel = async () => {
    pixelit({
      to: canvas.current,
      from: imageEl.current,
      scale,
      palette: palette ? palette.map((c) => Color(c).rgb().array()) : null,
      grayscale: grayscale ? grayscale.value : false,
    });
  };

  const getAndPixelateImage = async (e) => {
    e.preventDefault();
    setImage(null);
    if (method === tabs[0]) {
      const id = link.includes("unsplash.com/photos/")
        ? link.split("unsplash.com/photos/")[1]
        : link;

      const data = await fetch(`api/photo/${id}`).then((rsp) => rsp.json());
      const dataUrl = await toDataURL(data.urls.regular);
      setOriginalData(data);
      setImage(dataUrl);
    }

    if (method === tabs[2]) {
      const dataUrl = await toDataURL(link);
      setImage(dataUrl);
    }

    if (method === tabs[1]) {
      console.log(fileUploaded);
      setImage(fileUploaded);
    }

    pixel();
  };

  const fileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    console.log(base64);
    setFileUploaded(base64);
  };

  return (
    <div className="bg-gray-100">
      <header>
        <img src="/logo.svg" />
        <h1 className="nes-text is-primary">
          Pixel <span style={{ color: "#92cc41" }}>Splash</span>
        </h1>
      </header>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="nes-container is-rounded bg-white  ">
          <div className={`py-5 ${image ? "divider" : null}`}>
            <form onSubmit={getAndPixelateImage}>
              <div className="nes-field mb-3">
                <nav className="mb-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setMethod(tab)}
                      className={`nes-btn ${
                        method === tab ? "is-primary" : null
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                {method === tabs[0] ? (
                  <>
                    <label htmlFor="url_field">Link or Unsplash Image ID</label>
                    <input
                      type="text"
                      id="url_field"
                      className="nes-input"
                      placeholder="Place an unsplash link or id"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                    />
                  </>
                ) : null}
                {method === tabs[1] ? (
                  <label className="nes-btn">
                    <span>Select your file</span>
                    <input accept="image/*" type="file" onChange={fileUpload} />
                  </label>
                ) : null}
                {method === tabs[2] ? (
                  <>
                    <label htmlFor="url_field">Image Link</label>
                    <input
                      type="text"
                      id="url_field"
                      className="nes-input"
                      placeholder="Place an image link"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                    />
                  </>
                ) : null}
              </div>
              <div className="nes-field mb-3">
                <label htmlFor="size_field">Pixel Size</label>
                <input
                  type="text"
                  id="size_field"
                  className="nes-input"
                  value={scale}
                  onChange={(e) => {
                    setScale(e.target.value);
                    if (image) pixel();
                  }}
                />
              </div>
              <label className="mb-3">
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={grayscale?.value}
                  onChange={() => {
                    setGrayscale((g) => ({
                      value: g?.value ? false : true,
                    }));
                    if (image) pixel();
                  }}
                />
                <span>Grayscale</span>
              </label>

              <div className="mb-6">
                <Palettes
                  activePalette={palette}
                  onChange={(value) => {
                    setPalette(value);
                    if (image) pixel();
                  }}
                />
              </div>
              <button type="submit" className="nes-btn is-primary">
                Pixel It
              </button>
            </form>
          </div>
          <div className=" py-5">
            {image ? (
              <>
                <div className="mb-6">
                  <ReactCompareSlider
                    handle={
                      <ReactCompareSliderHandle
                        buttonStyle={{
                          backdropFilter: "none",
                          border: 0,
                          boxShadow: "none",
                          ":after": {
                            content: "sup",
                          },
                        }}
                        linesStyle={{ background: "black", width: 4 }}
                      />
                    }
                    position={20}
                    itemOne={
                      <>
                        <img
                          src={image}
                          ref={imageEl}
                          style={{ display: "none" }}
                        />
                        <img
                          src={
                            method === tabs[0]
                              ? originalData.urls.regular
                              : image
                          }
                          alt=""
                        />
                      </>
                    }
                    itemTwo={
                      <canvas style={{ width: "100%" }} ref={canvas}></canvas>
                    }
                  />
                </div>
                {method === tabs[0] ? (
                  <p>
                    Photo by{" "}
                    <a
                      href={`https://unsplash.com/@${originalData.user.username}?utm_source=pixelSlash&utm_medium=referral`}
                    >
                      {originalData.user.name}
                    </a>{" "}
                    on{" "}
                    <a href="https://unsplash.com/?utm_source=pixelSlash&utm_medium=referral">
                      Unsplash
                    </a>
                  </p>
                ) : null}
                <button
                  className="nes-btn "
                  onClick={() => download(canvas.current)}
                >
                  Download
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
