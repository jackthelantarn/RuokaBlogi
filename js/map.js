"use strict"

// get current location
function getlocation() {
    let lat, long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            long = position.coords.longitude
            setmap([position.coords.longitude, position.coords.latitude]);
            getdata([position.coords.longitude, position.coords.latitude]);
        }, error => {
            let error_text = document.getElementById('error_text')
            error_text.innerHTML = "Enable location to see result"
        })
    }

}

// create new map and location marker
function setmap(center) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWFuIiwiYSI6ImNrd3dkNjZ6eDAybW8yb3A4a3llamgydWoifQ.nXkTuK4XZ_pcxbi11UK3pQ';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
    });
    //create current location marker
    const marker = new mapboxgl.Marker({
        color: "red",
        draggable: true
    }).setLngLat(center)
        .addTo(map);
}


function getdata(center) {
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?type=poi&limit=20&proximity=" + center[0] + "," + center[1] + "&access_token=pk.eyJ1IjoibmFpbWFuIiwiYSI6ImNrd3dkNjZ6eDAybW8yb3A4a3llamgydWoifQ.nXkTuK4XZ_pcxbi11UK3pQ")
    .then(function (response){
        return response.json
    }).then(function (json) {
        console.log(json)
        //restaurantMarker(json)
    }).catch (function(error) {
        console.log(error)
    })
    

}

function restaurantMarker(json_data){
    console.log(json_data)
}

getlocation()
