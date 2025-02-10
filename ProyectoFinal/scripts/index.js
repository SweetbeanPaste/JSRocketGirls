//Creating characters from deck
//# PROBLEM UNSOLVE: when switches tabs to "about" this process will be executed again
const names = ["Allen","Dinara","Eliv","Urumi","Clith","Dansu"];
const charactersDeck = [];

document.addEventListener('DOMContentLoaded', function() {   
let section = document.getElementsByClassName('carddeck_Section')[0]; 
section=section.children[0].children
for (i = 0 ; section.length !=i ;i++) { 
    let character = {  // each cycle creates a new one
        name: names[i],
        health: getRandom(),
        damage: getRandom(),
        shield: getRandom(),
        imgurl:"img/"+names[i]+".png"
    };
    section[i].classList.add("flipSide-360");
    
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
