import { createMarker, initMap } from "./module/createElement.js";
import { setButtonFilter, createCard } from "./module/stores.js";

let clientContenitor = document.querySelector('#client-contenitor');

let allStores = [];

let myCoords = {
    lat: 42.646184,
    lng: 12.932628,
    zoom: 6
}

async function initApp() {
    try {
        let stores = await fetch("stores.json")
            .then(res => res.json())
            .then(data => {
                allStores = data.stores;
                createCard(data.stores, clientContenitor);
                let map = initMap(myCoords.lat, myCoords.lng, myCoords.zoom);
                createMarker(data.stores, map);
            });
        } catch(err) {
        document.querySelector('#map').innerHTML = 'Sorry, something is not function'
    }
} 

initApp()
// fetch("stores.json")
//     .then(res => res.json())
//     .then(data => {
//         createCard(data.stores, clientContenitor);
//         let map = initMap(myCoords.lat, myCoords.lng, myCoords.zoom)
//         createMarker(data.stores, map)
//     })

// LOGICA HAMBURGER
let lateralContain = document.querySelector('.lateral-contain');
let hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click', () => {
    lateralContain.classList.toggle('display')
})
const icons = document.querySelectorAll('#hamburger');
icons.forEach (icon => {  
    icon.addEventListener('click', (event) => {
    icon.classList.toggle("open");
    });
});

// FILTER BUTTON
let buttons = Array.from(document.querySelectorAll('.filter-button button'));
let buttonsContainer = document.querySelector('.filter-button');

buttonsContainer.addEventListener('click', (e) => {
    let pressedButton = e.target.closest('button')
    if(pressedButton) {
        pressedButton.classList.add('active');
        let other = buttons.filter(button => button !== pressedButton);
        other.forEach(butt => butt.classList.remove('active'));
        setButtonFilter('category', pressedButton.dataset.filter)
    }
})

// FILTER STORE CATEGORY
let searchStore = document.querySelector('#search-store');
let clearButton = document.querySelector('#clear-store');

searchStore.addEventListener('keypress', () => searchInput());
clearButton.addEventListener('click', () => clearSearch());

function searchInput() {
    let userSearch = searchStore.value.toLowerCase();
    setButtonFilter('searchTerm', userSearch)
}
function clearSearch() {
    searchStore.value = '';
    searchInput()
}



export {allStores, clientContenitor}