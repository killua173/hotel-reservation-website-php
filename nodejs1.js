const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const {MongoClient} = require('mongodb');
const path = require('path');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('./User');
const RentedCars=require('./RentedCars');
const { json } = require('body-parser');
const JWT_SECRET='asdasdjkdbdkfbkfobnjogjbnjj4'
const router = express.Router();
const fs = require("fs");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    fs.stat('./uploads/' + file.originalname, function (err, stat) {
      if (err == null) {
        cb(null, Date.now() + '_' + file.originalname);
      } else if (err.code === 'ENOENT') {
        cb(null, file.originalname);
      } else {
        console.log('Some other error: ', err.code);
      }
    });
  }
});
const upload = multer({ storage: storage });

const Car=require('./Cars');

const nodemailer = require('nodemailer');
const Buffer = require('buffer').Buffer;


mongoose.connect('mongodb+srv://hamzaab10:12345677@mydb.3xknhlq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




const app = express();

app.use(bodyParser.json())










app.post('/api/Register',async(req,res) => {


  
  const { username,email, password:plainTextPassword }=req.body;

  const password=await bcrypt.hash(plainTextPassword,10)

  let role="User"

  try {
const response=await User.create({
  username,
  email,
  password,
  role
})
console.log('new record been created:', response)


  }
  catch(error)
  {if(error.code ===11000)
    {
console.log('Duplicate user')
return res.json({error:'Duplicate Username or Email',status:'error' })
    }
  res.json({status:'error',error:'something went wrong' })

    throw error

  }
return  res.json({status:'good' })
  
  })




async function main() {

  const uri = "mongodb+srv://hamzaab10:12345677@mydb.3xknhlq.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    await client.connect();





 
 
} catch (e) {
    console.error(e);
}
finally {
  await client.close();
}


}


app.use(express.static(path.join(__dirname, './testfile')));

app.use(express.static('./uploads/'));



app.get('/ResetPassword/:id/:token',async (req, res) => {
  const {id , token} = req.params
  console.log(id)
  
  try {

    const user = await User.findById(id).lean();
    if (!user)
    {
     res.send('The site not valid')
      return
    } 
    const secret =JWT_SECRET+user.password

    const payload= jwt.verify(token,secret)

    res.sendFile(path.join(__dirname, './testfile/ChangingPassword/ChangingPasswordhtml.html'));

    
  }
 catch (error)
 {
  res.send('site does not exist '+error.message)
  return

 }


});


app.post('/ResetPassword/:id/:token',async (req, res) => {
  const {id , token} = req.params
  console.log(id)
   const {password} =req.body
  try {

    const user = await User.findById(id).lean();
    if (user)
    {
      const secret =JWT_SECRET+user.password
      const newPassword=await bcrypt.hash(password,10)
      const payload=  jwt.verify(token,secret)
      await User.updateOne({ _id: id }, { $set: { password: newPassword } });
  
    } 

   
  }
 catch (error)
 {

  console.log(error.message)
  console.log(error)
return  res.json({ status:'bad' , error: 'some thing went wrong'})


 }
 return res.json({ status:'good' })

});







app.listen(3000, () => console.log('http://localhost:3000'));


var userEmailForWongPassword="" ;
var triesForLogin=0;

app.post('/api/login',async(req,res) => {


  
  
  const { usernameOrEmail, password }=req.body;


  const user = await User.findOne({ $or: [ { username: usernameOrEmail }, { email: usernameOrEmail } ] }).lean();

  console.log(user)


	if (!user) {
  
		return res.json({ status: 'error', error: 'Invalid usernameOrEmail/password' })
	}


 


  if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
        role:user.role
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token,role:user.role })
	}
if(userEmailForWongPassword===user.email)
{
 
  triesForLogin++;
}
else
{
  userEmailForWongPassword=user.email;
  triesForLogin=1;

}


if (triesForLogin===3)
{
  const secret =JWT_SECRET+user.password

	const token = jwt.sign(
    {
      id: user._id,
      username: user.username
     
    },
    secret,{expiresIn:'12h'} );

    const decoded = jwt.decode(token);
    const link = 'http://localhost:3000/ResetPassword/'+user._id + '/' +token
    sendMail(user.email,link)
    console.log(link)
    


 return res.json({ status: 'error', error: 'Email to Change the Password been send ' })
}
 
	return res.json({ status: 'error', error: 'Invalid usernameOrEmail/password' })
})





// Create a transporter object using Gmail as the email service

// Define the email details

async  function sendMail(email,theLink)
{



  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mywebproject173@gmail.com',
      pass: 'ywjnvchjrhgbkovm'
    }
  });
  



  const mailOptions = {
    from: 'mywebproject173@gmail.com',
    to: email,
    subject: ' Attention: Security Measures for Your Account',
    text: 'Subject: Attention: Secure Your Account\n' +
            '\n' +
            'Dear Valued User,\n' +
            '\n' +
            'We noticed that you have attempted to sign in to your account multiple times with an incorrect password. For security reasons, we have temporarily disabled your account.\n' +
            '\n' +
            'To re-activate your account and protect your personal information, please reset your password by clicking the following link:\n' +
            '\n' +
            theLink+
            '\n' +
            'If you did not initiate this password change, please contact our customer support team immediately.\n' +
            '\n' +
            'Thank you for your prompt attention to this matter.\n' +
            '\n' +
            'Best regards,\n' 
         
  };
  
