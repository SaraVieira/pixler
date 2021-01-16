import Color from "color";

export const setTab = ({ state }, tab) => {
  state.activeTab = tab;
};

export const setLink = ({ state }, link) => {
  state.imageLink = link;
};

export const setPalette = ({ state }, palette) => {
  state.imagePalette = palette.map((c) => Color(c).rgb().array());
};

export const toggleGrayscale = ({ state }) => {
  state.grayscale = !state.grayscale;
};

export const setScale = ({ state }, scale) => {
  state.imageScale = parseInt(scale, 10);
};

export const fileUpload = async ({ state, effects }, e) => {
  const file = e.target.files[0];
  const base64 = await effects.browser.toBase64(file);
  console.log(base64);
  state.uploadedFile = base64;
};

export const isButtonDisabled = ({ state }) => {
  if (state.isUnsplash || state.isURl) {
    return !state.imageLink;
  }

  if (state.isFileUpload) {
    return !state.uploadedFile;
  }
};

export const getAndPixelateImage = async (
  { state, effects, actions },
  { e, imageEl, canvas }
) => {
  e.preventDefault();
  state.image = null;
  if (state.isUnsplash) {
    const id = state.imageLink.includes("unsplash.com/photos/")
      ? state.imageLink.split("unsplash.com/photos/")[1]
      : state.imageLink;

    const data = await fetch(`api/photo/${id}`).then((rsp) => rsp.json());
    const dataUrl = await effects.browser.toDataURL(data.urls.regular);
    state.unsplashData = data;
    state.image = dataUrl;
  }

  if (state.isUrl) {
    const dataUrl = await effects.browser.toDataURL(state.imageLink);
    state.image = dataUrl;
  }

  if (state.isFileUpload) {
    state.image = state.fileUploaded;
  }
  actions.pixelImage({ canvas, imageEl });
};

export const pixelImage = async (
  { state: { scale, palette, grayscale }, effects },
  { canvas, imageEl }
) => {
  effects.pixel.drawPixelImage({
    to: canvas.current,
    from: imageEl.current,
    scale,
    palette,
    grayscale,
  });
};
