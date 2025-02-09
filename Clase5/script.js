//adding animation
document.addEventListener("DOMContentLoaded", function () { 
  //DOMContestLoaded will avoid any null error > this happens when the script compiles faster than the html
  let box = document.getElementById("box");
  //console.log(box);
  box.addEventListener("click", function () {
    console.log("hey");
    box.classList.add("heartbeat");
  });
});

//Save Task
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("userForm");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        let value = document.getElementById("userInput").value.trim();
        if (value === "") return; // avoid empty tasks

        let newItem = document.createElement("li");
        newItem.textContent = value;
        createListener(newItem);

        let list = document.querySelector('ul[name="taskList"]'); // Correct selection
        list.appendChild(newItem);

        document.getElementById("userInput").value = ""; // Clear input field after adding
    });
});
//Modes: Helps the program know when to delete and when to add, to the corresponding sections
function ChangeMode(mode)
{
  let textSlot = document.getElementById("modeDisplay");
  if(mode === false)
    {
      textSlot.textContent ="Deleting"
      textSlot.style.color="white";
      textSlot.style.backgroundImage = "radial-gradient(circle, #fe953e, #ffc05f, #ffec5f)";
      //console.log("del");
    }
    else if(mode === true)
      {
        textSlot.textContent ="Finishing"
        textSlot.style.backgroundImage = "radial-gradient(circle, #3da227, #a5f27e, #d8f27e)";
        //console.log("done");
      }
}
function getMode()
{
  return document.getElementById("modeDisplay").textContent;
}
// hover over task
function createListener(newItem)
{
    newItem.addEventListener("mouseover", () => {
        newItem.style.backgroundColor = "#279da4";  // Cambiar color al pasar el mouse
        newItem.style.color ="white";
      });
  
      newItem.addEventListener("mouseout", () => {
        newItem.style.backgroundColor = "transparent";  // Restaurar color al quitar el mouse
        newItem.style.color ="black";
      });
  
      newItem.addEventListener("click", () => {
        sortTask(newItem);
      }); 
}
function sortTask(newItem)
{
  let mode = document.getElementById("modeDisplay").textContent;
  if(mode === "Deleting")
    {
      deleteTask(newItem);
      newItem.remove();
    }
    else if(mode ==="Finishing")
      {
        finishTask(newItem);
        newItem.remove();
      }
      else{
        alert("Please Select the Mode you wish to use!");}
      return 0;
}

function finishTask(newItem)
{
  let list = document.getElementsByName("doneList")[0];
  let finishItem = document.createElement("li");
  finishItem.textContent=newItem.textContent+"✅";
  finishItem.style.color="green";

  list.appendChild(finishItem);
  return;
}

function deleteTask(newItem)
{
    let list = document.getElementsByName("deleteList")[0];
    let deletedItem = document.createElement("li");
    deletedItem.textContent=newItem.textContent+"❌";
    deletedItem.style.color="red";
    deletedItem.style.textDecoration="line-through";

    list.appendChild(deletedItem);
    return;

}

