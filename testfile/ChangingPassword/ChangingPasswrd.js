

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
    


    const password1 = document.getElementById('Password1').value
    const password2 = document.getElementById('Password2').value


if(password1.length<5)
{
    setInputError(document.getElementById('Password1'),'Password should at least be 5 characters long')

    return
}
if(password1!==password2)
{
    setInputError(document.getElementById('Password2'),'The two password are not the same ')

    return
}

const data ={ password:password1}

resetPassword(data)

    })



    async function resetPassword(data)
    {
        const params = window.location.pathname.split('/');
        const id = params[2];
        const token = params[3];
      
       const result=  await fetch('/ResetPassword/'+id+'/'+token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
      
          if (result.status === 'good') {
          
  
            alert('Success')
        } else {
            setFormMessage(document.querySelector("#login"), "error", result.error)
            
        }





    }