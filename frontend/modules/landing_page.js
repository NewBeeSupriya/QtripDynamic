import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  // console.log("http://13.127.156.112:8082/cities");
  let cities = await fetchCities();
  console.log(cities);
  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

 
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
   try {
    const cityData = await fetch(config.backendEndpoint+"/cities");
   const resArray = await cityData.json();
   return resArray;
  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   let elem = document.createElement("div");
   elem.className = "col-sm-12 col-md-6 col-lg-3 my-4";
   elem.innerHTML=
    `
    <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
      <img class="img-responsive" src="${image}"/>
    </div>
  </a>
    `;

   document.getElementById("data").appendChild(elem);
     

}

export { init, fetchCities, addCityToDOM };
