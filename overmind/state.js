import { derived } from "overmind";

const tabs = ["Unsplash Link", "File Upload", "Url"];
export const state = {
  tabs: tabs,
  activeTab: tabs[0],
  isUnsplash: derived((state) => state.activeTab === tabs[0]),
  isFileUpload: derived((state) => state.activeTab === tabs[1]),
  isURl: derived((state) => state.activeTab === tabs[2]),
  imageLink: "1U0xyCNniTs",
  uploadedFile: null,
  activeImage: null,
  unsplashData: null,
  scale: 8,
  grayscale: false,
  palette: null,
};
