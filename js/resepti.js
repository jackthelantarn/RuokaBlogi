"use strict";
let url_random;
const search_btn = document.getElementById("search_button");
const section = document.getElementById("top-section");

url_random = "https://www.themealdb.com/api/json/v1/1/search.php?s=k"


//gets json from API sets results in html page
function setupRecepie(url) {
    let html = "";
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (json_data) {
        console.log(json_data)
        if (json_data.meals) {
            for (const meal of json_data.meals) {

                //if recepie source found
                if (meal.strSource != null) {
                    let source = meal.strSource
                    let secureSource = source.substr(0, 5)

                    //if recepie source website is secure
                    if (secureSource == "https") {
                        html += `<section class=" recepie_content" data-id="${meal.idMeal}">
                         <a href="${meal.strSource}" target="_blank" rel="noopener noreferrer"><img src="${meal.strMealThumb}" class="food_img"></a>
                        <h3 class="food_name">${meal.strMeal}</h3>
                        <button type="submit" onclick="window.open('${meal.strSource}')" class="recepie_btn"
                            id="recepie_btn">Resepti
                        </button>
                    </section>`
                    }
                } else {
                    //if recepie source website is not secure
                    html += `<section class=" recepie_content" data-id="${meal.idMeal}">
                        <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer"><img src="${meal.strMealThumb}" class="food_img"></a>
                            <h3 class="food_name">${meal.strMeal}</h3>
                            <button type="submit" onclick="window.open('${meal.strYoutube}')" class="recepie_btn" id="recepie_btn" >Resepti
                            </button> 
                    </section>`

                }


            }
            section.classList.remove("not_found");
            section.innerHTML = html;

        } else {
            //adds css for error message
            html += `Ruokaa ei löytynyt! Yritä uudelleen`
            section.classList.add("not_found");
            section.innerHTML = html
        }

    }).catch(function (error) {
        console.log(error)
    })

}

//Gets input value and sends query to API
function searchmeal() {
    let search_text = document.getElementById("search").value.trim();
    let url_search = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search_text;
    section.innerHTML += ``
    setupRecepie(url_search);

}

document.getElementById("search").addEventListener("keyup", function (event) {
    if (event.code == "Enter") {
        event.preventDefault();
        searchmeal();
    }
})


search_btn.addEventListener("click", searchmeal);

setupRecepie(url_random)