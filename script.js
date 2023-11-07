var canvas = document.getElementById("сanvas");
canvas.style.backgroundColor = "white";

var context = canvas.getContext("2d");
var selectedShape = "";
var isDrawing = false;
var startPoint = { x: 0, y: 0 };
canvas.addEventListener("contextmenu", removeShape);

function selectShape(shape) {
    selectedShape = shape;
}

var shapeSizeInput = document.getElementById("shapeSize");
var sizeValueElement = document.getElementById("sizeValue");

shapeSizeInput.addEventListener("input", function() {
    sizeValueElement.textContent = this.value;
});

function drawShape(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    switch (selectedShape) {
        case "square":
            drawSquare(x, y);
            break;

        case "line":
            if (!isDrawing) {
                startPoint = { x: x, y: y };
                isDrawing = true;
            } else {
                drawLine(startPoint.x, startPoint.y, x, y);
                isDrawing = false;
            }
            break;

        case "circle":
            drawCircle(x, y);
            break;

        case "triangle":
            drawTriangle(x, y);
            break;

        default:
            break;
    }
}

function drawSquare(x, y) {
    context.fillRect(x, y, shapeSizeInput.value, shapeSizeInput.value);
    context.strokeRect(x, y, shapeSizeInput.value, shapeSizeInput.value);
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = shapeSizeInput.value;
    context.stroke();
}

function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, shapeSizeInput.value / 2, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 1;
    context.stroke();
}

function drawTriangle(x, y) {
    var size = shapeSizeInput.value;
    context.beginPath();
    context.moveTo(x, y - size / 2);
    context.lineTo(x + size / 2, y + size / 2);
    context.lineTo(x - size / 2, y + size / 2);
    context.closePath();
    context.fill();
    context.lineWidth = 1;
    context.stroke();
}

function changeColors() {
    var fillColor = document.getElementById("fillColor").value;
    var strokeColor = document.getElementById("strokeColor").value;

    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
}

function removeShape(event) {
    event.preventDefault();
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    clearShape(x, y);
}

function clearShape(x, y) {
    var imageData = context.getImageData(x - 50, y - 50, 100, 100);
    var pixels = imageData.data;
    var allZeros = true;
    for (var i = 0; i < pixels.length; i += 4) {
        if (pixels[i] || pixels[i + 1] || pixels[i + 2] || pixels[i + 3]) {
            allZeros = false;
            break;
        }
    }
    if (!allZeros) {
        context.clearRect(x - 50, y - 50, 100, 100);
    }
}