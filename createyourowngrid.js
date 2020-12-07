// het document
const canvas = document.getElementById("canvas");

async function loadfont() {
  const res = await fetch("gridmaker-webversie-kaleidoscope.svg");
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
}
function toggleShape(e) {
  console.log(e);
  const shape = e.target;
  if (shape.getAttribute("fill") === "rgba(0, 0, 0, 0)") {
    shape.setAttribute("fill", "black");
  } else {
    shape.setAttribute("fill", "rgba(0, 0, 0, 0)");
  }
}
loadfont();

/*letterselector */
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

const app= vue.createapp({
  data(){
    return{
      glyphs: GLYPHS,
      currentGlyph: "A", 
    };
  },
});x
