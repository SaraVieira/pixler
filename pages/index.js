import { useRef } from "react";

import { useOvermind } from "../overmind";
import Form from "../components/Form";
import ImageViewer from "../components/ImageViewer";

export default function IndexPage() {
  const { state, effects } = useOvermind();

  const canvas = useRef();

  return (
    <div className="bg-gray-100">
      <header>
        <img src="/logo.svg" alt="Pixel Splash Logo" />
        <h1 className="nes-text is-primary">
          Pixel <span style={{ color: "#92cc41" }}>Splash</span>
        </h1>
      </header>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="nes-container is-rounded bg-white  ">
          <div className={`py-5 ${state.activeImage ? "divider" : null}`}>
            <Form canvas={canvas} />
          </div>
          <div className=" py-5">
            <ImageViewer canvas={canvas} />

            {state.activeImage && (
              <button
                className="nes-btn "
                onClick={() => effects.browser.download(canvas.current)}
              >
                Download
              </button>
            )}
            {state.error && (
              <div className="nes-balloon from-left" id="error-dialog">
                <p className="nes-text is-error">
                  There has been a problem creating your image
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center mb-6">
        <a href="https://github.com/SaraVieira/pixel-splash">
          <i className="nes-octocat is-medium"></i>
        </a>
      </footer>
    </div>
  );
}
