console.log("map");
// Convert latitude and longitude to canvas coordinates
function convertCoordinates(latitude, longitude) {
  const x = ((longitude + 180) / 360) * 400;
  const y = ((-latitude + 90) / 180) * 300;
  return { x, y };
}

window.onload = function () {
  const app = document.getElementById("app");
  const canvas = document.createElement("canvas");
  canvas.width = 400; // Set the width of the canvas
  canvas.height = 300; // Set the height of the canvas

  app.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const borderPoints = [
    [45, -123], // Portland, Oregon (Start Point)
    [48, -122], // Seattle, Washington
    [48, -117], // Spokane, Washington
    [44, -116], // Boise, Idaho
    [41, -112], // Salt Lake City, Utah
    [40, -105], // Denver, Colorado
    [35, -107], // Albuquerque, New Mexico
    [32, -106], // El Paso, Texas
    [32, -117], // San Diego, California
  ];

  // Define the border path for the United States
  ctx.beginPath();

  // Move to the starting point
  const startPoint = convertCoordinates(borderPoints[0][0], borderPoints[0][1]);
  ctx.moveTo(startPoint.x, startPoint.y);

  // Draw the border path
  for (let i = 1; i < borderPoints.length; i++) {
    const { x, y } = convertCoordinates(borderPoints[i][0], borderPoints[i][1]);
    ctx.lineTo(x, y);
  }
  // Set the stroke style
  ctx.strokeStyle = "red";

  // Stroke the border path
  ctx.stroke();
};
