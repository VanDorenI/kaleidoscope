// het document
console.log("hello");

const canvas = document.getElementById("canvas");

function copyText(text) {
  console.log("COPY: ", text);
  const el = document.createElement("pre");
  el.textContent = text;
  document.body.appendChild(el);
  const range = document.createRange();
  range.selectNode(el);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  el.remove();
}

function toShortSegmentName(fullName) {
  const shortName = fullName
    .replace("light-", "")
    .replace("regular-", "")
    .replace("bold-", "");
  return shortName;
}

async function loadfont() {
  const res = await fetch("gridmaker-webversie-kaleidoscope-def.svg");
  const svgCode = await res.text();

  canvas.outerHTML = svgCode;
  const svg = document.querySelector("svg");
  const rects = svg.querySelectorAll("rect");
  for (const rect of rects) {
    rect.setAttribute("display", "inline");
    rect.addEventListener("click", toggleShape);
    rect.setAttribute("fill", "rgba(0, 0, 0, 0)");
  }
  const paths = svg.querySelectorAll("path");
  for (const path of paths) {
    path.setAttribute("display", "inline");
    path.addEventListener("click", toggleShape);
    path.setAttribute("fill", "rgba(0, 0, 0, 0)");
  }
  const circles = svg.querySelectorAll("circle");
  for (const circle of circles) {
    circle.setAttribute("display", "inline");
    circle.addEventListener("click", toggleShape);
    circle.setAttribute("fill", "rgba(0, 0, 0, 0)");
  }
  const groups = svg.querySelectorAll("g");
  for (const group of groups) {
    group.setAttribute("display", "inline");
  }

  mountedApp.currentGlyph = "A";
  mountedApp.updateVisibleSegments();
}
function toggleShape(e) {
  const shape = e.target;
  const segmentName = toShortSegmentName(shape.id);
  console.log(mountedApp.currentSegmentNames);
  if (shape.getAttribute("fill") === "rgba(0, 0, 0, 0)") {
    shape.setAttribute("fill", "black");
    mountedApp.currentSegments.push(segmentName);
  } else {
    shape.setAttribute("fill", "rgba(0, 0, 0, 0)");
    const indexOfSegment = mountedApp.currentSegments.indexOf(segmentName);
    mountedApp.currentSegments.splice(indexOfSegment, 1);
  }
  mountedApp.updateVisibleSegments();
}
loadfont();

const GLYPHS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const app = Vue.createApp({
  data() {
    return {
      glyphs: GLYPHS,
      allSegments: {
        A: [
          "part-contour-rechts-boven3",
          "part-contour-links-boven4",
          "part-contour-rechts-boven4",
          "part-contour-links-onder5",
          "part-contour-rechts-boven5",
          "part-contour-rechts-onder5",
          "vertc-midden-groot-rechts",
        ],
        B: [
          "part-vol-links-onder1",
          "part-vol-rechts-boven1",
          "part-vol-links-boven1",
        ],
        C: ["part-contour-links-onder4", "part-contour-links-boven3"],
        D: [
          "part-contour-rechts-onder3",
          "part-contour-rechts-boven2",
          "part-contour-links-boven3",
          "part-contour-links-boven2",
          "Horiz-4",
        ],
      },
      currentGlyph: "A",
      currentStyle: "regular",
    };
  },
  computed: {
    currentSegments() {
      return this.allSegments[this.currentGlyph];
    },
  },
  methods: {
    setCurrentGlyph(glyph) {
      this.currentGlyph = glyph;
      this.updateVisibleSegments();
    },
    updateVisibleSegments() {
      const visibleSegmentNames = this.currentSegments;
      console.log(this.currentGlyph, visibleSegmentNames);
      const svg = document.querySelector("svg");
      const allSegments = svg.querySelectorAll("rect,path,circle");
      for (const segment of allSegments) {
        const fullName = segment.id;
        const shortName = fullName
          .replace("light-", "")
          .replace("regular-", "")
          .replace("bold-", "");
        if (visibleSegmentNames.includes(shortName)) {
          segment.setAttribute("fill", "black");
        } else {
          segment.setAttribute("fill", "rgba(0, 0, 0, 0)");
        }
      }
    },
    copySegments() {
      const svg = document.querySelector("svg");
      const allSegments = svg.querySelectorAll("rect,path,circle");
      const visibleSegments = [];
      for (const segment of allSegments) {
        if (segment.getAttribute("fill") === "black") {
          visibleSegments.push(segment);
        }
        // console.log(segment.getAttribute('fill'));
      }
      const visibleSegmentNames = visibleSegments.map((el) => el.id);
      const shortSegmentNames = visibleSegmentNames.map((fullName) =>
        fullName
          .replace("light-", "")
          .replace("regular-", "")
          .replace("bold-", "")
      );
      const set = new Set(shortSegmentNames);

      // console.log(shortSegmentNames);
      copyText(JSON.stringify(Array.from(set)));
    },
  },
});

const mountedApp = app.mount(".app");
window.addEventListener("keydown", (e) => {
  if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    mountedApp.copySegments();
  }
});
