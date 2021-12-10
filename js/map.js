"use strict"

// get current location
function getlocation() {
    let lat, long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //setmap([position.coords.longitude, position.coords.latitude]);
            getdata([position.coords.longitude, position.coords.latitude]);
        }, error => {
            let error_text = document.getElementById('error_text')
            error_text.innerHTML = "Enable location to see result"
        })
    }

}

//
function setmap(center, json_data) {
    console.log(json_data);
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWFuIiwiYSI6ImNrd3dkNjZ6eDAybW8yb3A4a3llamgydWoifQ.nXkTuK4XZ_pcxbi11UK3pQ';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
    });
    new mapboxgl.Marker({
        color: "blue",
        draggable: true
    }).setLngLat(center).setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${"Olet Tässä"}</h3>`
        ))
        .addTo(map);

    for (const feature of json_data.features) {
        const elem = document.createElement('div');
        elem.className = 'marker'
        new mapboxgl.Marker(elem).setLngLat(feature.geometry.coordinates).setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${feature.text}</h3><p>${feature.properties.address}</p>`
                )
        ).addTo(map);
    }

}

//
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
