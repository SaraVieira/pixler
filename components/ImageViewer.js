import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { useOvermind } from "../overmind";

const ImageViewer = ({ imageEl, canvas }) => {
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
    </>
  );
};

export default ImageViewer;
