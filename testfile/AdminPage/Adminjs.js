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
async function checkUserLoggedIn() {
  const token = localStorage.getItem('token');
  try {
    const result = await fetch('/api/isUserLoggedIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: token })
    }).then(res => res.json());

    if (result.role === 'User' ) {
      document.body.innerHTML = 'You must log in to access this site.';
      window.location.href = "..//HomePage/HomePagehtml.html";
      return true;
    }
  } catch (error) {
    console.log('Error:', error);
  }
  return false;
}

const admin =checkUserLoggedIn();



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
  
   return cars
    
      
      
  } else {
    
  }



}







async function showSlides(slidesName, slideIndex) {
var i;
var slides = document.getElementsByClassName(slidesName);
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
slideIndex++;
if (slideIndex > slides.length) {slideIndex = 1}
slides[slideIndex-1].style.display = "block";
setTimeout(function() {showSlides(slidesName, slideIndex)}, 3000); // Change image every 3 seconds
}






document.addEventListener("DOMContentLoaded", async() => {
if (!admin)
{
  return
}
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


const form3 = document.createElement("form");
form3.setAttribute("Class", "adminform");



form3.innerHTML = `
  
  <input type="hidden" name="id" value="${car._id}">
    <h4 class="headeridk"> Car name : <input required type="text" id="car-name" class="Values" size="18"  name="car-price" value="${car.name1}"> </h4> 
    <h4 class="headeridk">Cost: $   <input required type="number" id="car-price" class="ValuesNum" size="3"   name="car-price" value="${car.CostPerDay}">  /day</h4>
    <h4 class="headeridk">  Available
    <input  type="checkbox" name="availability"  id="car-availability" value="false" ${car.availability ? 'checked' : ''}>
  </h4>
    <h4 class="headeridk">Location:<input required type="text" id="car-location" class="Values" size="10"  name="car-price" value="${car.location}"></h4>

    <h4 class="headeridk">

    Available From:
    <input required type="date" name="available-from" id="available-from" value="${willBeValidAt.toISOString().substr(0, 10)}">
  <br>

  Available To:
  <input required type="date" name="available-to" id="available-to" value="${validTill.toISOString().substr(0, 10)}"

  </h4>
 
  
`;




const buttondiv = document.createElement("div");
buttondiv.setAttribute("class", "buttondiv");

buttondiv.innerHTML=`  <button type="submit" class="button primary delete">Delete</button>
<button type="submit" class="button primary edit">Edit</button>`

form3.appendChild(buttondiv)


const deleteButton = document.querySelector(".delete");
const editButton = document.querySelector(".edit");








form3.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const hiddenInput = form3.querySelector('input[type="hidden"][name="id"]');
    const carId = hiddenInput.value;

   

    if (event.submitter.classList.contains("delete")) {
   


      
      const data1= {CarId:carId};



    const result=  await fetch('/api/DeleteCar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data1)
    }) .then(res => res.json())
    if (result.status === 'good') {
      alert('you deleted a car  ');
      var data= {pickUp:null, dropOff:null,location:null};

      document.getElementById("container").innerHTML = "";
     const cars= await loadCars(data);
      
      carsloader(cars)
      



  } else {
    alert('something went wrong');
  }




    } 
    else  if(event.submitter.classList.contains("edit"))
    {
    
    
      name1 = form3.querySelector("#car-name").value;
      CostPerDay = form3.querySelector("#car-price").value;
      availability = form3.querySelector("#car-availability").value;
      location = form3.querySelector("#car-location").value;
      willBeValidAt = form3.querySelector("#available-from").value;
      validTill = form3.querySelector("#available-to").value;


      const data1= {_id:carId, availability: availability ,name1:name1
        ,location:location  ,validTill:validTill,willBeValidAt:willBeValidAt ,CostPerDay:CostPerDay };


      const result=  await fetch('/api/EditCar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data1)
      }) .then(res => res.json())
      if (result.status === 'good') {
        alert('edited a car  ');


       
             document.getElementById("container").innerHTML = "";

        var data= {pickUp:null, dropOff:null,location:null};
  
  
      const cars=  await loadCars(data);
        
        carsloader(cars)


 
        
  
  
  
    } else {
      alert('something went wrong');
    }



  }
 
    




})














captionDiv.appendChild(form3);







slideshowDiv.appendChild(captionDiv);

container.appendChild(slideshowDiv);
const slideIndex=0;
showSlides(slidesName, slideIndex);
});

  
}



var data= {pickUp:null, dropOff:null,location:null};





const cars= await loadCars(data);

carsloader(cars)






const form1 = document.querySelector("#selectForm");



form1.addEventListener("submit", async function(event) {
event.preventDefault();

// prevent the form from submitting and reloading the pages

pickUp = document.querySelector("#pickUp").value;
dropOff = document.querySelector("#dropOff").value;
location = document.querySelector("#Location").value;

if (dropOff> pickUp) {


const data1= {pickUp:pickUp, dropOff:dropOff,location:location};

const cars= await loadCars(data1);

document.getElementById("container").innerHTML = "";

carsloader(cars)


}


else{
 alert('Drop-off date should be after Pick-up date ')
 
}



});





})
