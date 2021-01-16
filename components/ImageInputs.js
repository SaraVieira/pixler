import { useOvermind } from "../overmind";

const ImageInputs = () => {
  const { state, actions } = useOvermind();
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
        <label className="nes-btn">
          <span>Select your file</span>
          <input accept="image/png" type="file" onChange={actions.fileUpload} />
        </label>
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
