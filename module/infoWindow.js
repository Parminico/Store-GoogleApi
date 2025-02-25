export function bindInfo(marker, content) {
    const infoWindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, "click", () => {
            infoWindow.setContent(content);
            infoWindow.open({
                anchor: marker,
                map,
            });
        });
}