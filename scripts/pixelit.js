/**
 * pixelit - convert an image to Pixel Art, with/out grayscale and based on a color palette.
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

export const download = (canvas) => {
  const link = document.createElement("a");
  link.download = "pxArt.png";
  link.href = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  document.querySelector("body").appendChild(link);
  link.click();
  document.querySelector("body").removeChild(link);
};

const colorSim = (rgbColor, compareColor) => {
  let i;
  let max;
  let d = 0;
  for (i = 0, max = rgbColor.length; i < max; i++) {
    d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i]);
  }
  return Math.sqrt(d);
};

const similarColor = (actualColor, palette) => {
  let selectedColor = [];
  let currentSim = colorSim(actualColor, palette[0]);
  palette.forEach((color) => {
    if (colorSim(actualColor, color) <= currentSim) {
      selectedColor = color;
      currentSim = colorSim(actualColor, color);
    }
  });
  return selectedColor;
};

export async function toDataURL(src, outputFormat) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  }).then((img) => {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    return dataURL;
  });
}

export const pixelit = (config) => {
  //target for canvas
  const drawTo = config.to;
  //origin of uploaded image/src img
  const drawFrom = config.from;
  //hide image element
  //range between 0 to 100
  const scale =
    config.scale && config.scale > 0 && config.scale <= 50
      ? config.scale * 0.01
      : 8 * 0.01;
  const palette = config.palette;
  const maxHeight = config.maxHeight;
  const maxWidth = config.maxWidth;
  const grayscale = config.grayscale;
  const ctx = drawTo.getContext("2d");

  const pixelate = () => {
    draw();

    drawTo.width = drawFrom.width;
    drawTo.height = drawFrom.height;

    const scaledW = drawTo.width * scale;
    const scaledH = drawTo.height * scale;

    //var ctx = canvas.getContext("2d");

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(drawFrom, 0, 0, scaledW, scaledH);
    ctx.drawImage(
      drawTo,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      drawFrom.width,
      drawFrom.height
    );
    if (grayscale) {
      convertGrayscale();
    }
    if (palette && palette.length) {
      convertPalette();
    }
  };

  const convertGrayscale = () => {
    const w = drawTo.width;
    const h = drawTo.height;
    var imgPixels = ctx.getImageData(0, 0, w, h);
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4;
        var avg =
          (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) /
          3;
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
      }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  };

  const convertPalette = () => {
    const w = drawTo.width;
    const h = drawTo.height;
    var imgPixels = ctx.getImageData(0, 0, w, h);
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4;
        //var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        const finalcolor = similarColor(
          [imgPixels.data[i], imgPixels.data[i + 1], imgPixels.data[i + 2]],
          palette
        );
        imgPixels.data[i] = finalcolor[0];
        imgPixels.data[i + 1] = finalcolor[1];
        imgPixels.data[i + 2] = finalcolor[2];
      }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  };

  const resizeImage = () => {
    //var ctx = canvas.getContext("2d")
    const canvasCopy = document.createElement("canvas");
    const copyContext = canvasCopy.getContext("2d");
    let ratio = 1.0;

    //if none defined skip
    if (!maxWidth && !maxHeight) {
      return 0;
    }

    if (maxWidth && drawTo.width > maxWidth) {
      ratio = maxWidth / drawTo.width;
    }
    //max height overrides max width
    if (maxHeight && drawTo.height > maxHeight) {
      ratio = maxHeight / drawTo.height;
    }

    canvasCopy.width = drawTo.width;
    canvasCopy.height = drawTo.height;
    copyContext.drawImage(drawTo, 0, 0);

    drawTo.width = drawTo.width * ratio;
    drawTo.height = drawTo.height * ratio;
    ctx.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      drawTo.width,
      drawTo.height
    );
  };

  /**
   * draw to canvas from image source and resize
   *
   */
  const draw = () => {
    //draw image to canvas
    drawTo.width = drawFrom.width;
    drawTo.height = drawFrom.height;
    ctx.drawImage(drawFrom, 0, 0);
    //resize is always done
    resizeImage();
  };

  return pixelate();
};
