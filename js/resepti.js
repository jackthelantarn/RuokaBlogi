"use strict";
let url_random;
const search_btn = document.getElementById("search_button");
const section = document.getElementById("top-section");

url_random = "https://www.themealdb.com/api/json/v1/1/search.php?s=k"



function setupjson(url) {
    let html = "";
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (json_data) {
        console.log(json_data)
        if (json_data.meals) {
            for (const meal of json_data.meals) {
                html += `<section class=" recepie_content" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}"
                                class="food_img">
                            <h3 class="food_name">${meal.strMeal}</h3>
                            <button type="submit" onclick="window.location.href='resepti_ohjeet.html'" class="recepie_btn" id="recepie_btn" > 
                                Lue resepti
                            </button> 
                    </section>`

            }
            section.classList.remove("not_found");
            section.innerHTML = html;

        } else {
            html += `Ruokaa ei löytynyt! Yritä uudelleen`
            section.classList.add("not_found");
            section.innerHTML = html
        }

    }).catch(function (error) {
        console.log(error)
    })

}

function searchmeal() {
    let search_text = document.getElementById("search").value.trim();
    let url_search = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search_text;
    section.innerHTML += ``
    setupjson(url_search);

}

function getrecepie(e) {
    e.preventDefault();
    if (e.target.classList.contains("recepie_btn")) {
        let food_id = e.target.parentElement;
        let id = food_id.dataset.id
        sessionStorage.setItem('key', id);
    }
}

search_btn.addEventListener("click", searchmeal);
section.addEventListener("click", getrecepie);
setupjson(url_random)