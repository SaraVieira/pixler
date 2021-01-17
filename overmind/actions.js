import Color from "color";

export const setTab = ({ state }, tab) => {
  state.activeTab = tab;
};

export const setLink = ({ state }, link) => {
  state.imageLink = link;
};

export const setPalette = ({ state }, palette) => {
  state.palette = palette.map((c) => Color(c).rgb().array());
};

export const toggleGrayscale = ({ state }) => {
  state.grayscale = !state.grayscale;
};

export const setScale = ({ state }, scale) => {
  state.scale = parseInt(scale, 10);
};

export const deleteUploadedFile = ({ state }) => {
  state.uploadedFile = null;
};

export const fileUpload = async ({ state, effects }, e) => {
  try {
    const file = e.target.files[0];
    const base64 = await effects.browser.toBase64(file);
    state.uploadedFile = base64;
  } catch {
    state.error = true;
  }
};

export const getAndPixelateImage = async (
  { state, effects, actions },
  { imageEl, canvas }
) => {
  state.error = false;
  try {
    if (state.isUnsplash) {
      const id = state.imageLink.includes("unsplash.com/photos/")
        ? state.imageLink.split("unsplash.com/photos/")[1]
        : state.imageLink;

      const data = await fetch(`api/photo/${id}`).then((rsp) => rsp.json());
      const dataUrl = await effects.browser.toDataURL(data.urls.regular);
      state.unsplashData = data;
      state.activeImage = dataUrl;
    }

    if (state.isURL) {
      const dataUrl = await effects.browser.toDataURL(state.imageLink);
      state.activeImage = dataUrl;
    }

    if (state.isFileUpload) {
      state.activeImage = state.uploadedFile;
    }

    actions.pixelImage({ canvas, imageEl });
  } catch {
    state.error = true;
  }
};

export const pixelImage = async ({ state, effects }, { canvas, imageEl }) => {
  const { scale, palette, grayscale, activeImage } = state;
  try {
    // I NEED TO FIGURE OUT WHY I NEED TO CALL THIS TWICE
    await effects.pixel.drawPixelImage({
      to: canvas.current,
      from: imageEl.current,
      scale,
      palette,
      grayscale,
      activeImage,
    });
    await effects.pixel.drawPixelImage({
      to: canvas.current,
      from: imageEl.current,
      scale,
      palette,
      grayscale,
      activeImage,
    });
  } catch {
    state.error = true;
  }
};
