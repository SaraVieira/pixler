import { useOvermind } from "../overmind";

const RangeSlider = ({
  value,
  onChange,
  canvas,
  min = 0,
  max = 100,
  step = 1,
  minText = min,
  maxText = max,
  label,
}) => {
  const { actions, state } = useOvermind();
  return (
    <>
      <label htmlFor="hue_field">{label}</label>
      <div className="flex items-center mb-3">
        <span className="mr-2">{minText}</span>
        <input
          type="range"
          id="hue_field"
          className="nes-range is-green"
          min={min}
          max={max}
          step={step}
          value={value.toString()}
          onChange={(e) => {
            onChange(e.target.value);
            if (state.activeImage) actions.pixelImage({ canvas });
          }}
        />
        <span className="ml-2">{maxText}</span>
      </div>
    </>
  );
};

export default RangeSlider;
