//Creating characters from deck
//# PROBLEM UNSOLVE: when switches tabs to "about" this process will be executed again
const names = ["Allen","Dinara","Eliv","Urumi","Clith","Dansu"];
const charactersDeck_CN =[]; //this one works as a list of all current cards in game
let charactersDeck = []; //While this one reflects the Main desk on screen

document.addEventListener('DOMContentLoaded', function() {   
let section = document.getElementsByClassName('carddeck_Section'); 
//section=section.children[0].children

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
//save the deck+stats to read &Modify later
console.log(charactersDeck_CN);
localStorage.setItem("charactersDeck", JSON.stringify(charactersDeck_CN)); 
})

function loadDeck(){

}

function createDeck(){
    
}

function getRandom() {
    //Gives a random number to fill in the characters stats
    let number =Math.floor(Math.random() * 11);
    return number;
  }

// Click Func to modify and Delete
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
            selectedCard.classList.add("slide-top");
            // Append to player deck
            playerDeck.appendChild(selectedCard);
        } else {
            alert("You can only select up to 3 cards!");
        }
    });
}

function updateMainDeck(character){
    //Removes available character from Main deck array
    for(i=0;i<=charactersDeck.length;i++){
        if(charactersDeck[i]===character){
            charactersDeck.splice(i,1)
        }
    }
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
        let msj = document.createElement("p");
        msj.textContent="There is no more cards! Ready to play? Click Start!";
        msj.style.color="white";
        section.appendChild(msj);
    }else{
        alert("You must select up to 3 cards!");
    }

}

function removeMainDeck(i){
    let cardId = "Pj" + charactersDeck[i].name;
        let cardInMainDeck = document.getElementById(cardId); // Get the actual card in the main deck

        if (cardInMainDeck) {
            cardInMainDeck.remove(); // Remove from the main deck
        }
}

function changeCard(card,character)
{
    //deletes card from player's deck if click on -> return to the main deck
    card.addEventListener("click",function(){});

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