try
{
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
  
      console.log('Email sent: ' + info.response);
    }
  });



}
catch (error)
{console.log(error)}

}

// Send the email
app.post('/api/AddCars', upload.fields([
  { name: 'Pho1', maxCount: 1 },
  { name: 'Pho2', maxCount: 1 }
]),async(req, res) => {
  const {
    availability,
    name1,
    location,
    validTill,
    willBeValidAt,
    CostPerDay,
  } = req.body;




 const Pho1= req.files.Pho1[0].path.replace('uploads\\', '');
 
 const Pho2= req.files.Pho2[0].path.replace('uploads\\', '');
 

  try {
    const car = await Car.create({
      Pho1,
      Pho2,
      availability,
      name1,
      location,
      validTill,
      willBeValidAt,
      CostPerDay
    });

  return   res.send({ status: 'good' });
  } catch (error) {
   return   res.send({
    status: 'bad',
    error: 'Something went wrong please try again',
  });
  }
 

});



app.post('/api/loadingCars',async(req,res) => {
var cars;
const {pickUp, dropOff,location }=req.body;

try 
{
  if (pickUp && dropOff && location) {

    cars = await Car.find({
    $and: [
      { willBeValidAt: { $lte: pickUp } },
      { validTill: { $gte: dropOff } },
      { location: location }
    ]
  }).lean();
  }
  else
  {
  
    cars = await Car.find().lean();
  }
  return res.send({ status: 'ok' ,value:cars})
}
catch
{
  return res.send({ status: 'error' ,value:cars})
}


})



app.post('/api/RentingCar',async(req,res) => {
 
  const {PickUpDate, DropOffDate,CarId,TotallPrice,Days,isDoneRenting,token}=req.body;
  let result;
  try 
  {
    if(token)
    {
 result=userLoggedIn(token);
if(!result)
{
 return res.json({status:'not logged in ',error:'something went wrong ' })
}
    }
    else{
      return   res.json({status:'not logged in ',error:'log in first ' })
    }

    const userId=result.id



    const response=await RentedCars.create({
      PickUpDate,
      DropOffDate,
       TotallPrice,
       userId,
       CarId,
       isDoneRenting,
       Days
    })
 

    await Car.updateOne({ _id: CarId }, { $set: { willBeValidAt: DropOffDate , availability:false} });

    res.json({status:'good'})
    
      }
      catch(error)
      
        {

   
          res.json({status:'error',error:'something went wrong' })
        }
     
    
        
    
      

      
      })
    

      
app.post('/api/DeleteCar',async(req,res) => {
 
  const {CarId}=req.body;
  
  try 
  {
    const response=await Car.deleteOne({_id: CarId  })

   
    res.json({status:'good'})
    
      }
      catch(error)
      
        {

   
          res.json({status:'error',error:'something went wrong' })
        }
     
    
        
    
      

      
      })


           
app.post('/api/EditCar',async(req,res) => {
 
  const  {
    availability,
    name1,
    location,
    validTill,
    willBeValidAt,
    CostPerDay,
    _id
  } = req.body;

  
  try 
  {
    const response=await Car.updateOne({ _id: _id }, { $set: { availability: availability ,name1:name1
       ,location:location  ,validTill:validTill,willBeValidAt:willBeValidAt ,CostPerDay:CostPerDay } });

   
    res.json({status:'good'})
    
      }
      catch(error)
      
        {

   
          res.json({status:'error',error:'something went wrong' })
        }
     
    
        
    
      

      
      })



      app.post('/api/TotalIncome', async (req, res) => {
        try {
          const RentedCarsINFO = await RentedCars.find().lean();
      
          const promises = RentedCarsINFO.map(async (object) => {
            const user = await User.findById(object.userId).select('username').lean();
            const car = await Car.findById(object.CarId).select('name1').lean();
            if (car && user) {
              Object.assign(object, { user: user.username, car: car.name1 });
            }
          });
      
          await Promise.all(promises);
      
          return res.json({ status: 'good', row: RentedCarsINFO });
        } catch (error) {
          console.log('Error:', error);
          return res.json({ status: 'error', error: 'something went wrong' });
        }
      });


   // Function to check if the user is logged in
function userLoggedIn(token) {
  let result= false;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);

      return payload; // Return the username if the token is valid
    } catch (error) {
      
    }
   
}
return result;
}
// Route handler for '/api/isUserLoggedIn'
app.post('/api/isUserLoggedIn', (req, res) => {
  const { data } = req.body;
  const loggedInUser = userLoggedIn(data);
  if (loggedInUser) {
    res.json({ loggedin: 'true', username: loggedInUser.username, role: loggedInUser.role });
  } else {
    res.json({ loggedin: 'false' });
  }
});
          
    
// Route handler for '/api/isUserLoggedIn'
app.post('/api/checkDiscount', (req, res) => {
  const { data } = req.body;
  const loggedInUser = userLoggedIn(data);
  
  async function getUserRentalsCount(userId) {
    try {
      const count = await RentedCars.countDocuments({ userId });
      return count;
    } catch (error) {
      // Handle any errors that occur during the query
      console.error('Error:', error);
      return 0; // Return 0 in case of error
    }
  }
// Usage example:
const userId = 'your_user_id';
getUserRentalsCount(loggedInUser.id)
  .then(count => {
   return res.json({ userCars: count});
  })
  .catch(error => {
    return res.json({ error: "something went worng in discount part"});
  });
  
});
          
    


          
    
    
    
    

    
    

