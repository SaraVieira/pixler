import { useOvermind } from "../overmind";
import ImageInputs from "./ImageInputs";

const Form = ({ canvas }) => {
  const { state, actions } = useOvermind();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        actions.getAndPixelateImage({ canvas });
      }}
    >
      <div className="nes-field mb-3">
        <nav className="mb-3">
          {state.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => actions.setTab(tab)}
              className={`nes-btn mr-2 ${
                state.activeTab === tab ? "is-primary" : null
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <ImageInputs />
      </div>
      <div className="nes-field mb-3">
        <label htmlFor="size_field">Pixel Size</label>
        <input
          type="number"
          id="size_field"
          className="nes-input"
          value={state.scale}
          onChange={(e) => {
            actions.setScale(e.target.value);
            if (state.activeImage) actions.pixelImage({ canvas });
          }}
        />
      </div>
      <div className="mb-6">
        <label>
          <input
            type="checkbox"
            className="nes-checkbox"
            checked={state.grayscale}
            onChange={() => {
              actions.toggleGrayscale();
              if (state.activeImage) actions.pixelImage({ canvas });
            }}
          />
          <span>Grayscale</span>
        </label>
      </div>
      <button
        type="submit"
        className={`nes-btn ${
          state.isButtonDisabled ? "is-disabled" : "is-primary"
        }`}
        disabled={state.isButtonDisabled}
      >
        Pixel It
      </button>
    </form>
  );
};

export default Form;
