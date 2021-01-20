import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { useOvermind } from "../overmind";

const ImageViewer = ({ canvas }) => {
  const { state } = useOvermind();

  return (
    <>
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
              <img src={state.activeImage} style={{ display: "none" }} />
              {state.isUnsplash && state.unsplashData ? (
                <img
                  src={state.unsplashData.urls.regular}
                  alt=""
                  style={{ height: "100%" }}
                />
              ) : (
                <img src={state.activeImage} style={{ height: "100%" }} />
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
            href={`https://unsplash.com/@${state.unsplashData.user.username}?utm_source=pixelr&utm_medium=referral`}
          >
            {state.unsplashData.user.name}
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/?utm_source=pixelr&utm_medium=referral">
            Unsplash
          </a>
        </p>
      ) : null}
    </>
  );
};

export default ImageViewer;
