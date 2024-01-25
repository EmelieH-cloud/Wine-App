// Selektorer -------------------------------------------------
let winecontainer = document.querySelector('#wine-container');
let wineUl = document.querySelector('#wine-list');
let addBtn = document.querySelector('#add-wine-btn');
let searchBox = document.querySelector('#searchBox');
let searchBtn = document.querySelector('#searchbtn');
let wineInfoElement = document.querySelector('#wine-info');

// EventListeners -------------------------------------------
document.addEventListener("DOMContentLoaded", getAllWines);
addBtn.addEventListener('click', addWine);
searchBtn.addEventListener('click', getWineById);

// Metoder ********************************************************

// getAllWines: Hämtar alla viner från API:et och anropar därefter printmetoden med vinerna som argument. 
function getAllWines() 
{
  fetch("https://localhost:7058/Wine")
    .then((result) => result.json())
    .then((fetched) => displayWines(fetched));
}

// displayWines: printar ut alla viner genom att ett listitem skapas för varje vin. 
function displayWines(wineList)
{
  // Gör detta för varje vin...
  wineList.forEach((wine) => 
  {
      // Skapa ett list-item
        const listItem = document.createElement('li'); 
        listItem.textContent = wine.name;
      // Lägg till ul-listan
        wineUl.appendChild(listItem);
  });
}

// addWine: samlar in input från gränssnittet och skickar vidare en POST-request till API:et 
function addWine() 
{
  let newWine = 
  {
    id: document.getElementById('id-input').value,
    name: document.getElementById('name-input').value,
    color: document.getElementById('color-input').value,
    age: document.getElementById('year-input').value,
    description: description = document.getElementById('description-input').value
  };

  fetch("https://localhost:7058/Wine", 
  {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
    },
    // Omvandlar objektet till json-format: 
 body: JSON.stringify(newWine), 

  }).then((res) =>  {

    if (res.ok)  // Om POST-requesten lyckades, hämta alla viner igen och uppdatera view.  
    {
      getAllWines();

    }
     else 
    {
      console.warn("Something is wrong with the API!");
    }
  });

  clearInputFields();
}

// clearInputFields: rensar alla input-rutor. 
function clearInputFields() 
{
  document.getElementById('id-input').value = '';
  document.getElementById('name-input').value = '';
  document.getElementById('color-input').value = '';
  document.getElementById('year-input').value = '';
  document.getElementById('description-input').value = '';
}

 function getWineById() {

    const id = searchBox.value;
    // Skapa GET-request med detta id 
    fetch(`https://localhost:7058/Wine/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) 
      {
           console.warn("Something is wrong with the API!");
      }
      return response.json();
    })
    .then(wine => {
      wineInfoElement.textContent = `Wine Name: ${wine.name}, Color: ${wine.color}, Year: ${wine.year}, Description: ${wine.description}`;
    })
    .catch(error => 
      {
      wineInfoElement.textContent = `Error: ${error}`;
    });

    searchBox.value = "";
  }