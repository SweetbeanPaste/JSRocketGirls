//# PROBLEM UNSOLVE: when switches tabs to "about" this process will be executed again
const names = ["Allen","Dinara","Eliv","Urumi","Clith","Dansu"];
let charactersDeck_CN =[]; //this one works as a list of all current cards in game
let charactersDeck = []; //While this one reflects the Main deck on screen


document.addEventListener('DOMContentLoaded', function() {   
    //createDeck
    if(checkForDeck()){
        loadDeck();
    }else{
    createDeck();
    }

    //save the deck+stats to read &Modify later
    localStorage.setItem("charactersDeck", JSON.stringify(charactersDeck_CN)); 
    })

function checkForDeck()
{
    const storedDeck = localStorage.getItem("charactersDeck");
    if (storedDeck.length>0) {
        // If a deck exists, load it
        charactersDeck_CN = JSON.parse(storedDeck);
        charactersDeck = [...charactersDeck_CN]; // Copy the loaded deck to the main deck
        console.log("Deck loaded from localStorage:", charactersDeck);  
        return true;
    }
    return false;
    
}

function loadDeck() {
    let section = document.getElementsByClassName('carddeck_Section'); 
    charactersDeck=[];
    for (i = 0 ; i<charactersDeck_CN.length ;i++) { 
        //Creating the deck
        let newCard = document.createElement("img");
        newCard.src="img/"+charactersDeck_CN[i].name+".png";
        newCard.classList.add("pjCard");
        newCard.id="Pj"+charactersDeck_CN[i].name;

        //Creating Object
        let character = {  // each cycle creates a new one
            name: charactersDeck_CN[i].name,
            health: charactersDeck_CN[i].health,
            damage: charactersDeck_CN[i].damage,
            shield: charactersDeck_CN[i].shield,
            imgurl:"img/"+charactersDeck_CN[i].name+".png"
        };
        //Assigning powers! & addint to screen
        newCard.classList.add("slide-top");
        section[0].appendChild(newCard);   

        charactersDeck.push(character);        

        createClickListener(newCard,character);
        
    }
    console.log(charactersDeck_CN);
}

function createDeck(){
    let section = document.getElementsByClassName('carddeck_Section'); 

    for (i = 0 ; i<=5 ;i++) { 
        //Creating the deck
        let newCard = document.createElement("img");
        newCard.src="img/"+names[i]+".png";
        newCard.classList.add("pjCard");
        newCard.id="Pj"+names[i];

        //Creating Object
        let character = {  // each cycle creates a new one
            name: names[i],
            health: getRandom(),
            damage: getRandom(),
            shield: getRandom(),
            imgurl:"img/"+names[i]+".png"
        };
        //Assigning powers! & addint to screen
        newCard.classList.add("slide-top");
        section[0].appendChild(newCard);
        
        charactersDeck.push(character);
        charactersDeck_CN.push(character);

        createClickListener(newCard,character);
    }
    console.log(charactersDeck_CN);
}

function getRandom() {
    //Gives a random number to fill in the characters stats
    let number =Math.floor(Math.random() * 11);
    return number;
  }

function createClickListener(newCard,character)
{
    newCard.addEventListener("click",function(){
        //removes the click Card from the Deck
        updateMainDeck(character);
        let playerDeck = document.getElementById("currentPYdeck");

        // Check if the player already has 3 cards
        if (playerDeck.children.length < 3) {
            // Remove card from main deck
            newCard.remove();

            // Create a new card for the player's deck
            let selectedCard = document.createElement("img");
            selectedCard.src = character.imgurl;
            selectedCard.classList.add("pjCard");
            selectedCard.id = "Pj" + character.name;
            // add Class for animation
            selectedCard.classList.add("redOverlay");
            selectedCard.classList.add("slide-top");
            selectedCard.classList.add("traceX");
            // add listener to delete from player's deck
            playerListener(selectedCard,character)
            // Append to player deck
            playerDeck.appendChild(selectedCard);
        } else {
            alert("You can only select up to 3 cards!");
        }
    });
}

function updateMainDeck(character){
    //Removes available character from Main deck ARRAY
    for(i=0;i<=charactersDeck.length;i++){
        if(charactersDeck[i]===character){
            charactersDeck.splice(i,1)
        }
    }
}

function addCardMainDeck(card)
{
    let section = document.getElementsByClassName('carddeck_Section'); 
    //Creating the deck
    let newCard = document.createElement("img");
    newCard.src="img/"+card.name+".png";
    newCard.classList.add("pjCard");
    newCard.id="Pj"+card.name;

    //Creating Object
    let character = {  // each cycle creates a new one
        name: card.name,
        health: card.health,
        damage: card.damage,
        shield: card.shield,
        imgurl:"img/"+card.name+".png"
    };
    //Assigning powers! & addint to screen
    newCard.classList.add("slide-top");
    section[0].appendChild(newCard);
    //Save in current available deck
    charactersDeck.push(character);
    createClickListener(newCard,character);
    console.log("I am here!",charactersDeck);
}

