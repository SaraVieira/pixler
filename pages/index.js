import { useRef } from "react";

import { useOvermind } from "../overmind";
import Form from "../components/Form";
import ImageViewer from "../components/ImageViewer";

export default function IndexPage() {
  const { state, effects } = useOvermind();

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
            <Form imageEl={imageEl} canvas={canvas} />
          </div>
          <div className=" py-5">
            <ImageViewer imageEl={imageEl} canvas={canvas} />
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
