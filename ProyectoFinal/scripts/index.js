//# PROBLEM UNSOLVE: when switches tabs to "about" this process will be executed again
const names = ["Allen","Dinara","Eliv","Urumi","Clith","Dansu"];
const charactersDeck_CN =[]; //this one works as a list of all current cards in game
let charactersDeck = []; //While this one reflects the Main desk on screen

document.addEventListener('DOMContentLoaded', function() {   
    //createDeck
    createDeck();

    //save the deck+stats to read &Modify later
    localStorage.setItem("charactersDeck", JSON.stringify(charactersDeck_CN)); 
    })

function loadDeck(){

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
            // Append to player deck       
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
            startAnimation();
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

}
function getPcStats()
{
    let totalHealth=0;
    let totalDmg=0;
    let totalShield=0;
    for(let i=0 ; i<charactersDeck.length ; i++)
        {
            totalHealth+=charactersDeck[i].health;
            totalDmg+=charactersDeck[i].damage;
            totalShield+=charactersDeck[i].shield;
        }
        console.log(totalDmg,totalHealth,totalShield);
}

function collectStats()
{


}

function compareStats()
{

}

function displayWinner()
{

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