function ready()
{
    //Once the player is ready the remaining card will automatically go to the Pc deck
    if(playerDeckFull()){
        let pcDeck = document.getElementById("currentPCdeck");
        for(i=0 ; i<charactersDeck.length ; i++) {
            removeMainDeck(i);
            let newPcCard = document.createElement("img");
            newPcCard.src = charactersDeck[i].imgurl;
            newPcCard.classList.add("pjCard");
            newPcCard.id = "Pj" + charactersDeck[i].name;       
            // Remove card from main deck
            newPcCard.remove();
            // Append to pc deck       
            pcDeck.appendChild(newPcCard);        
        }    
        let section = document.getElementsByClassName('carddeck_Section')[0]; 
        if(section.childElementCount>1){
            //idk make the carddeck section flash lol
        }else{
            let msj = document.createElement("p");
            msj.textContent="There is no more cards!";
            msj.style.color="white";
            section.appendChild(msj);
            startAnimation();displayWinner();
        }
    }else{
        alert("You must select up to 3 cards!");
    }

}

function removeMainDeck(i){
    let cardId = "Pj" + charactersDeck[i].name;
        let cardInMainDeck = document.getElementById(cardId); // Get the actual card in the main deck

        if (cardInMainDeck) {
            cardInMainDeck.remove(); // Remove from the main deck on screen
        }
}

function playerListener(selectedCard,character)
{
    //deletes card from player's deck if click on -> return to the main deck
    selectedCard.addEventListener("click",function()
    {
        addCardMainDeck(character);
        selectedCard.remove();
    });

}
//start animation

function startAnimation()
{
    //instead I create the button here, and it comes alive after ready is click!
    setTimeout(() => {
        const startAnimation = document.createElement("div");
        startAnimation.classList.add("start-animation");

        const bar = document.createElement("div");
        bar.classList.add("bar");

        const startText = document.createElement("div");
        startText.classList.add("start-text");
        startText.textContent = "START!!";

        startAnimation.appendChild(bar);
        startAnimation.appendChild(startText);

        document.body.appendChild(startAnimation);

        // Remove the animation after 3 seconds
        setTimeout(() => {
          startAnimation.remove();
        }, 3000);
      }, 1000); // Wait 2 seconds before executing the animation
    
}
//Battler Simulation
function getPlayerStats()
{
    let totalHealth=0;
    let totalDmg=0;
    let totalShield=0;
    for(let i=0 ; i<charactersDeck_CN.length ; i++)
        {
            totalHealth+=charactersDeck_CN[i].health;
            totalDmg+=charactersDeck_CN[i].damage;
            totalShield+=charactersDeck_CN[i].shield;
        } 
    let enemyStats = getPcStats();
    totalHealth-=enemyStats[0];
    totalDmg-=enemyStats[1];
    totalShield-=enemyStats[2];    
    return [totalHealth,totalDmg,totalShield];
}

function getPcStats()
{
    let totalHealth=0;
    let totalDmg=0;
    let totalShield=0;
    console.log("PC DECK",charactersDeck);
    for(let i=0 ; i<charactersDeck.length ; i++)
        {
            totalHealth+=charactersDeck[i].health;
            totalDmg+=charactersDeck[i].damage;
            totalShield+=charactersDeck[i].shield;
        }
    return [totalHealth,totalDmg,totalShield];
}

function compareStats()
{
    let playerCounter=0;let pcCounter=0;
    let player = getPlayerStats();
    let pc = getPcStats();

    if(player[0]>pc[0]){
        playerCounter+=1;
    }else{
        pcCounter+=1;
    }

    if(player[1]>pc[1]){
        playerCounter+=1;
    }else{
        pcCounter+=1;
    }

    if(player[2]>pc[2]){
        playerCounter+=1;
    }else{
        pcCounter+=1;
    }
    console.log("player",player);console.log("enemy",pc);
    console.log(playerCounter,"and",pcCounter)
    return [playerCounter,pcCounter];
}

function createStatTable(name,array)
{
    let section = document.getElementById("finalResults");
    
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    // Create table header
    let headerRow = document.createElement("tr");
    let headers = [name, "#"];
    headers.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    let stats = [
        { name: "Total Health", value: array[0]},
        { name: "Total Damage", value: array[1] },
        { name: "Total Shield", value: array[2] }        
    ];

    stats.forEach(stat => {
        let row = document.createElement("tr");

        let statNameCell = document.createElement("td");
        statNameCell.textContent = stat.name;
        row.appendChild(statNameCell);

        let statValueCell = document.createElement("td");
        statValueCell.textContent = stat.value;    
        row.appendChild(statValueCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    section.appendChild(table);
}

function showCaseStats(){
    createStatTable("Player",getPlayerStats());
    createStatTable("Pc",getPcStats());
    
}


function displayWinner()
{
    setTimeout(function () {
    let section = document.getElementById("finalResults");
    let p = document.createElement("p");

    let stats = compareStats();
    showCaseStats();
    if(stats[0]>stats[1]){
        p.textContent ="Congrats you won!";
        p.style.color="green";
        runConfetti();
    }else{
        p.textContent ="Boo Hoo you lost!";
        p.style.color="red";
    }
    p.style.alignContent="center";
    p.style.fontSize = "110px";

    
        section.appendChild(p);}, 4000);
}

function runConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Validations
function playerDeckFull()
{   //Checks if the player's deck is complete before "ready" is click
    let playerDeck = document.getElementById("currentPYdeck");
    if (playerDeck.children.length === 3) {
        return true;
    }else{
        return false;
    }
}

// Clear localStorage when the page is about to reload
