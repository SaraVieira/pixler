import { useState } from "react";
import { useOvermind } from "../overmind";
import ImageInputs from "./ImageInputs";
import RangeSlider from "./RangeSlider";

const Form = ({ canvas }) => {
  const { state, actions } = useOvermind();
  const [open, setOpen] = useState(false);

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

      <div className="mb-3">
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
      <div className="mb-3">
        <label>
          <input
            type="checkbox"
            className="nes-checkbox"
            checked={state.sepia}
            onChange={() => {
              actions.toggleSepia();
              if (state.activeImage) actions.pixelImage({ canvas });
            }}
          />
          <span>Sepia</span>
        </label>
      </div>

      <div className="mb-6">
        <button
          type="button"
          className={`advanced-button ${open ? "open" : null}`}
          onClick={() => setOpen(!open)}
        >
          Advanced Settings
        </button>
        {open ? (
          <section className="mt-3 grid gap-3 grid-cols-2">
            <RangeSlider
              maxText={360}
              min={0}
              max={100}
              value={state.hue}
              canvas={canvas}
              label="Hue Shift"
              onChange={(value) => {
                actions.setValue({ name: "hue", value });
              }}
            />
            <RangeSlider
              min={-100}
              max={100}
              value={state.exposure}
              canvas={canvas}
              label="Exposure"
              onChange={(value) => {
                actions.setValue({ name: "exposure", value });
              }}
            />
            <RangeSlider
              min={0}
              max={4}
              step={0.1}
              value={state.gamma}
              canvas={canvas}
              label="Gamma"
              onChange={(value) => {
                actions.setValue({ name: "gamma", value });
              }}
            />

            <RangeSlider
              min={0}
              max={100}
              value={state.noise}
              canvas={canvas}
              label="Noise"
              onChange={(value) => {
                actions.setValue({ name: "noise", value });
              }}
            />

            <RangeSlider
              min={-100}
              max={100}
              value={state.saturation}
              canvas={canvas}
              label="Saturation"
              onChange={(value) => {
                actions.setValue({ name: "saturation", value });
              }}
            />

            <RangeSlider
              min={-100}
              max={100}
              value={state.vibrance}
              canvas={canvas}
              label="Vibrance"
              onChange={(value) => {
                actions.setValue({ name: "vibrance", value });
              }}
            />
            <label>
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={state.invert}
                onChange={() => {
                  actions.toggleInvert();
                  if (state.activeImage) actions.pixelImage({ canvas });
                }}
              />
              <span>Invert Colors</span>
            </label>
          </section>
        ) : null}
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
