import { useRef, useState } from "react";

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { toDataURL, pixelit, download } from "../scripts/pixelit";
import Color from "color";

import Palettes from "../components/Palettes";

export default function IndexPage() {
  const [link, setLink] = useState("1U0xyCNniTs");
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(8);
  const [grayscale, setGrayscale] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [palette, setPalette] = useState(null);

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
    setImage(null);
    e.preventDefault();
    const id = link.includes("unsplash.com/photos/")
      ? link.split("unsplash.com/photos/")
      : link;

    const data = await fetch(`api/photo/${id}`).then((rsp) => rsp.json());
    console.log(data);
    const dataUrl = await toDataURL(data.urls.regular);
    setOriginalData(data);
    setImage(dataUrl);
    pixel();
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
                <label htmlFor="url_field">Link or Unsplash Image ID</label>
                <input
                  type="text"
                  id="url_field"
                  className="nes-input"
                  placeholder="Place an unsplash link or id"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
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
                        <img src={originalData.urls.regular} alt="" />
                      </>
                    }
                    itemTwo={
                      <canvas style={{ width: "100%" }} ref={canvas}></canvas>
                    }
                  />
                </div>
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
