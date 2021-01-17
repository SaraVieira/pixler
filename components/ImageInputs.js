import { useState } from "react";
import { useOvermind } from "../overmind";

const ImageInputs = () => {
  const { state, actions } = useOvermind();
  const [fileName, setFileName] = useState();
  return (
    <>
      {" "}
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
        <>
          {fileName ? (
            <div className="flex items-center justify-between">
              <span className="nes-text is-success">{fileName}</span>
              <button
                className="nes-btn is-error"
                onClick={() => {
                  actions.deleteUploadedFile();
                  setFileName(null);
                }}
              >
                <i className="nes-icon close is-small"></i>
              </button>
            </div>
          ) : (
            <label className="nes-btn">
              <span>Select your file</span>
              <input
                accept="image/png"
                type="file"
                onChange={(e) => {
                  actions.fileUpload(e);
                  setFileName(e.target.files[0].name);
                }}
              />
            </label>
          )}
        </>
      ) : null}
      {state.isURL ? (
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
    </>
  );
};

export default ImageInputs;
