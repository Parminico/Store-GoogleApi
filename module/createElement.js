import { bindInfo } from "./infoWindow.js";

let map;
let allMarkers = [];

function getMap() {
    return map;
}
function zoomStore(lat, lng, zoom) {
    map.setOptions({
        center: {
            lat,
            lng,
        },
        zoom
    })
}

function initMap(lat, lng, zoom) {
    map = new google.maps.Map(document.querySelector('#map'), {
            center: {
                lat,
                lng
            },
            zoom,
        });
        return map
}



function createMarker(stores, map) {
    stores.forEach(store => {
        let marker = new google.maps.Marker({
            Animation: google.maps.Animation.DROP,
            position: store.coords,
            map: map,
        })
        bindInfo(marker, createDetail(store))
        allMarkers.push(marker);
    })
}

function hideMarkers() {
    allMarkers.map(marker => marker.setMap(null))
}

function refreshMarker(map, stores) {
    // clear marker from mao
    hideMarkers();
    // new cicle for insert marker
    let activeMarkers = allMarkers.filter(marker => {
        let markerPosition = marker.getPosition().toJSON();
        let activeMarker = stores.find(store =>
            store.coords.lat === markerPosition.lat &&
            store.coords.lng === markerPosition.lng
        )
        if(activeMarker) {
            marker.setMap(map);
        }
    })
}

function createDetail(store) {
    return `
        <h3>${store.name}</h3>
        <p>${store.address}</p>
        <p>${store.phone}</p>
        <a href="https://google.com/maps?saddr=My+Location&daddr=${store.coords.lat},${store.coords.lng}" target="_blank">Direction</a>
    `
}


export{createMarker, initMap, allMarkers, refreshMarker, getMap, zoomStore}