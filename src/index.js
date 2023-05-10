import modular from "modujs";
import * as modules from "./modules";

const html = document.documentElement;

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", `${window.innerHeight}px`);
};
// window.addEventListener("resize", appHeight);
appHeight();

const app = new modular({
  modules: modules,
});

window.onload = (event) => {
  const $style = document.getElementById("main-css");

  if ($style) {
    if ($style.isLoaded) {
      init();
    } else {
      $style.addEventListener("load", (event) => {
        init();
      });
    }
  } else {
    console.warn('The "main-css" stylesheet not found');
  }
};

function init() {
  app.init(app);

  html.classList.add("is-loaded");
  html.classList.add("is-ready");
  html.classList.remove("is-loading");
}
