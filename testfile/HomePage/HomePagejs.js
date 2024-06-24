function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";

    

    
}




 












var cars;
async function loadCars(data)
{
   const result=  await fetch('/api/loadingCars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }) .then(res => res.json())

  
      if (result.status === 'ok')
       {
      cars=  result.value
    
     
      
        
        
    } else {
      alert("something went wrong")
    }



}







async function showSlides(slidesName, slideIndex) {
  var i;
  var slides = document.getElementsByClassName(slidesName);
  
  if (slides.length === 0) {
    return; // No slides found, exit the function
  }
  
  if (slideIndex < 0 || slideIndex >= slides.length) {
    slideIndex = 0; // Reset slide index if out of bounds
  }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[slideIndex].style.display = "block";
  
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0; // Reset slide index if reached the end
  }
  
  setTimeout(function() {
    showSlides(slidesName, slideIndex);
  }, 3000); // Change image every 3 seconds
}



let discound;

document.addEventListener("DOMContentLoaded", async() => {
  
  async function checkDiscount() {
    const token = localStorage.getItem('token');
    try {
      const result = await fetch('/api/checkDiscount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: token })
      }).then(res => res.json());

   const rentedCarsByTheUser=Number(result.userCars)
  if (rentedCarsByTheUser>2)
  return 20
   
    } catch (error) {
      console.log('Error:', error);
    }
    return 0;
  }
 discound= Number(await checkDiscount())


  
  
    let TotallPrice;
  var pickUp;
  var dropOff;
  var location;
  
 var count=1;
 const options = { 
  year: 'numeric', 
  month: 'numeric', 
  day: 'numeric' 
};

const container = document.querySelector("#container");
function carsloader(cars)
{
cars.forEach((car) => {
  const slidesName="slides"+count;
 
  const slideshowDiv = document.createElement("div");
  slideshowDiv.setAttribute("id", "slideshow");
  slideshowDiv.setAttribute("class", "slideshow");


  for (let i = 1; i < 3; i++)
  {
    const photo = car[`Pho${i}`];
    const slidesDiv = document.createElement("div");
   
   
    slidesDiv.setAttribute("class",slidesName) ;
    slidesDiv.setAttribute("id", "slides");
  
    const img = document.createElement("img");
    img.setAttribute("class", "imgSS");
    img.setAttribute("src", `..\\${photo}`);
    img.setAttribute("alt", `Image ${photo}`);
  
    slidesDiv.appendChild(img);
    slideshowDiv.appendChild(slidesDiv);
  }
  count++;
  car.Pho1.split(',').forEach((photo) => {

  });


  var willBeValidAt = new Date(Date.parse(car.willBeValidAt));
  var validTill = new Date(Date.parse(car.validTill));




  const captionDiv = document.createElement("div");
  captionDiv.setAttribute("class", "caption");
  captionDiv.innerHTML = `
    <p>  
    
      <h4 class="headeridk">${car.name1}</h4> 
      <h4 class="headeridk">Cost: $${car.CostPerDay}/day</h4>
      <h4 class="headeridk">Availability : ${car.availability}</h4>
      <h4 class="headeridk">Location: ${car.location}</h4>
    
      <h4 class="headeridk">

      available from: ${willBeValidAt.toLocaleDateString('en-US', options)} <br>
      To:  ${validTill.toLocaleDateString('en-US', options)} <br>
    <h4>
    </p>
  `;

  const form = document.createElement("form");
  form.setAttribute("id", "RentThecarform");
  form.setAttribute("class", "RentThecarform");





  form.addEventListener("submit", async function(event) {
  event.preventDefault();

  if (isSelected)
  {
    const token=localStorage.getItem('token');
const form3=document.getElementById("RentThecarform");
const pickupDate1 = new Date(pickUp);
const dropoffDate1 = new Date(dropOff)



const diffInMs = dropoffDate1.getTime() - pickupDate1.getTime();
  
const diffInDays = Math.round(diffInMs / 86400000);


const hiddenInput = form3.querySelector('input[type="hidden"][name="id"]');
const carId = hiddenInput.value;
    const data1= {PickUpDate:pickUp, DropOffDate:dropOff,TotallPrice:TotallPrice,isDoneRenting:false,Days:diffInDays,CarId:carId,token:token};


    






    const result=  await fetch('/api/RentingCar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data1)
    }) .then(res => res.json())
    if (result.status === 'good') {
      alert('Congrats you rented a car ');
      window.location.href = "..//HomePage/HomePagehtml.html";
  } else if (result.status==='error') {
    alert('something went wrong 1');
    
  }else 
  {
    alert(result.error);
    window.location.href = "..//LoginPage/LoginPageHtml.html";
  }


  }
  else
  {
    alert('Please select location, pick-up date and drop-off date ')
  }




})
const form3=document.getElementById("RentThecarform");
const pickupDate1 = new Date(pickUp);
const dropoffDate1 = new Date(dropOff)



const diffInMs = dropoffDate1.getTime() - pickupDate1.getTime();
  
const diffInDays = Math.round(diffInMs / 86400000);

   


    const carCost = car.CostPerDay;

    


const priceforAllDays=diffInDays*carCost;

TotallPrice=((100-discound)/100)*priceforAllDays

  form.innerHTML = `
    <input type="hidden" name="id" value="${car._id}">
    <input type="hidden" name="CarCost" value="${car.CostPerDay}">
    <p class="headeridk2">
  ${TotallPrice ? (discound === 0 ? `$${Math.floor(priceforAllDays)}` : '') : ''}
  ${TotallPrice && discound !== 0 ? `<del>$${Math.floor(priceforAllDays)}</del>` : ''}
  ${TotallPrice && discound !== 0 ? `<br>$${Math.floor(TotallPrice)} (${discound}% off)` : ''}
</p>


    <button class=" button primary edit" type="submit" id="rent">Rent</button>
  `;

  slideshowDiv.appendChild(captionDiv);
  slideshowDiv.appendChild(form);
  container.appendChild(slideshowDiv);
const slideIndex=0;
  showSlides(slidesName, slideIndex);
});

    
}

var data= {pickUp:null, dropOff:null,location:null};





 await loadCars(data);

 carsloader(cars)





var isSelected= false;
const form1 = document.querySelector("#selectForm");



form1.addEventListener("submit", async function(event) {
  event.preventDefault();

// prevent the form from submitting and reloading the pages

 pickUp = document.querySelector("#pickUp").value;
  dropOff = document.querySelector("#dropOff").value;
location = document.querySelector("#Location").value;

  if (dropOff> pickUp) {


  const data1= {pickUp:pickUp, dropOff:dropOff,location:location};

  await loadCars(data1);
 
  document.getElementById("container").innerHTML = "";

   carsloader(cars)
 

document.getElementById("container").innerHTML = "";

carsloader(cars)
 
  isSelected=true;
  }
  
  
  else{
   alert('Drop-off date should be after Pick-up date ')
   
  }

  
  
});





})
