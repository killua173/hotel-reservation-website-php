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
  



 
 for (var i = 1; i < 3; i++) {
    const input = document.querySelector("#Pho"+i);

    input.addEventListener("change", function(event) {
        const file = event.target.files[0];
        const mimeType = file.type;

        if (!mimeType.startsWith("image/")) {
            setInputError(input,'File is not an image')
            console.error("File is not an image");
            return;
        }
        clearInputError(input)
    });
}
    
    
















document.getElementById('add-car').addEventListener('submit', (e) => {
    e.preventDefault();


 
    for (var i = 1; i < 3; i++) {
        const input = document.querySelector("#Pho"+i);
    
       
            const file = input.files[0];
            const mimeType = file.type;
    
            if (!mimeType.startsWith("image/")) {
                setInputError(input,'File is not an image')
                console.error("File is not an image");
                
                return;
            }
        }
    



        let Pho1 = document.getElementById("Pho1").value;
        let Pho2 = document.getElementById("Pho2").value;
        let name1 = document.getElementById("name1").value;
        var location = document.getElementById("location").value;
        var validTill = document.getElementById("validTill").value;
        var willBeValidAt = document.getElementById("willBeValidAt").value;
        var CostPerDay = document.getElementById("CostPerDay").value;
        var availability = true;
        
        data = { Pho1: Pho1, Pho2: Pho2,availability:availability, name1: name1, location: location, validTill: validTill, willBeValidAt: willBeValidAt, CostPerDay: CostPerDay};
        
  
        addcar(data)



});


async function addcar(data) {
    let formData = new FormData();
    for (var i = 1; i < 3; i++) {
    const input = document.querySelector("#Pho" + i);
    const file = input.files[0];
    formData.append("Pho" + i, file);
    }
    formData.append("name1", data.name1);
    formData.append("location", data.location);
    formData.append("validTill", data.validTill);
    formData.append("willBeValidAt", data.willBeValidAt);
    formData.append("availability", data.availability);
    formData.append("CostPerDay", data.CostPerDay);
    const result = await fetch('/api/AddCars', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
    
    if (result.status === 'good') {
        alert('Success');
    } else {
        setFormMessage(document.querySelector("#add-car"), "error", result.error);
    }
    }
    
    
    
    
    