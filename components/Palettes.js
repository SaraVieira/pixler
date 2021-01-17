import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Color from "color";
import palettes from "nice-color-palettes";
import { useOvermind } from "../overmind";

const Palettes = () => {
  const { state, actions } = useOvermind();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowDropdown(false);
      }}
    >
      <div className="mt-1 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="select select-main"
        >
          <span className="flex items-center">
            <span className="ml-3 flex" style={{ width: "calc(100% - 60px)" }}>
              {!state.palette
                ? "Use a color palette"
                : state.palette.map((c, id) => (
                    <div
                      key={id}
                      style={{
                        backgroundColor: Color(c).rgb().string(),
                        flexGrow: 1,
                        height: 20,
                      }}
                    ></div>
                  ))}
            </span>
          </span>
        </button>

        <div
          className={`${
            showDropdown ? "block z-10" : "hidden"
          } w-full select absolute bg-white`}
        >
          <ul
            tabIndex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-56 rounded-md py-1 overflow-auto focus:outline-none sm:text-sm"
          >
            <li
              id="listbox-item-0"
              role="option"
              className="text-gray-900 cursor-default select-none relative py-2"
              onClick={() => {
                actions.setPalette(null);
                setShowDropdown(false);
              }}
            >
              None
            </li>
            {palettes.map((p, id) => (
              <li
                key={id}
                id="listbox-item-0"
                role="option"
                className="cursor-default select-none relative py-2"
                onClick={() => {
                  actions.setPalette(p);
                  console.log(p);
                  // if (state.activeImage) actions.pixelImage({ canvas, imageEl });
                  setShowDropdown(false);
                }}
              >
                <div className="flex items-center">
                  {p.map((c, id) => (
                    <div
                      key={id}
                      style={{
                        backgroundColor: c,
                        flexGrow: 1,
                        height: 50,
                      }}
                    ></div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Palettes;
