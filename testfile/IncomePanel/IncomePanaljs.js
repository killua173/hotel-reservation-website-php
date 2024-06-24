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
  


document.addEventListener("DOMContentLoaded", async() => {
    if(!admin)
    {return}

    var rows;

    const result=  await fetch('/api/TotalIncome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
   
      }) .then(res => res.json())
      if (result.status === 'good') {

         rows=result.row;
     }
     else
     {alert("something went wrong ")}
    
  
     let totalProfit = 0;
     const tableBody = document.querySelector('.theTable');
     rows.forEach((row, index, arr) => {
        const totalPrice = row.TotallPrice;
        totalProfit += totalPrice;
    
        const tr = document.createElement('tr');
        const tdUsername = document.createElement('td');
        const tdCarName = document.createElement('td');
        const tdTotalPrice = document.createElement('td');
        const tdDays = document.createElement('td');
        const tdPickUpDate = document.createElement('td');
        const tdDropOffDate = document.createElement('td');
        const tdStatus = document.createElement('td');
    
        tdUsername.textContent = row.user;
        tdCarName.textContent = row.car;
        tdTotalPrice.textContent = row.TotallPrice + "$";
        tdDays.textContent = row.Days;
        tdPickUpDate.textContent = new Date(row.PickUpDate).toLocaleDateString();
        tdDropOffDate.textContent = new Date(row.DropOffDate).toLocaleDateString();
        tdStatus.textContent = row.isDoneRenting ? 'Done Renting' : 'Renting';
    
        tr.appendChild(tdUsername);
        tr.appendChild(tdCarName);
        tr.appendChild(tdDays);
        tr.appendChild(tdPickUpDate);
        tr.appendChild(tdDropOffDate);
        tr.appendChild(tdStatus);
        tr.appendChild(tdTotalPrice);
        tableBody.appendChild(tr);
    
        if (index === arr.length - 1) {
            const trTotal = document.createElement('tr');
            const tdTotal = document.createElement('td');
            tdTotal.colSpan = 7;
            tdTotal.textContent = "Total Profit: " + totalProfit + "$";
            trTotal.appendChild(tdTotal);
            tableBody.appendChild(trTotal);
        }
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    })