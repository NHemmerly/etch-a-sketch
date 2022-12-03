//Set global variables
const grid = document.querySelector(".grid");
const DEF_COLOR = "#000";
const DEF_BACKGROUND_COLOR = "#FEF7F8";

let background = DEF_BACKGROUND_COLOR;
let currentColor = DEF_COLOR;
let rainbow = false;
let shader = false;
let shadeR = 0;
let shadeG = 0;
let shadeB = 0;

//Display the value of canvas size slider
var canvasSize = document.querySelectorAll('#value');
var slider = document.querySelector('.slider');
canvasSize.forEach(canvas => canvas.textContent = slider.value);

slider.oninput = () => {
    canvasSize.forEach(canvas => canvas.textContent = slider.value);
    createGrid(slider.value, slider.value);
}

//initialize pen and eraser tools

let pen = true;
let eraser = false;

let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

//Function to create a grid. Will later create dynamically sized grids
function createGrid (rows, columns) {
    resetGrid();
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
    setBackgroundColor(background);
};

//When Mousebutton is down and hovering over the canvas, add a pixel of desired color
function addPixel(e) {
    if (e.type == 'mouseover' && !mousedown) {
        return;
    }
    else if ((e.type == 'mouseover' && mousedown) || e.type == 'click') {
            if (pen == true) {
                if (rainbow == true) {
                    makeRainbow();
                    e.target.style.setProperty('background-color', currentColor);
                } else if (shader == true) {
                    convertToRGB(e.target.style.backgroundColor);
                    e.target.style.setProperty('background-color', currentColor);
                } else {
                    e.target.style.setProperty('background-color', currentColor);
                }
            } else if (eraser == true) {
                e.target.style.setProperty('background-color', background);
            }
        }
    }

function setColor(newColor) {
    currentColor = newColor;
}

function resetGrid() {
    let pixels = document.querySelectorAll(".grid-item");
    pixels.forEach(pix => pix.remove());
}

function setBackgroundColor(newColor) {
    background = newColor;
    let pixels = document.querySelectorAll(".grid-item");
    pixels.forEach(pix => pix.style.setProperty('background-color', background));
}

function makeRainbow() {
    const rainR = Math.floor(Math.random() * 256);
    const rainG = Math.floor(Math.random() * 256);
    const rainB = Math.floor(Math.random() * 256);
    currentColor = `rgb(${rainR}, ${rainG}, ${rainB})`;
    return currentColor;
}

//Functions for shader
function makeShader() {
    currentColor = `rgb(${256 * .9}, ${256 * .9}, ${256 * .9})`
}

function convertToRGB(color) {
    var hexToRGB = color.match(/\d+/g);
    
    shadeR = hexToRGB[0] - 26;
    shadeG = hexToRGB[1] - 26;
    shadeB = hexToRGB[2] - 26;
    currentColor = `rgb(${shadeR}, ${shadeG}, ${shadeB})`;
}
//Toggle erase button
let erase = document.getElementById("erase");
erase.addEventListener("click", () => {
    erase.style.setProperty("background-color", "orange");
    draw.style.setProperty("background-color", "antiquewhite");
    eraser = true;
    pen = false;
});

//Toggle pen button
let draw = document.getElementById("pen");
draw.style.setProperty("background-color", "orange");
draw.addEventListener("click", () => {
    draw.style.setProperty("background-color", "orange");
    erase.style.setProperty("background-color", "antiquewhite");
    pen = true;
    eraser = false;
});

//Toggle rainbow button
let rainbowButton = document.getElementById("rainbow");
rainbowButton.addEventListener("click", () => {
    if (rainbow == true) {
        rainbow = false;
        currentColor = DEF_COLOR;
        rainbowButton.style.setProperty('background-color', 'antiquewhite');
    } else {
        rainbow = true;
        shader = false;
        rainbowButton.style.setProperty('background-color', 'orange');
        shaderButton.style.setProperty('background-color', 'antiquewhite');
    }
});

//Toggle shader button
let shaderButton = document.getElementById('shader');
shaderButton.addEventListener("click", () => {
    if (shader == true) {
        shader = false;
        currentColor = DEF_COLOR;
        shaderButton.style.setProperty('background-color', 'antiquewhite');
    } else {
        shader = true;
        rainbow = false;
        shaderButton.style.setProperty('background-color', 'orange');
        rainbowButton.style.setProperty('background-color', 'antiquewhite');
    }
})

//Color Selector, background color selector
const selectColor = document.getElementById("color");
selectColor.value = "#000000";
selectColor.oninput = (e) => setColor(e.target.value);

const backgroundSelect = document.getElementById("background");
backgroundSelect.value = DEF_BACKGROUND_COLOR;
backgroundSelect.oninput = (e) => setBackgroundColor(e.target.value);


//Button to clear the canvas
let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    let pixels = document.querySelectorAll(".grid-item");
    pixels.forEach(pix => pix.style.setProperty('background-color', background));
});

//User can select a different color, variables are returned to decide the color

createGrid(16, 16);