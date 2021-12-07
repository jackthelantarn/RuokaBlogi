"use strict"

// get current location
function getlocation(){ 
    let lat, long;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude
            long = position.coords.longitude
            setmap ([position.coords.longitude,position.coords.latitude])
       },error =>{
           let error_text =document.getElementById('error_text')
           error_text.innerHTML="Enable location to see result"
       })
    }
   
}

// create a map object
function setmap(center){
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWFuIiwiYSI6ImNrd3dkNjZ6eDAybW8yb3A4a3llamgydWoifQ.nXkTuK4XZ_pcxbi11UK3pQ';
    const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: center, 
    zoom: 14 
    });
}

getlocation()
