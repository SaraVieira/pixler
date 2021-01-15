import { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { ReactCompareSlider } from "react-compare-slider";
import { toDataURL, pixelit } from "../scripts/pixelit";
import Color from "color";
import palettes from "nice-color-palettes";

export default function IndexPage() {
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(8);
  const [grayscale, setGrayscale] = useState(null);
  const [palette, setpalette] = useState(null);
  const [px, setPx] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const canvas = useRef();
  const imageEl = useRef();

  const pixel = async () => {
    if (!px) {
      const opts = {
        to: canvas.current,
        from: imageEl.current,
        scale,
      };
      const pp = new pixelit(opts);
      setPx(pp);
      pp.draw().pixelate();

      return;
    }

    if (palette) {
      const p = palette.map((c) => Color(c).rgb().array());
      console.log("HERE");
      px.setPalette(p);
    }
    if (grayscale) {
      px.convertGrayscale(grayscale.value);
    }
    px.setScale(scale);
  };

  const getAndPixelateImage = async (e) => {
    setImage(null);
    e.preventDefault();
    const id = link.includes("unsplash.com/photos/")
      ? link.split("unsplash.com/photos/")
      : link;

    const data = await fetch(`api/photo/${id}`).then((rsp) => rsp.json());
    console.log(data);
    const dataUrl = await toDataURL(data.urls.regular);
    setImage(dataUrl);
    pixel();
  };
  return (
    <div className="bg-gray-100">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10">
        <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div class="px-4 py-5 sm:px-6">
            <form onSubmit={getAndPixelateImage}>
              <label for="url" class="block text-sm font-medium text-gray-700">
                Link or Unsplash Image ID
              </label>
              <input
                required
                name="url"
                id="url"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Place an unsplash link or id"
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
              <div>
                <label
                  for="scale"
                  class="block text-sm font-medium text-gray-700"
                >
                  Pixel Size
                </label>
                <div class="mt-1">
                  <input
                    type="number"
                    name="scale"
                    id="scale"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={scale}
                    onChange={(e) => {
                      setScale(e.target.value);
                      if (image) pixel();
                    }}
                  />
                </div>
              </div>
              <div class="flex items-center">
                <button
                  type="button"
                  aria-pressed="false"
                  aria-labelledby="toggleLabel"
                  class={`bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    grayscale ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setGrayscale((g) => {
                      value: !g?.value;
                    });
                    if (image) pixel();
                  }}
                >
                  <span class="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    class={`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                      grayscale ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </button>
                <span class="ml-3" id="toggleLabel">
                  <span class="text-sm font-medium text-gray-900">
                    Grayscale
                  </span>
                </span>
              </div>
              <div>
                <label
                  id="listbox-label"
                  class="block text-sm font-medium text-gray-700"
                >
                  Assigned to
                </label>
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  <div class="mt-1 relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded="true"
                      aria-labelledby="listbox-label"
                      class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <span class="flex items-center">
                        <span class="ml-3 block truncate">
                          Use a color palette
                        </span>
                      </span>
                      <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          class="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      class={`${
                        showDropdown ? "block z-10" : "hidden"
                      } absolute mt-1 w-full rounded-md bg-white shadow-lg`}
                    >
                      <ul
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-item-3"
                        class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {/* <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        --> */}
                        {palettes.map((p) => (
                          <li
                            id="listbox-item-0"
                            role="option"
                            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                            onClick={() => {
                              setpalette(p);
                              setShowDropdown(false);
                              if (image) pixel();
                            }}
                          >
                            <div class="flex items-center">
                              {p.map((c) => (
                                <div
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
              </div>
              <button
                type="submit"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Pixel It
              </button>
            </form>
          </div>
          <div class="px-4 py-5 sm:p-6">
            {image ? (
              <ReactCompareSlider
                position={20}
                itemOne={
                  <img ref={imageEl} src={image} id="pixelitimg" alt="" />
                }
                itemTwo={<canvas ref={canvas} id="pixelitcanvas"></canvas>}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
