"use strict"

let getid = sessionStorage.getItem("key")

fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + getid)
    .then(function (response) {
        return response.json()
    }).then(function (json) {
        console.log(json)
    }).catch(function (error) {
        console.log(error)
    })