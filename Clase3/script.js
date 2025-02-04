function saveColor() {
    // Get the input field value
    let colorInput = document.getElementById("colorName").value.trim();
    let list = document.getElementById("colorList");
    // Limit the list to 2 items / refresh the page to restart
    if (list.children.length >= 2) {
        alert("You can only add up to 2 colors! Clean your palette");
        return;
    }
    // Display it inside list
    if (colorInput !== "") { 
        let list = document.getElementById("colorList"); 
        let newItem = document.createElement("li"); 
        newItem.textContent = colorInput; // 
        list.appendChild(newItem); 

        let colorBox = document.createElement("span");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = colorInput;
        newItem.appendChild(colorBox);
        }
    // Clean input space
    document.getElementById("colorName").value = "";
}

function mixColors()
{
    const weight = 0.5; //Colors will be half and half

    let listItems = document.querySelectorAll("#colorList li");
    //get colors
    let color1 = listItems[0].textContent.trim();
    let color2 = listItems[1].textContent.trim();

    let c1 = parseInt(color1.slice(1), 16); // Deletes '#' 
    let c2 = parseInt(color2.slice(1), 16);

    // Gets the RGB components of each color
    let r1 = (c1 >> 16) & 0xFF,
        g1 = (c1 >> 8) & 0xFF,
        b1 = c1 & 0xFF;

    let r2 = (c2 >> 16) & 0xFF,
        g2 = (c2 >> 8) & 0xFF,
        b2 = c2 & 0xFF;

    // Mixes !!
    let r = Math.round(r1 * (1 - weight) + r2 * weight);
    let g = Math.round(g1 * (1 - weight) + g2 * weight);
    let b = Math.round(b1 * (1 - weight) + b2 * weight);

    // Converts back to hexadecimal code
    let newColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    // shows color
    let colorBox = document.createElement("span");
    let newItem = document.getElementById("resultingColor"); 
        colorBox.classList.add("color-boxS");
        colorBox.style.backgroundColor = newColor;
        newItem.appendChild(colorBox);

    let listNames = document.getElementById("newColorName");
    let newName = document.createElement("li"); 
    newName.textContent = newColor;
    listNames.appendChild(newName);
    
    console.log(newColor);
    runConfetti();
}
function clearColor()
{
    let list = document.getElementById("colorList");
    let items = list.getElementsByTagName("li");
    while (items.length > 0) {
        list.removeChild(items[0]); // Always remove the first item
    }
        console.log("hey");

}
function runConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}