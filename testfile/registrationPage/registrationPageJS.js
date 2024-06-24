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



function checkIfInputValid()
{



}

document.addEventListener("DOMContentLoaded", () => {
 
 

var firstPassowrd;
 

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {

            setFormMessage(document.querySelector("#createAccount"), "", "");
            
if (e.target.id === "Password1")
{firstPassowrd=e.target.value}




            if (e.target.id === "signupUsername" && e.target.value.length < 4) {
                setInputError(inputElement, "Username must be at least 4 characters in length");
            }
            else if (e.target.id === "Email" && (e.target.value.indexOf("@") === -1 || !e.target.value.includes(".")))
            {setInputError(inputElement, "Please enter A valid Email");}
            else if (e.target.id === "Password1" &&  e.target.value.length < 5)
            {setInputError(inputElement, "Password length should be at least 5 characters");}
            else if (e.target.id === "Password2" && firstPassowrd!=e.target.value)
            {setInputError(inputElement, "The two passowrd you Entered are'nt the same ");}
      
     
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
           
        });

       
    });

    
});





document.querySelector("Button").addEventListener("click", (e) => {
    e.preventDefault();

    
    let firstPassowrd ;
    let Email ;
    let UserName ;
    var IsItValid=true;
    var data;
    document.querySelectorAll(".form__input").forEach(inputElement => {
     
      
        if (inputElement.id === "Password1") {
            firstPassowrd = inputElement.value;
        }
        if (inputElement.id === "Email") {
            Email = inputElement.value;
        }
        if (inputElement.id === "signupUsername") {
            UserName = inputElement.value;
        }
        

        if (inputElement.id === "signupUsername" && inputElement.value.length < 4) {
            setInputError(inputElement, "Username must be at least 4 characters in length"); 
            IsItValid=false;
        }
        else if (inputElement.id === "Email" && inputElement.value.indexOf("@") === -1 && !inputElement.value.includes(".") ) {
            setInputError(inputElement, "Please enter A valid Email");
            IsItValid=false;
        }
        else if (inputElement.id === "Password1" && inputElement.value.length < 5) {
            setInputError(inputElement, "Password length should be at least 5 characters");
            IsItValid=false;
        }
        else if (inputElement.id === "Password2" && firstPassowrd !== inputElement.value) {
            setInputError(inputElement, "The two passwords you entered are not the same");
            IsItValid=false;
        }
        else {
            clearInputError(inputElement);
        }
        
        data = { username:UserName , email: Email, password: firstPassowrd  };

    });


    if(IsItValid)

    {

       


        Register(data)

    }
  




});


async function Register(data)
    {
       const result=  await fetch('/api/Register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
      
          if (result.status==='good')
          {
            window.location.href = "..//LoginPage/LoginPageHtml.html";
            alert('Success')
          }
          else{
            
            setFormMessage(document.querySelector("#createAccount"), "error", result.error);
         
          }





    }

