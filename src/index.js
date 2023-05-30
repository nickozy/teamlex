import modular from "modujs";
import * as modules from "./modules";
import { html } from "./utils/environment";

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
  const $fs1 = document.getElementById("fs1");
  const $fs2 = document.getElementById("fs2");
  const $fs3 = document.getElementById("fs3");
  const $fs4 = document.getElementById("fs4");
  const $fs5 = document.getElementById("fs5");
  const $fs6 = document.getElementById("fs6");
  const $fs7 = document.getElementById("fs7");

  if ($style && $fs1 && $fs2 && $fs3 && $fs4 && $fs5 && $fs6 && $fs7) {
    if (
      $style.isLoaded &&
      $fs1.isLoaded &&
      $fs2.isLoaded &&
      $fs3.isLoaded &&
      $fs4.isLoaded &&
      $fs5.isLoaded &&
      $fs6.isLoaded &&
      $fs7.isLoaded
    ) {
      init();
    } else {
      $style.addEventListener("load", (event) => {
        $fs1.addEventListener("load", (event) => {
          $fs2.addEventListener("load", (event) => {
            $fs3.addEventListener("load", (event) => {
              $fs4.addEventListener("load", (event) => {
                $fs5.addEventListener("load", (event) => {
                  $fs6.addEventListener("load", (event) => {
                    $fs7.addEventListener("load", (event) => {
                      init();
                    });
                  });
                });
              });
            });
          });
        });
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
