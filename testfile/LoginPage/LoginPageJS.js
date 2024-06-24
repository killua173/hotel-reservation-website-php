

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





   
    document.querySelector("Button").addEventListener("click", (e) => {
        e.preventDefault();
        
    
    
        const usernameOrEmail = document.getElementById('Email/Username').value
        const password = document.getElementById('Password').value
    
    if  (usernameOrEmail.length===0)
    {
    setInputError(document.getElementById('Email/Username'),'that field can not be emty')
    return
    }
    if(password.length===0)
    {
        setInputError(document.getElementById('Password'),'that field can not be emty')
    
        return
    }
    
    const data={usernameOrEmail:usernameOrEmail ,password:password }
    Login(data)
    
        })
    
    
    
        async function Login(data)
        {
           const result=  await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              })
              .then(res => res.json())
          
              if (result.status === 'ok') {
                // everythign went fine
                console.log('Got the token: ', result.data)
                localStorage.setItem('token', result.data)
           
                if(result.role=="User")
                { 
                    window.location.href = "..//HomePage/HomePagehtml.html";
                }
                else
                {
                   
                    window.location.href = "..//AdminPage/index.html";  
                }

             
               
            } else {
                setFormMessage(document.querySelector("#login"), "error", result.error)
              
            }
        }
        

       
   

    


