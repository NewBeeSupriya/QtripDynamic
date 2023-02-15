
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  let urlParam = new URLSearchParams(search);
  let id = urlParam.get("city")
  // console.log(search);
  return id;
}
 


//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    
    const cityData = await fetch(config.backendEndpoint+ `/adventures?city=${city}`);
   const resArray = await cityData.json();
  //  console.log(resArray);
   return resArray;
  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) { 
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i=0; i<adventures.length; i++){
  let elem = document.createElement("div");
   elem.className = "col-6 col-lg-3 mb-4";
   elem.innerHTML = 
   `<a href="detail/?adventure=${adventures[i].id}" id="${adventures[i].id}">
   <div class="activity-card">
    <img class="img-responsive activity-card img" src="${adventures[i].image}">
    <div class="text-md-centre w-100 mt-3">
    <h5 class="category-banner">${adventures[i].category}</h5>
      <div class="d-block d-md-flex justify-content-between flex-wrap mx-3">
      <div><h5 class="text-left">${adventures[i].name}</h5>
      <p>₹${adventures[i].costPerHead}</p></div>
      <div><h5 class="text-left">Duration</h5>
      <p>${adventures[i].duration}</p></div>
    </div>
   </div>
  </div>
  </a>
   `

   document.getElementById("data").appendChild(elem);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredList = list.filter(
    (key) => key.duration > low && key.duration <= high
  );
  
 return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
    // console.log(list)
    // console.log(categoryList);
    let filteredList = [];
     for(let i=0; i<list.length; i++){
      if(categoryList.includes(list[i].category)){
         filteredList.push(list[i]);
      }
     }
     return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration.length>0){
    let temp = filters.duration.split("-");
    let low= temp[0], high= temp[1];
    // console.log(low);
    // console.log(high);
    // console.log(high+low);

   list= filterByDuration(list, parseInt(low), parseInt(high));
   console.log(list);
  }
  
  if(filters.category.length>0){
     list= filterByCategory(list, filters.category);
    //  console.log(list);
    }
   
 if(filters.category.length>0 && filters.duration.length>0){
      let tempList = filterByCategory(list, filters.category);
      let temp = filters.duration.split("-");
      let low= temp[0], high= temp[1];
      list = filterByDuration(tempList, low, high);
    }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // console.log(filters);
  // console.log(filters.category);
  // console.log(filters.duration);
  localStorage.setItem("filters" ,JSON.stringify(filters));
  // localStorage.setItem("duration" ,JSON.stringify(filters.duration));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 return JSON.parse(localStorage.getItem("filters"));
//  let savedDuration = JSON.parse(localStorage.getItem("duration"));
//  let data = {savedCategory, savedDuration};
//  if(savedCategory) filters.category= savedCategory;
//  if(savedDuration) filters.duration= savedDuration;
  // console.log(savedCategory);
  // console.log(savedDuration);  // Place holder for functionality to work in the Stubs
  // return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
// console.log(filters.length);
for(let i=0; i<filters.category.length; i++){
  let elem = document.createElement("div");
   elem.className = "category-filter";
   elem.innerHTML = 
   `<div id="category-list">
   <p>${filters.category[i]}</p>
   </div>
   `
   document.getElementById("category-list").appendChild(elem);
  }


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
