"use strict";
let url_search, url_random;
const search_text = document.getElementById("search");
const search_btn = document.getElementById("search_button");
const section = document.getElementById("");
const recepie_content = document.getElementById("recepie_content");

url_search = "www.themealdb.com/api/json/v1/1/search.php?s="
url_random = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken"


function getjson(url) {
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (json_data) {
        console.log(json_data)
    }).catch(function (error) {
        console.log(error)
    })
}