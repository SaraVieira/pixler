import { useRef } from "react";

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";

import Palettes from "../components/Palettes";
import { useOvermind } from "../overmind";

export default function IndexPage() {
  const { state, effects, actions } = useOvermind();

  const canvas = useRef();
  const imageEl = useRef();

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
          <div className={`py-5 ${state.activeImage ? "divider" : null}`}>
            <form
              onSubmit={(e) =>
                actions.getAndPixelateImage({ e, imageEl, canvas })
              }
            >
              <div className="nes-field mb-3">
                <nav className="mb-3">
                  {state.tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => actions.setTab(tab)}
                      className={`nes-btn ${
                        state.activeTab === tab ? "is-primary" : null
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                {state.isUnsplash ? (
                  <>
                    <label htmlFor="url_field">Link or Unsplash Image ID</label>
                    <input
                      type="text"
                      id="url_field"
                      className="nes-input"
                      placeholder="Place an unsplash link or id"
                      onChange={(e) => actions.setLink(e.target.value)}
                      value={state.imageLink}
                    />
                  </>
                ) : null}
                {state.isFileUpload ? (
                  <label className="nes-btn">
                    <span>Select your file</span>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={effects.fileUpload}
                    />
                  </label>
                ) : null}
                {state.isFileUpload ? (
                  <>
                    <label htmlFor="url_field">Image Link</label>
                    <input
                      type="text"
                      id="url_field"
                      className="nes-input"
                      placeholder="Place an image link"
                      onChange={(e) => actions.setLink(e.target.value)}
                      value={state.imageLink}
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
                  value={state.scale}
                  onChange={(e) => {
                    state.setScale(e.target.value);
                    if (state.activeImage)
                      actions.pixelImage({ canvas, imageEl });
                  }}
                />
              </div>
              <label className="mb-3">
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={state.grayscale}
                  onChange={() => {
                    actions.toggleGrayscale();
                    if (state.activeImage)
                      actions.pixelImage({ canvas, imageEl });
                  }}
                />
                <span>Grayscale</span>
              </label>

              <div className="mb-6">
                <Palettes
                  activePalette={state.palette}
                  onChange={(value) => {
                    actions.setPalette(value);
                    if (state.activeImage)
                      actions.pixelImage({ canvas, imageEl });
                  }}
                />
              </div>
              <button
                type="submit"
                className={`nes-btn ${
                  actions.isButtonDisabled() ? "is-disabled" : "is-primary"
                }`}
                disabled={actions.isButtonDisabled()}
              >
                Pixel It
              </button>
            </form>
          </div>
          <div className=" py-5">
            <div
              className="mb-6"
              style={{ display: state.activeImage ? "block" : "none" }}
            >
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
                      src={state.activeImage}
                      ref={imageEl}
                      style={{ display: "none" }}
                    />
                    {state.isUnsplash && state.unsplashData ? (
                      <>
                        <img src={state.unsplashData.urls.regular} alt="" />
                      </>
                    ) : (
                      <img src={state.activeImage} />
                    )}
                  </>
                }
                itemTwo={
                  <canvas
                    style={{ width: "100%", height: "100%" }}
                    ref={canvas}
                  ></canvas>
                }
              />
            </div>
            {state.isUnsplash && state.unsplashData ? (
              <p>
                Photo by{" "}
                <a
                  href={`https://unsplash.com/@${state.unsplashData.user.username}?utm_source=pixelSlash&utm_medium=referral`}
                >
                  {state.unsplashData.user.name}
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/?utm_source=pixelSlash&utm_medium=referral">
                  Unsplash
                </a>
              </p>
            ) : null}
            {state.activeImage && (
              <button
                className="nes-btn "
                onClick={() => effects.browser.download(canvas.current)}
              >
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
