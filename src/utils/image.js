// const LAZY_LOADED_IMAGES = [];

// export function loadImage(url, options = {}) {
//   return new Promise((resolve, reject) => {
//     const $img = new Image();

//     if (options.crossOrigin) {
//       $img.crossOrigin = options.crossOrigin;
//     }

//     const loadCallback = () => {
//       resolve({
//         element: $img,
//         ...getImageMetadata($img),
//       });
//     };

//     if ($img.decode) {
//       $img.src = url;
//       $img
//         .decode()
//         .then(loadCallback)
//         .catch((e) => {
//           reject(e);
//         });
//     } else {
//       $img.onload = loadCallback;
//       $img.onerror = (e) => {
//         reject(e);
//       };
//       $img.src = url;
//     }
//   });
// }

// export function getImageMetadata($img) {
//   return {
//     url: $img.src,
//     width: $img.naturalWidth,
//     height: $img.naturalHeight,
//     ratio: $img.naturalWidth / $img.naturalHeight,
//   };
// }

// /**
//  * Lazy load the given image.
//  *
//  * @param {HTMLImageElement} $el      - The image element.
//  * @param {?string}          url      - The URI to lazy load into $el.
//  *     If falsey, the value of the `data-src` attribute on $el will be used as the URI.
//  * @param {?function}        callback - A function to call when the image is loaded.
//  */
// export async function lazyLoadImage($el, url, callback) {
//   let src = url ? url : $el.dataset.src;

//   let loadedImage = LAZY_LOADED_IMAGES.find((image) => image.url === src);

//   if (!loadedImage) {
//     loadedImage = await loadImage(src);

//     if (!loadedImage.url) {
//       return;
//     }

//     LAZY_LOADED_IMAGES.push(loadedImage);
//   }

//   if ($el.src === src) {
//     return;
//   }

//   if ($el.tagName === "IMG") {
//     $el.src = loadedImage.url;
//   } else {
//     $el.style.backgroundImage = `url(${loadedImage.url})`;
//   }

//   requestAnimationFrame(() => {
//     let lazyParent = $el.closest(".c-lazy");

//     if (lazyParent) {
//       lazyParent.classList.add("-lazy-loaded");
//       lazyParent.style.backgroundImage = "";
//     }

//     $el.classList.add("-lazy-loaded");

//     callback?.();
//   });
// }

const LAZY_LOADED_IMAGES = [];
const LOADED_IMAGES = [];

export function loadImage(url, options = {}) {
  return new Promise((resolve, reject) => {
    let loadedImage = LOADED_IMAGES.find((image) => image.url === url);

    if (loadedImage) {
      resolve({
        ...loadedImage,
        ...options,
      });
    } else {
      const $img = new Image();

      if (options.crossOrigin) {
        $img.crossOrigin = options.crossOrigin;
      }

      const loadCallback = () => {
        const result = {
          element: $img,
          ...getImageMetadata($img),
          ...options,
        };
        LOADED_IMAGES.push(result);
        resolve(result);
      };

      if ($img.decode) {
        $img.src = url;
        $img
          .decode()
          .then(loadCallback)
          .catch((e) => {
            reject(e);
          });
      } else {
        $img.onload = loadCallback;
        $img.onerror = (e) => {
          reject(e);
        };
        $img.src = url;
      }
    }
  });
}

export function getImageMetadata($img) {
  return {
    url: $img.src,
    width: $img.naturalWidth,
    height: $img.naturalHeight,
    ratio: $img.naturalWidth / $img.naturalHeight,
  };
}

/**
 * Lazy load the given image.
 *
 * @param {HTMLImageElement} $el      - The image element.
 * @param {?string}          url      - The URI to lazy load into $el.
 *     If falsey, the value of the `data-src` attribute on $el will be used as the URI.
 * @param {?function}        callback - A function to call when the image is loaded.
 */
export async function lazyLoadImage($el, url, callback) {
  let src = url ? url : $el.dataset.src;

  let loadedImage = LAZY_LOADED_IMAGES.find((image) => image.url === src);

  if (!loadedImage) {
    loadedImage = await loadImage(src);

    if (!loadedImage.url) {
      return;
    }

    LAZY_LOADED_IMAGES.push(loadedImage);
  }

  if ($el.src === src) {
    return;
  }

  if ($el.tagName === "IMG") {
    $el.src = loadedImage.url;
  } else {
    $el.style.backgroundImage = `url(${loadedImage.url})`;
  }

  requestAnimationFrame(() => {
    let lazyParent = $el.closest(".c-image");

    if (lazyParent) {
      lazyParent.classList.add("-loaded");
      lazyParent.style.backgroundImage = "";
    }

    $el.classList.add("-loaded");

    callback?.();
  });
}

export async function animDepixelate($el) {
  const $parent = $el.parentNode;
  $parent.classList.add("-pixelated");

  const previousCanvas = $parent.querySelector("canvas");
  if (previousCanvas) previousCanvas.remove();

  // add canvas
  const canvas = document.createElement("canvas");
  canvas.style.zIndex = 10;
  $parent.appendChild(canvas);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  // handle dimensions
  const maxWidth = 128;
  let w = $el.naturalWidth;
  let h = $el.naturalHeight;
  if (w > maxWidth) {
    h = maxWidth * (h / w);
    w = maxWidth;
  }

  // do the thing
  const pixelate = async (sample_amount) => {
    return new Promise((resolve) => {
      if (!canvas.parentNode) {
        resolve();
        return;
      }

      const sample_size = Math.round(w / sample_amount);

      ctx.canvas.width = w;
      ctx.canvas.height = h;
      ctx.drawImage($el, 0, 0, w, h);

      const pixelArr = ctx.getImageData(0, 0, w, h).data;

      for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
          const p = (x + y * w) * 4;
          ctx.fillStyle =
            "rgba(" +
            pixelArr[p] +
            "," +
            pixelArr[p + 1] +
            "," +
            pixelArr[p + 2] +
            "," +
            pixelArr[p + 3] +
            ")";
          ctx.fillRect(x, y, sample_size, sample_size);
        }
      }

      resolve();
    });
  };

  // timeline
  const ITERATION_DELAY = 100;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  await pixelate(8);
  await delay(ITERATION_DELAY);
  await pixelate(16);
  await delay(ITERATION_DELAY);
  await pixelate(32);
  await delay(ITERATION_DELAY);
  await pixelate(48);
  await delay(ITERATION_DELAY);
  await pixelate(96);
  await delay(ITERATION_DELAY);
  await pixelate(128);
  // await delay(ITERATION_DELAY);
  // await pixelate(250);
  // await delay(ITERATION_DELAY);
  // await pixelate(512);
  // await delay(ITERATION_DELAY);

  // remove canvas
  canvas.remove();
  $parent.classList.remove("-pixelated");
}
