import { derived } from "overmind";

const tabs = ["Unsplash Link", "File Upload", "Url"];
export const state = {
  tabs: tabs,
  activeTab: tabs[0],
  isUnsplash: derived((state) => state.activeTab === tabs[0]),
  isFileUpload: derived((state) => state.activeTab === tabs[1]),
  isURL: derived((state) => state.activeTab === tabs[2]),
  isButtonDisabled: derived((state) => {
    if (state.isUnsplash || state.isURL) {
      return !state.imageLink;
    }

    if (state.isFileUpload) {
      return !state.uploadedFile;
    }
  }),
  imageLink: "0StwxZ4NigE",
  uploadedFile: null,
  activeImage: null,
  unsplashData: null,
  scale: 8,
  grayscale: false,
  sepia: false,
  error: null,
  hue: 0,
  exposure: 0,
  gamma: 0,
  noise: 0,
  saturation: 0,
  vibrance: 0,
  invert: false,
};
