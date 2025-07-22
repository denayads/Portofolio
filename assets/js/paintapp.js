const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const shapeSelect = document.getElementById("shape");
const colorSelect = document.getElementById("color");
const widthSlider = document.getElementById("width");

let painting = false;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;
let lastShape = null;

function startDrawing(e) {
  painting = true;
  startX = e.offsetX;
  startY = e.offsetY;
  lastX = startX;
  lastY = startY;
}

function draw(e) {
  if (!painting) return;
  const currentX = e.offsetX;
  const currentY = e.offsetY;
  const tool = shapeSelect.value;
  const color = colorSelect.value;
  const width = widthSlider.value;

  if (tool === "line") {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    lastX = currentX;
    lastY = currentY;
  } else {
    // Clear the canvas and redraw (simulate shape preview)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawSaved(); // Keep drawn shapes visible

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();

    if (tool === "rectangle") {
      const rectWidth = currentX - startX;
      const rectHeight = currentY - startY;
      ctx.strokeRect(startX, startY, rectWidth, rectHeight);
    }

    if (tool === "oval") {
      const radiusX = (currentX - startX) / 2;
      const radiusY = (currentY - startY) / 2;
      const centerX = startX + radiusX;
      const centerY = startY + radiusY;
      ctx.ellipse(
        centerX,
        centerY,
        Math.abs(radiusX),
        Math.abs(radiusY),
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
}

let savedShapes = [];

function stopDrawing(e) {
  if (!painting) return;
  painting = false;

  if (shapeSelect.value !== "line") {
    savedShapes.push({
      shape: shapeSelect.value,
      color: colorSelect.value,
      width: widthSlider.value,
      x1: startX,
      y1: startY,
      x2: e.offsetX,
      y2: e.offsetY,
    });
  }
}

function redrawSaved() {
  savedShapes.forEach((s) => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.width;
    ctx.beginPath();

    if (s.shape === "rectangle") {
      ctx.strokeRect(s.x1, s.y1, s.x2 - s.x1, s.y2 - s.y1);
    }

    if (s.shape === "oval") {
      const radiusX = (s.x2 - s.x1) / 2;
      const radiusY = (s.y2 - s.y1) / 2;
      const centerX = s.x1 + radiusX;
      const centerY = s.y1 + radiusY;
      ctx.ellipse(
        centerX,
        centerY,
        Math.abs(radiusX),
        Math.abs(radiusY),
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  });
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", () => (painting = false));
