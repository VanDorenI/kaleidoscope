// het document
console.log("hello");

const KAPPA = ((-1 + Math.sqrt(2)) / 3) * 4;

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
          "part-contour-links-onder4",
          "part-contour-rechts-boven3",
          "part-contour-rechts-boven2",
          "part-contour-links-boven3",
          "vertc-midden-klein-rechts",
        ],
        B: [
          "part-contour-links-boven3",
          "part-contour-rechts-boven3",
          "part-contour-rechts-onder4",
          "vertc-boven-links",
          "vertc-midden-klein-links",
        ],
        C: [
          "part-contour-links-onder4",
          "part-contour-links-boven3",
          "part-contour-rechts-onder4",
        ],
        D: [
          "part-contour-links-boven3",
          "part-contour-rechts-boven3",
          "part-contour-links-onder4",
          "vertc-boven-rechts",
          "vertc-midden-klein-rechts",
        ],
        E: [
          "part-contour-links-boven4",
          "Horiz-7",
          "part-contour-links-boven3",
          "part-contour-rechts-boven3",
          "part-contour-links-onder5",
          "part-contour-rechts-onder5",
        ],
        F: [
          "part-contour-links-boven3",
          "part-contour-links-boven1",
          "part-contour-rechts-boven1",
          "vertc-boven-links",
          "vertc-midden-klein-links",
        ],
        G: [
          "part-contour-links-boven3",
          "part-contour-rechts-boven3",
          "part-contour-links-onder4",
          "part-contour-rechts-onder4",
          "bol-6",
          "part-contour-rechts-boven5",
          "part-contour-rechts-onder6",
          "part-contour-links-onder6",
        ],
        H: [
          "part-contour-rechts-boven5",
          "part-contour-links-boven5",
          "vertc-midden-groot-links",
        ],
        I: ["vertc-midden-klein-midden1", "bol-2"],
        J: [
          "bol-3",
          "vertc-midden-klein-rechts",
          "part-contour-rechts-onder3",
          "vertc-onder-rechts",
          "part-contour-rechts-onder6",
          "part-contour-links-onder6",
        ],
        K: [
          "vertc-boven-links",
          "vertc-midden-klein-links",
          "part-contour-links-boven4",
          "part-contour-rechts-boven4",
          "part-contour-rechts-onder3",
        ],
        L: [
          "vertc-boven-links",
          "vertc-midden-klein-links",
          "part-contour-links-onder5",
        ],
        M: [
          "vertc-midden-klein-links",
          "vertc-midden-klein-midden1",
          "vertc-midden-klein-rechts",
          "part-contour-links-boven3",
          "part-contour-rechts-boven3",
        ],
        N: [
          "vertc-midden-klein-links",
          "vertc-midden-klein-rechts",
          "part-contour-rechts-boven2",
          "part-contour-links-boven2",
        ],
        O: [
          "part-contour-links-boven3",
          "part-contour-links-onder4",
          "part-contour-rechts-onder4",
          "part-contour-rechts-boven3",
        ],
        P: [
          "vertc-midden-klein-links",
          "vertc-onder-links",
          "part-contour-links-boven2",
          "part-contour-rechts-boven2",
          "part-contour-rechts-onder3",
        ],
        Q: [
          "vertc-midden-klein-rechts",
          "vertc-onder-rechts",
          "part-contour-rechts-boven2",
          "part-contour-links-boven2",
          "part-contour-links-onder3",
        ],
        R: [
          "vertc-midden-klein-links",
          "part-contour-links-boven2",
          "part-contour-rechts-boven2",
        ],
        S: [
          "vertc-midden-klein-links",
          "part-contour-links-onder3",
          "part-contour-rechts-boven4",
          "part-contour-rechts-onder5",
        ],
        T: [
          "vertc-boven-midden1",
          "part-contour-links-boven4",
          "part-contour-links-onder5",
          "part-contour-rechts-onder5",
          "Horiz-7",
        ],
        U: [
          "vertc-midden-klein-links",
          "vertc-midden-klein-rechts",
          "part-contour-rechts-onder4",
          "part-contour-links-onder4",
        ],
        V: [
          "vertc-midden-klein-links",
          "part-contour-links-boven4",
          "part-contour-rechts-onder3",
        ],
        W: [
          "vertc-midden-groot-links",
          "part-contour-links-boven4",
          "vertc-midden-klein-midden1",
          "vertc-midden-klein-rechts",
          "part-contour-rechts-onder4",
        ],
        X: [
          "vertc-midden-groot-links",
          "part-contour-links-onder3",
          "part-contour-links-boven4",
          "part-contour-rechts-onder3",
          "part-contour-rechts-boven4",
          "vertc-midden-groot-rechts",
        ],
        Y: [
          "vertc-midden-groot-rechts",
          "part-contour-rechts-onder3",
          "part-contour-links-onder3",
          "part-contour-rechts-onder6",
          "part-contour-links-onder6",
        ],
        Z: [
          "Horiz-10",
          "part-contour-links-boven5",
          "part-contour-rechts-onder4",
          "part-contour-rechts-boven3",
          "Horiz-5",
        ],
      },
      fontMap: {
        A: { name: "A", segments: "A" },
        B: { name: "B", segments: "B" },
        C: { name: "C", segments: "C" },
        D: { name: "D", segments: "D" },
        E: { name: "E", segments: "E" },
        F: { name: "F", segments: "F" },
        G: { name: "G", segments: "G" },
        H: { name: "H", segments: "H" },
        I: { name: "I", segments: "I" },
        J: { name: "J", segments: "J" },
        K: { name: "K", segments: "K" },
        L: { name: "L", segments: "L" },
        M: { name: "M", segments: "M" },
        N: { name: "N", segments: "N" },
        O: { name: "O", segments: "O" },
        P: { name: "P", segments: "P" },
        Q: { name: "Q", segments: "Q" },
        R: { name: "R", segments: "R" },
        S: { name: "S", segments: "S" },
        T: { name: "T", segments: "T" },
        U: { name: "U", segments: "U" },
        V: { name: "V", segments: "V" },
        W: { name: "W", segments: "W" },
        X: { name: "X", segments: "X" },
        Y: { name: "Y", segments: "Y" },
        Z: { name: "Z", segments: "Z" },
        // ....

        a: { name: "a", segments: "A" },
        b: { name: "b", segments: "B" },
        c: { name: "c", segments: "C" },
        d: { name: "d", segments: "D" },
        e: { name: "e", segments: "E" },
        f: { name: "f", segments: "F" },
        g: { name: "g", segments: "G" },
        h: { name: "h", segments: "H" },
        i: { name: "i", segments: "I" },
        j: { name: "j", segments: "J" },
        k: { name: "k", segments: "K" },
        l: { name: "l", segments: "L" },
        m: { name: "m", segments: "M" },
        n: { name: "n", segments: "N" },
        o: { name: "o", segments: "O" },
        p: { name: "p", segments: "P" },
        q: { name: "q", segments: "Q" },
        r: { name: "r", segments: "R" },
        s: { name: "s", segments: "S" },
        t: { name: "t", segments: "T" },
        u: { name: "u", segments: "U" },
        v: { name: "v", segments: "V" },
        w: { name: "w", segments: "W" },
        x: { name: "x", segments: "X" },
        y: { name: "y", segments: "Y" },
        z: { name: "z", segments: "Z" },
        // ....
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
    exportFont(weight) {
      const glyphHeight = 800;
      const glyphWidth = 200;
      const advanceWidth = 400;
      let shiftX = 0;
      if (weight === "regular") {
        shiftX = 400;
      } else if (weight === "bold") {
        shiftX = 800;
      }

      const glyphs = [];

      const notdefGlyph = new opentype.Glyph({
        name: ".notdef",
        unicode: 0,
        advanceWidth,
        path: new opentype.Path(),
      });
      glyphs.push(notdefGlyph);

      const space = new opentype.Glyph({
        name: "space",
        unicode: 32,
        advanceWidth: 400,
        path: new opentype.Path(),
      });
      glyphs.push(space);

      for (const character in this.fontMap) {
        const unicode = character.charCodeAt(0);
        const glyphInfo = this.fontMap[character];
        const name = glyphInfo.name;
        const segments = this.filterSegments(weight, glyphInfo.segments);
        const path = this.segmentsToPath(segments);
        this.flipPath(path, shiftX);
        const letterGlyph = new opentype.Glyph({
          name,
          unicode,
          advanceWidth,
          path,
        });
        glyphs.push(letterGlyph);
      }

      const exportFont = new opentype.Font({
        familyName: "Kaleidoscope Creation",
        styleName: "regular",
        unitsPerEm: 1000,
        ascender: 800,
        descender: -200,
        glyphs,
      });
      exportFont.download();
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
    filterSegments(weight, glyphName) {
      const segments = [];
      const segmentsNames = this.allSegments[glyphName];
      for (const segmentName of segmentsNames) {
        const fullName = weight + "-" + segmentName;
        const segment = document.getElementById(fullName);
        if (!segment) {
          throw new Error(`Could not find segment ${fullName}`);
        }
        segments.push(segment);
      }
      return segments;
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
    segmentsToPath(segments) {
      const path = new opentype.Path();
      for (const segment of segments) {
        if (segment.nodeName === "rect") {
          const x = parseFloat(segment.getAttribute("x"));
          const y = parseFloat(segment.getAttribute("y"));
          const w = parseFloat(segment.getAttribute("width"));
          const h = parseFloat(segment.getAttribute("height"));
          const x1 = x;
          const y1 = y;
          const x2 = x1 + w;
          const y2 = y1 + h;

          path.moveTo(x1, y1);
          path.lineTo(x2, y1);
          path.lineTo(x2, y2);
          path.lineTo(x1, y2);
        } else if (segment.nodeName === "circle") {
          const cx = parseFloat(segment.getAttribute("cx"));
          const cy = parseFloat(segment.getAttribute("cy"));
          const r = parseFloat(segment.getAttribute("r"));

          const d = KAPPA * r;
          const x1 = cx - r;
          const x2 = cx + r;
          const y1 = cy - r;
          const y2 = cy + r;

          path.moveTo(x1, cy);
          path.curveTo(x1, cy - d, cx - d, y1, cx, y1);
          path.curveTo(cx + d, y1, x2, cy - d, x2, cy);
          path.curveTo(x2, cy + d, cx + d, y2, cx, y2);
          path.curveTo(cx - d, y2, x1, cy + d, x1, cy);
        } else if (segment.nodeName === "path") {
          const d = segment.getAttribute("d");
          const pathSegments = normalize(absolutize(parsePath(d)));

          for (const seg of pathSegments) {
            if (seg.key === "M") {
              path.moveTo(...seg.data);
            } else if (seg.key === "L") {
              path.lineTo(...seg.data);
            } else if (seg.key === "C") {
              path.curveTo(...seg.data);
            } else if (seg.key === "Z") {
              path.close();
            }
          }
        }
      }
      return path;
    },
    flipPath(path, dx = 0) {
      const FLIP = 800;
      for (const command of path.commands) {
        if (command.type === "M" || command.type === "L") {
          command.y = Math.round(FLIP - command.y);
          command.x = Math.round(command.x - dx);
        } else if (command.type === "C") {
          command.x = Math.round(command.x - dx);
          command.x1 = Math.round(command.x1 - dx);
          command.x2 = Math.round(command.x2 - dx);
          command.y = Math.round(FLIP - command.y);
          command.y1 = Math.round(FLIP - command.y1);
          command.y2 = Math.round(FLIP - command.y2);
        }
      }
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
document.querySelector("#exportButton").addEventListener("click", (e) => {
  const weight = e.target.dataset.weight;
  mountedApp.exportFont(weight);
});
