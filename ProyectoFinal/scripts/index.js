//Creating characters from deck
//# PROBLEM UNSOLVE: when switches tabs to "about" this process will be executed again
const names = ["Allen","Dinara","Eliv","Urumi","Clith","Dansu"];
const charactersDeck = [];

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
    //Assigning powers!
    newCard.classList.add("slide-top");
    section[0].appendChild(newCard);
    
    charactersDeck.push(character);
    console.log(character); 
} 
console.log(charactersDeck);
})

function getRandom() {
    //Gives a random number to fill in the characters stats
    let number =Math.floor(Math.random() * 11);
    return number;
  }
