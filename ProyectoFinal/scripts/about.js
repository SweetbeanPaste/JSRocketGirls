let loadedDeck=[]

document.addEventListener('DOMContentLoaded', function() {
    //Load deck
    const storedDeck = localStorage.getItem("charactersDeck");
    if (storedDeck) {
        loadedDeck = JSON.parse(storedDeck);        
    }
    // Access the section
    let section = document.getElementsByClassName('character_info_carrusel')[0];  
    section=section.children[0];   
    for (i = 0 ; i< 5 ;i++) {        
        let newCard = document.createElement("img");
        newCard.src="img/"+loadedDeck[i].name+".png";
        newCard.classList.add("pjCard");
        newCard.id="Pj"+loadedDeck[i];
    
        //Creating Object
        let character = {  // each cycle creates a new one
            name: loadedDeck[i].name,
            health: loadedDeck[i].health,
            damage: loadedDeck[i].damage,
            shield: loadedDeck[i].shield,
            imgurl:"img/"+loadedDeck[i].name+".png"
        };
        //Assigning powers!        
        section.appendChild(newCard);
        createClickListener(newCard,character);
        }            
    });

// Listener
function createClickListener(newCard,character)
{
    newCard.addEventListener("click",function(){            
        displayStats(character);
        displayInfo(character);
    });
}
function displayStats(character){
    //Creates a Table for the stats
    
    let container = document.getElementById("character_statTable");
    container.innerHTML = "<h3>Current Stats</h3>";

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    // Create table header
    let headerRow = document.createElement("tr");
    let headers = ["Stats", "# 0-10"];
    headers.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    let stats = [
        { name: "Name", value: character.name},
        { name: "Health", value: character.health },
        { name: "Damage", value: character.damage },
        { name: "Shield", value: character.shield }
    ];

    stats.forEach(stat => {
        let row = document.createElement("tr");

        let statNameCell = document.createElement("td");
        statNameCell.textContent = stat.name;
        row.appendChild(statNameCell);

        let statValueCell = document.createElement("td");
        statValueCell.textContent = stat.value;
        statValueCell.setAttribute("contenteditable", "true"); // Make cell editable

        // Add input event listener for real-time updates
        statValueCell.addEventListener("input", (event) => {
            console.log("Modification:",character, stat.name, event.target.textContent);
            modifyStats(character, stat.name.toLowerCase(), event.target.textContent);
        });

        // Add keydown event listener for "Enter" key submission
        statValueCell.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default behavior (e.g., newline)
                let lc=stat.name.toLowerCase();
                modifyStats(character, stat.name.toLowerCase(), event.target.textContent);
                event.target.blur(); // Remove focus from the cell after submission
            }
            
        });

        row.appendChild(statValueCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

function modifyStats(character,stat,newValue)
{
    character[stat] = parseInt(newValue);
    for(i=0; i<loadedDeck.length; i++){
        if(loadedDeck[i].name=== character.name)
            {
                loadedDeck[i]=character;
            }
    }
    saveStats();
}

function saveStats()
{
    localStorage.setItem("charactersDeck", JSON.stringify(loadedDeck)); 
}

function displayInfo(character){
    let container = document.getElementById("character_info_container");
    let newLore = document.createElement("p");
    switch(character.name){
        case "Allen":
            newLore.textContent="His rotten body is at the limit. He lacks combat skills but is very smart.";
            break;
        case "Dinara":
            newLore.textContent="She is Allen's older Sister. Her hair seems to be made of a very strong material and it's incredibly long, almost like a spider web...Be careful she is very protective of Allen.";
            break;
        case "Eliv":
            newLore.textContent="This little girl is hollow inside, quite literally. Her body is made from a very sturdy material, almost like metal!. She seems a tough nut to crack.";
            break;
        case "Clith":
            newLore.textContent="This big guy is almost 3m tall and has huge hands, those could crush your bones if he catches you. He also has some anger issues so don't get him rile up.";
            break;
        case "Urumi":
            newLore.textContent="Poor little doll, she is always weeping about something! She is Eliv's little goon.";
            break;
        case "Dansu":
            newLore.textContent="This lady is quite calm and collected...something is off.";
            break;
    }
    container.innerHTML = "<h3>Info</h3>";
    container.appendChild(newLore);
}