export const browser = {
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },
  download(canvas, name = "pixelated-image") {
    const link = document.createElement("a");
    link.download = name;
    link.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    document.querySelector("body").appendChild(link);
    link.click();
    document.querySelector("body").removeChild(link);
  },
  toDataURL: async (src, outputFormat) => {
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
  },
};

export const pixel = {
  colorSim(rgbColor, compareColor) {
    let i;
    let max;
    let d = 0;
    for (i = 0, max = rgbColor.length; i < max; i++) {
      d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i]);
    }
    return Math.sqrt(d);
  },

  similarColor(actualColor, palette) {
    let selectedColor = [];
    let currentSim = this.colorSim(actualColor, palette[0]);
    palette.forEach((color) => {
      if (this.colorSim(actualColor, color) <= currentSim) {
        selectedColor = color;
        currentSim = this.colorSim(actualColor, color);
      }
    });
    return selectedColor;
  },
  convertGrayscale(ctx, drawTo) {
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
  },
  convertPalette(ctx, drawTo, palette) {
    const w = drawTo.width;
    const h = drawTo.height;
    var imgPixels = ctx.getImageData(0, 0, w, h);
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4;
        //var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        const finalcolor = this.similarColor(
          [imgPixels.data[i], imgPixels.data[i + 1], imgPixels.data[i + 2]],
          palette
        );
        imgPixels.data[i] = finalcolor[0];
        imgPixels.data[i + 1] = finalcolor[1];
        imgPixels.data[i + 2] = finalcolor[2];
      }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  },

  draw(drawFrom, drawTo, ctx, maxWidth, maxHeight) {
    //draw image to canvas
    drawTo.width = drawFrom.width;
    drawTo.height = drawFrom.height;
    ctx.drawImage(drawFrom, 0, 0);
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
  },

  drawPixelImage(config) {
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
    console.log(this);
    this.draw(drawFrom, drawTo, ctx, maxWidth, maxHeight);

    drawTo.width = drawFrom.width;
    drawTo.height = drawFrom.height;

    const scaledW = drawTo.width * scale;
    const scaledH = drawTo.height * scale;

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
      this.convertGrayscale(ctx, drawTo);
    }
    if (palette && palette.length) {
      this.convertPalette(ctx, drawTo, palette);
    }
  },
};
