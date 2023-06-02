import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);
    }

    init() {
       

const MAX_CHART_SIZE = 600;
const MIN_CHART_SIZE = 300;
const CHART_RESIZE_FACTOR = 0.5;
const IS_MOBILE_WIDTH = 600;

const CHART_RENDER_DATA = [
  "M102 612L120.374 602.413C123.273 600.901 126.727 600.901 129.626 602.413L148 612",
  "M92 573L120.42 558.359C123.294 556.879 126.706 556.879 129.58 558.359L158 573",
  "M82 529L117.925 509.784C122.345 507.42 127.655 507.42 132.075 509.784L168 529",
  "M72 479.349L120.283 453.523C123.23 451.947 126.77 451.947 129.717 453.523L178 479.349",
  "M62 424.698L115.567 396.046C121.461 392.893 128.539 392.893 134.433 396.046L188 424.698",
  "M52 364L115.576 330.035C121.465 326.889 128.535 326.889 134.424 330.035L198 364",
  "M42 298.342L115.576 259.035C121.465 255.889 128.535 255.889 134.424 259.035L208 298.342",
  "M32 227.685L115.576 183.035C121.465 179.889 128.535 179.889 134.424 183.035L218 227.685",
  "M22 151.027L115.576 101.035C121.465 97.8887 128.535 97.8887 134.424 101.035L228 151.027",
  "M12 69.3699L115.576 14.0349C121.465 10.8887 128.535 10.8887 134.424 14.0349L238 69.3699",
];
const chartRootEl = document.getElementById("chart");
const chartDataEl = document.querySelector(".chart-data-wrapper");
//	const chartLegendEl = document.getElementById('chart-legend');

const getScrollParent = (node) => {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
};

const renderChart = (data) => {
  const isMobile = window.innerWidth <= IS_MOBILE_WIDTH;
  const chartSize = !isMobile
    ? Math.max(
        Math.min(chartRootEl.parentNode.clientWidth * 0.8, MAX_CHART_SIZE),
        MIN_CHART_SIZE
      )
    : chartRootEl.parentNode.clientWidth * 0.75;
  chartRootEl.innerHTML = "";
  //        chartLegendEl.innerHTML = '';
  chartRootEl.style.height = `${chartSize}px`;
  chartRootEl.style.width = `${chartSize}px`;

  data.forEach((section, i) => {
    const rotateDeg = (360 / data.length) * i;

    const chartSectionEl = document.createElement("div");
    chartSectionEl.className = "chart-section";
    chartSectionEl.style.transform = `rotateZ(${rotateDeg}deg) translateY(-60%)`;
    chartSectionEl.style.top = `${chartSize * 0.3}px`;
    chartSectionEl.style.left = `${chartSize * 0.4}px`;

    const chartSectionWidth = chartSize / 6;

    chartSectionEl.innerHTML = `
          <svg width="${chartSectionWidth}" viewBox="0 0 250 615" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${CHART_RENDER_DATA.map(
              (d, i) => `
              <path
                class="chart-path ${
                  i < section.value ? "chart-path-selected" : ""
                }"
                style="animation-delay: ${0.1 * i}s"
                d="${d}"
                stroke="#dfe6f7"
                stroke-width="${(isMobile ? 20 : 5) + i * 2}"
                stroke-miterlimit="2.9238"
                stroke-linecap="round"
                stroke-linejoin="round"
              />`
            ).join("\n")}
        </svg>
          `;
    chartRootEl.appendChild(chartSectionEl);

    const isCenter = rotateDeg % 180 < 40 || rotateDeg % 180 > 140;
    const chartTitleEl = document.createElement("p");
    const chartTitleWidth = isCenter ? 120 : 80;
    chartTitleEl.className = "chart-section-title";
    chartTitleEl.innerText = section.title;
    const textOffset = isCenter ? (isMobile ? 15 : 0) : isMobile ? 20 : 10;
    chartTitleEl.style.transform = `translateY(-${
      chartSize / 2 + textOffset
    }px) translateX(${
      -(chartTitleWidth - chartSectionWidth) / 2
    }px) rotateZ(-${rotateDeg}deg)`;
    chartTitleEl.style.width = `${chartTitleWidth}px`;
    chartSectionEl.appendChild(chartTitleEl);

    const legendRow = document.querySelector(
      `.case-project__left-list-item:nth-child(${i + 1})`
    );
    legendRow.onmouseover = chartSectionEl.onmouseover = () => {
      document.querySelectorAll("#chart .chart-section").forEach((element) => {
        element.classList.add("hover-hide");
      });
      chartSectionEl.classList.remove("hover-hide");
      document
        .querySelectorAll(".case-project__left-list-item")
        .forEach((element) => {
          element.classList.add("hover-hide");
        });
      document
        .querySelector(`.case-project__left-list-item:nth-child(${i + 1})`)
        .classList.remove("hover-hide");
    };
    legendRow.onmouseleave = chartSectionEl.onmouseleave = () => {
      document.querySelectorAll("#chart .chart-section").forEach((element) => {
        element.classList.remove("hover-hide");
      });
      document
        .querySelectorAll(".case-project__left-list-item")
        .forEach((element) => {
          element.classList.remove("hover-hide");
        });
    };
  });
};

renderChart(CHART_DATA);

window.addEventListener("resize", () => {
  renderChart(CHART_DATA);
});

// const scrollParent = getScrollParent(chartDataEl.parentNode);
const scrollParent = document.body;
if (scrollParent) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        chartRootEl.className = "chart-animate";
        observer.disconnect();
      }
    },
    {
      //            root: document.body,
      root: scrollParent,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );
  observer.observe(chartDataEl);
}
    }
}
