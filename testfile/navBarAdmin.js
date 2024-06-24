function createNavbar(loggedin,username) {

    // Create the navbar element
    var navbar = document.createElement('div');
    navbar.classList.add('navbar');


    if (loggedin)
    {
        var user = document.createElement('a');
        user.href = "#";
        user.textContent = 'Hello '+username;
   
        navbar.appendChild(user);

        var logout = document.createElement('a');
        logout.href = "..//LoginPage/LoginPageHtml.html";
        logout.textContent = "Log out";
        navbar.appendChild(logout);

            // Create the home link with active class
    var adminpage = document.createElement('a');
    adminpage.href = "..//AdminPage/index.html";
    adminpage.textContent = 'Home';
    navbar.appendChild(adminpage);

    var IncomePanel = document.createElement('a');
    IncomePanel.href = "..//IncomePanel/IncomePanalHtml.html";
    IncomePanel.textContent = 'Income Panal';
    navbar.appendChild(IncomePanel);

    var AddingCarsPage = document.createElement('a');
    AddingCarsPage.href = "..//AddingCarsPage/AddingCarshtml.html";
    AddingCarsPage.textContent = 'Adding cars';
    navbar.appendChild(AddingCarsPage);

    
    
      
     
       
        
        // Event listener for the "Log out" link
        logout.addEventListener('click', function() {
          // Clear the local storage
          localStorage.clear();
          location.reload();
        });



        // Set the active link based on the current page
var currentUrl = window.location.href;
var links = navbar.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
  var linkUrl = links[i].href;
  var currentPage = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  var linkPage = linkUrl.substring(linkUrl.lastIndexOf('/') + 1);
  if (currentPage === linkPage) {
    links[i].classList.add('active');
  }
}

    // Append the navbar to the navbar element in the HTML
    var navbarContainer = document.getElementById('navbar');
    navbarContainer.appendChild(navbar);
      }
else{

    // Create the login link
    var loginLink = document.createElement('a');
    loginLink.href = "..//LoginPage/LoginPageHtml.html";
    loginLink.textContent = 'Log in';
    navbar.appendChild(loginLink);

    // Create the register link
    var registerLink = document.createElement('a');
    registerLink.href ="..//registrationPage/registrationPageHtml.html";
    registerLink.textContent = 'Register';
    navbar.appendChild(registerLink);
  
  }

  
    

}



async function checkUserLoggedIn() {
 
  let username;
  let loggedIn;
  const data=localStorage.getItem('token');


  try {
    const response = await fetch('/api/isUserLoggedIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data})
    });

    const result = await response.json();

    if (result.loggedin === 'true') {
      loggedIn = true;
      username = result.username;
   
  
    }
    else  
    {
   
    }
  } catch (error) {
    console.log('Error:', error);
  }

  // Call the createNavbar function with the loggedIn and username values
  createNavbar(loggedIn, username);
}

// Call the checkUserLoggedIn function
checkUserLoggedIn();

