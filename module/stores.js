import { allStores, clientContenitor } from "../script.js";
import { refreshMarker, getMap, zoomStore } from "./createElement.js";

function createCard(stores, contenitore) {

    contenitore.innerHTML = '';
    stores.forEach(store => {
        let contain = document.createElement('div');
        contain.classList.add('client');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let direction = document.createElement('a');

        // zoom store
        contain.addEventListener('click', () => {
            zoomStore(store.coords.lat, store.coords.lng, 15)
        })

        name.textContent = store.name;
        address.textContent = store.address;
        phone.innerHTML = store.phone;
        direction.textContent = 'Direction';
        direction.target = '_blank'
        direction.href = `https://google.com/maps?saddr=My+Location&daddr=${store.coords.lat},${store.coords.lng}`;

        contain.append(name, address, phone, direction);
        contenitore.append(contain)
    })
}



// LOGIC BUTTON FILTER
let filterParams = {
    category: 'All',
    searchTerm: ''
}

function setButtonFilter(filter, value) {
    updateFilter(filter, value);
    let filterStore = applyFilter();
    createCard(filterStore, clientContenitor);
    let map = getMap();
    refreshMarker(map, filterStore)
}
//
function updateFilter(filter, value) {
    filterParams = {
        ...filterParams,
        [filter]: value,
    }
}
function applyFilter() {
    let filteredStores = allStores;
    // filter for category
    if(filterParams.category !== 'All') {
        filteredStores = filteredStores.filter(
            store => store.categories.includes(filterParams.category)
        )
    }
    // filter for search
    if(filterParams.searchTerm !== '') {
        filteredStores = filteredStores.filter(
            store =>
                store.name.toLowerCase().includes(filterParams.searchTerm) ||
                store.address.toLowerCase().includes(filterParams.searchTerm)
        )
    }
    return filteredStores
}




export {setButtonFilter, createCard}