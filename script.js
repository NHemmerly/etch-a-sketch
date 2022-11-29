//Create a variable 'grid' to store the container that will hold grid elements
const grid = document.querySelector(".grid");

//Function to create a grid. Will later create dynamically sized grids
function createGrid (rows, columns) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-columns', columns);
    for (let c = 0; c < (rows * columns); c++) {
        let cell = document.createElement("div");
        grid.appendChild(cell).className = "grid-item";
    };
};

createGrid(16, 16);