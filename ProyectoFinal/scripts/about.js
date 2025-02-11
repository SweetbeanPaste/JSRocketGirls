//Scale 1-10
// Allen: 4💗 4⚔️ 3🛡️
//>His rotten body is at the limit. He lacks combat skills but is very smart.
// Dinara: 8💗 10⚔️ 10🛡️
//>She is Allen's older Sister. Her hair seems to be made of a very strong material and it's incredibly long,
//almost like a spider web...Be careful she is very protective of Allen.
// Eliv: 7💗 5⚔️ 10🛡️
//>This little girl is hollow inside, quite literally. Her body is made from a very sturdy material, almost like
//metal!. She seems a tough nut to crack.
// Urumi: 6💗 7⚔️ 5🛡️
//>Poor little doll, she is always weeping about something! She is Eliv's little goon.
// Clith: 7💗 8⚔️ 5🛡️
//>This big guy is almost 3m tall and has huge hands, those could crush your bones if he catches you. He also
//has some anger issues so don't get him rile up.
// Dansu: 10💗 1⚔️ 1🛡️
//>This lady is quite calm and collected...something is off.
let loadedDeck=[]

document.addEventListener('DOMContentLoaded', function() {
    //Load deck
    const storedDeck = localStorage.getItem("charactersDeck");
    if (storedDeck) {
        loadedDeck = JSON.parse(storedDeck);
        //console.log("this",loadedDeck); // The deck is now available!
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

}
function modifyStats(character){}
function saveStats(character){}

function displayInfo(character){
    console.log("here I am!");
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
    console.log("i am out");
    container.appendChild(newLore);
}