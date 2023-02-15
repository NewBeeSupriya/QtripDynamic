import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
console.log(search);
let urlParam = new URLSearchParams(search);
let id = urlParam.get("adventure")
return id;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
   const adventureData = await fetch(config.backendEndpoint+ `/adventures/detail?adventure=${adventureId}`);
   const resArray = await adventureData.json();
  //  console.log(resArray);
   return resArray;
  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure); 
  document.getElementById("adventure-name").innerHTML= adventure.name;
  document.getElementById("adventure-subtitle").innerHTML= adventure.subtitle;
  for(let i=0; i<adventure.images.length; i++){
   let ele= document.createElement("div");
   ele.className = "col-lg-12";
   ele.innerHTML= `<img class="activity-card-image pb-3" src="${adventure.images[i]}"/>` ;
   document.getElementById("photo-gallery").appendChild(ele);
  }

  document.getElementById("adventure-content").innerHTML= adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images[0]);
  document.getElementById("photo-gallery").innerHTML= `
   <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

images.map((images, id)=>{
  let ele= document.createElement("div");
  ele.className= `carousel-item ${id===0?"active":""}`;
  ele.innerHTML= `<img class="activity-card-image pb-3" src="${images}"/>`;
  document.getElementById("carousel-inner").appendChild(ele);
})
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display= "none";
    document.getElementById("reservation-panel-available").style.display= "block";
    document.getElementById("reservation-person-cost").innerHTML= adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display= "block";
    document.getElementById("reservation-panel-available").style.display= "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure);
  // console.log(persons);
  document.getElementById("reservation-cost").innerHTML= adventure.costPerHead * persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure)
  const reservationForm = document.getElementById("myForm");
  
  reservationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let eventElement = reservationForm.elements;
    
    let resData = JSON.stringify({
      name: eventElement["name"].value,
      date: eventElement["date"].value,
      person: eventElement["person"].value,
      adventure: adventure.id,
    });
    
    try {
      let postData = await fetch(url, {
        method: "POST",
        body: resData,
        headers: {
          'Content-Type':'application/json',
        },
      });

      // debugger;

      if(postData.ok){
        alert("Sucess!!");
        window.location.reload();
      }
      else{
        let data = await postData.json();
        alert(`Failed: ${data.message}`);
      }
      
    } catch (error) {
      console.log(error);
      alert("Failed due to some error!!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display= "block";
  }
  else{
    document.getElementById("reserved-banner").style.display= "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
