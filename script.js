//Set global variables
const grid = document.querySelector(".grid");
const DEF_COLOR = "#000";
const DEF_BACKGROUND_COLOR = "#FEF7F8";

let background = DEF_BACKGROUND_COLOR;
let currentColor = DEF_COLOR;

//Display the value of canvas size slider
var canvasSize = document.querySelectorAll('#value');
var slider = document.querySelector('.slider');
canvasSize.forEach(canvas => canvas.textContent = slider.value);

slider.oninput = () => {
    canvasSize.forEach(canvas => canvas.textContent = slider.value);
}

//initialize pen and eraser tools

let pen = true;
let eraser = false;

let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

//Function to create a grid. Will later create dynamically sized grids
function createGrid (rows, columns) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-columns', columns);
    for (let c = 0; c < (rows * columns); c++) {
        let cell = document.createElement("div");
        cell.style.setProperty('background-color', background);
        cell.addEventListener('click', addPixel);
        cell.addEventListener('mouseover', addPixel);
        cell.addEventListener('mousedown', addPixel);
        grid.appendChild(cell).className = "grid-item";
    };
};

//When Mousebutton is down and hovering over the canvas, add a pixel of desired color
function addPixel(e) {
    if (e.type == 'mouseover' && !mousedown) {
        return;
    }
    else if ((e.type == 'mouseover' && mousedown) || e.type == 'click') {
        if (pen == true) {
            e.target.style.setProperty('background-color', currentColor);
        } else if (eraser == true) {
            e.target.style.setProperty('background-color', background);
        }
    }
}

function setColor(newColor) {
    currentColor = newColor;
}

function setBackgroundColor(newColor) {
    background = newColor;
    let pixels = document.querySelectorAll(".grid-item");
    pixels.forEach(pix => pix.style.setProperty('background-color', background));
}

//Toggle erase button
let erase = document.getElementById("erase");
erase.addEventListener("click", () => {
    eraser = true;
    pen = false;
});

//Toggle pen button
let draw = document.getElementById("pen");
draw.addEventListener("click", () => {
    pen = true;
    eraser = false;
});

//Color Selector, background color selector
const selectColor = document.getElementById("color");
selectColor.oninput = (e) => setColor(e.target.value);

const backgroundSelect = document.getElementById("background");
backgroundSelect.oninput = (e) => setBackgroundColor(e.target.value);


//Button to clear the canvas
let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    let pixels = document.querySelectorAll(".grid-item");
    pixels.forEach(pix => pix.style.setProperty('background-color', background));
});

//User can select a different color, variables are returned to decide the color

createGrid(16, 16);