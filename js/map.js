"use strict"

// get current location
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getdata([position.coords.longitude, position.coords.latitude]);
        }, error => {
            let error_text = document.getElementById('error_text')
            error_text.innerHTML = "Enable location to see result"
        })
    }

}

// settin up map with markers and popups
function setmap(center, json_data) {
    console.log(json_data);
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWFuIiwiYSI6ImNrd3dkNjZ6eDAybW8yb3A4a3llamgydWoifQ.nXkTuK4XZ_pcxbi11UK3pQ';

    //create new map
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
    });

    // marker and popup for current location
    new mapboxgl.Marker({
        color: "blue",
        draggable: false
    }).setLngLat(center).setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${"Olet Tässä"}</h3>`
        ))
        .addTo(map);

    // restaurants marker and popup
    for (const feature of json_data.features) {
        new mapboxgl.Marker({ color: "red" }).setLngLat(feature.geometry.coordinates).setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${feature.text}</h3><p>${feature.properties.address}</p>`
                )
        ).addTo(map);
    }
    // button for tracking current location
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        })
    );

}

// get nearby restaurants info json file
function getdata(center) {
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?type=poi&limit=20&proximity=" + center[0] + "," + center[1] + "&access_token=pk.eyJ1IjoibmFpbWFuIiwiYSI6ImNrd3dkNjZ6eDAybW8yb3A4a3llamgydWoifQ.nXkTuK4XZ_pcxbi11UK3pQ")
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            setmap(center, json)
        }).catch(function (error) {
            console.log(error)
        })
}



getlocation()
