<!DOCTYPE html>
<?php require_once 'rental-form-handler.php'?>
<html lang="en">
  <head>
    <title>Solace - Free Bootstrap 4 Template by Colorlib</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

    <link rel="stylesheet" href="css/open-iconic-bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">
    
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">

    <link rel="stylesheet" href="css/aos.css">

    <link rel="stylesheet" href="css/ionicons.min.css">

    <link rel="stylesheet" href="css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="css/jquery.timepicker.css">

    
    <link rel="stylesheet" href="css/flaticon.css">
    <link rel="stylesheet" href="css/icomoon.css">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>

    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div class="container">
	      <a class="navbar-brand" href="index.php">Solace</a>
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="oi oi-menu"></span> Menu
	      </button>

	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav ml-auto">
	          <li class="nav-item"><a href="index.php" class="nav-link">Home</a></li>
	          <li class="nav-item active"><a href="rooms.php" class="nav-link">Rooms</a></li>
	          <li class="nav-item"><a href="restaurant.php" class="nav-link">Restaurant</a></li>
	          <li class="nav-item"><a href="about.php" class="nav-link">About</a></li>
	          <li class="nav-item"><a href="blog.php" class="nav-link">Blog</a></li>
	          <li class="nav-item"><a href="contact.php" class="nav-link">Contact</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>



    <!-- END nav -->

    <div class="hero-wrap" style="background-image: url('images/bg_1.jpg');">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text d-flex align-itemd-end justify-content-center">
          <div class="col-md-9 ftco-animate text-center d-flex align-items-end justify-content-center">
          	<div class="text">
	            <p class="breadcrumbs mb-2"><span class="mr-2"><a href="index.php">Home</a></span> <span>Rooms</span></p>
	            <h1 class="mb-4 bread">Rooms</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

<section class="ftco-section bg-light">
<?php
require 'connect.php';

$query = $conn->query("SELECT * FROM room") or die(mysqli_error($conn));

echo '<div class="container">';
echo '<div class="row">';
echo '<div class="col-lg-9">';
echo '<div class="row">';

while ($row = $query->fetch_assoc()) {
    $roomType = $row['room_type'];
    $pricePerDay = $row['pricePerDay'];
    $photo = $row['photo'];
    $roomsNumber = $row['RoomsNumber'];

    // Generate unique max person and beds for each room type
    $maxPersons = 0;
    $beds = 0;

    if ($roomType === 'Suite Room') {
        $maxPersons = 3;
        $beds = 1;
    } elseif ($roomType === 'Family Room') {
        $maxPersons = 3;
        $beds = 1;
    } elseif ($roomType === 'Deluxe Room') {
        $maxPersons = 5;
        $beds = 2;
    } elseif ($roomType === 'Classic Room') {
        $maxPersons = 5;
        $beds = 2;
    } elseif ($roomType === 'Superior Room') {
        $maxPersons = 6;
        $beds = 3;
    } elseif ($roomType === 'Luxury Room') {
        $maxPersons = 5;
        $beds = 2;
    }

    // Generate the HTML for each room
    echo '<div class="col-sm col-md-6 col-lg-4 ftco-animate">';
    echo '<div class="room">';
    echo '<a href="rooms-single.php" class="img d-flex justify-content-center align-items-center" style="background-image: url(photo/' . $photo . ');">';
    echo '<div class="icon d-flex justify-content-center align-items-center">';
    echo '<span class="icon-search2"></span>';
    echo '</div>';
    echo '</a>';
    echo '<div class="text p-3 text-center">';
    echo '<h3 class="mb-3"><a href="rooms-single.php">' . $roomType . '</a></h3>';
    echo '<p><span class="price mr-2">$' . $pricePerDay . '</span> <span class="per">per night</span></p>';
    echo '<ul class="list">';
    echo '<li><span>Max:</span> ' . $maxPersons . ' Persons</li>';
    echo '<li><span>Size:</span> 45 m2</li>';
    echo '<li><span>View:</span> Sea View</li>';
    echo '<li><span>Bed:</span> ' . $beds . '</li>';
    echo '</ul>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
}

echo '</div>';
echo '</div>';
echo '<div class="col-lg-3 sidebar" id="Search">';
echo '<div class="sidebar-wrap bg-light ftco-animate">';
echo '<h3 class="heading mb-4">Check Availability</h3>';
echo '<form action="#" id="availabilityForm" method="post">';
echo '<div class="fields">';
echo '<div class="form-group">';
echo '<input type="text" id="checkin_date" class="form-control checkin_date" name="checkin_date" placeholder="Check In Date" required>';
echo '</div>';
echo '<div class="form-group">';
echo '<input type="text" id="checkout_date" class="form-control checkout_date" name="checkout_date" placeholder="Check Out Date" required>';
echo '</div>';
echo '<div class="form-group">';
echo '<div class="select-wrap one-third">';
echo '<div class="icon"><span class="ion-ios-arrow-down"></span></div>';
echo '<select name="room_type" id="" class="form-control" required>';
echo '<option value="">Room Type</option>';
echo '<option value="Suite Room">Suite Room</option>';
echo '<option value="Family Room">Family Room</option>';
echo '<option value="Deluxe Room">Deluxe Room</option>';
echo '<option value="Classic Room">Classic Room</option>';
echo '<option value="Superior Room">Superior Room</option>';
echo '<option value="Luxury Room">Luxury Room</option>';
echo '</select>';
echo '</div>';
echo '</div>';
echo '<div class="form-group">';
echo '<div class="select-wrap one-third">';
echo '<div class="icon"><span class="ion-ios-arrow-down"></span></div>';
echo '<select name="" id="" class="form-control" required>';
echo '<option value="">0 Adult</option>';
echo '<option value="">1 Adult</option>';
echo '<option value="">2 Adult</option>';
echo '<option value="">3 Adult</option>';
echo '<option value="">4 Adult</option>';
echo '<option value="">5 Adult</option>';
echo '<option value="">6 Adult</option>';
echo '</select>';
echo '</div>';
echo '</div>';
echo '<div class="form-group">';
echo '<input type="submit" name="checkAvailability" value="Check" class="btn btn-primary py-3 px-5">';
echo '</div>';
echo '</div>';
echo '</form>';
echo '</div>';
echo '</div>';
echo '</div>';
if (isset($_POST['checkAvailability'])) {
    $checkinDate = $_POST['checkin_date'];
    $checkoutDate = $_POST['checkout_date'];
    $roomType = $_POST['room_type'];

    // Perform the query to check for available rooms
    $query = $conn->prepare("SELECT COUNT(*) AS count FROM reservations 
    WHERE room_id IN (SELECT room_id FROM room WHERE room_type = ?) 
    AND ((checkIn <= ? AND checkOut >= ?) 
    OR (checkIn <= ? AND checkOut >= ?) 
    OR (checkIn >= ? AND checkOut <= ?))
    AND status IN ('pending', 'check In')");
$query->bind_param("sssssss", $roomType, $checkinDate, $checkoutDate, $checkinDate, $checkoutDate, $checkinDate, $checkoutDate);

    $query->execute();
    $query->bind_result($count);
    $query->fetch();
    $query->close();

    $query = $conn->prepare("SELECT RoomsNumber FROM room WHERE room_type = ?");
    $query->bind_param("s", $roomType);
    $query->execute();
    $query->bind_result($roomsNumber);

    if ($query->fetch()) {
        // Available rooms found
        $query->close();

        if ($count <= $roomsNumber) {
            // Display the rental form
			echo '<form method="POST" action="rental-form-handler.php" class="bg-white p-5 rent-form" id="rentForm" style="position: relative; bottom: -50xp; width: 80%;">';
			echo '<div class="form-group">';
			echo '<input type="text" name="name" class="form-control" placeholder="Your Name" required>';
			echo '</div>';
			echo '<div class="form-group">';
			echo '<input type="email" name="email" class="form-control" placeholder="Your Email" required>';
			echo '</div>';
			echo '<div class="form-group">';
			echo '<input type="text" class="form-control" name="room_type" placeholder="ROOM" readonly value="' . $roomType . '" required>';
			echo '</div>';
			echo '<div class="form-group">';
			echo '<input type="text" id="checkin_date" name="checkin_date" class="form-control" placeholder="Check In Date" readonly value="' . $checkinDate . '" required>';
			echo '</div>';
			echo '<div class="form-group">';
			echo '<input type="text" id="checkout_date" name="checkout_date" class="form-control" placeholder="Check Out Date" readonly value="' . $checkoutDate . '" required>';
			echo '</div>';
			echo '<div class="form-group">';
			echo '<input type="text" name="phone_number" class="form-control" placeholder="Phone Number" required>';
			echo '</div>';
			echo '<div class="form-group">';
			echo '</div>';
			echo '<div class="form-group">';
			echo '<input type="submit" name="rent_room" value="Rent" class="btn btn-primary py-3 px-5">';
			echo '</div>';
			echo '</form>';
			echo '<script>window.location = "rooms.php#rentForm";</script>';
		
        } else {
            // No available rooms found
            echo '<div class="alert alert-danger" role="alert">';
            echo 'Unfortunately, there are no available rooms that satisfy the information you entered.';
            echo '</div>';
        }
    } else {
        // Failed to fetch RoomsNumber, set it to false
        $roomsNumber = false;
        $query->close();

        // Display notification for missing RoomsNumber
        echo '<div class="alert alert-danger" role="alert">';
        echo 'Not Valid.';
        echo '</div>';
    }
}


echo '</div>';

$conn->close();

?>



</section>


    <section class="instagram pt-5">
      <div class="container-fluid">
        <div class="row no-gutters justify-content-center pb-5">
          <div class="col-md-7 text-center heading-section ftco-animate">
            <h2><span>Instagram</span></h2>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-sm-12 col-md ftco-animate">
            <a href="images/insta-1.jpg" class="insta-img image-popup" style="background-image: url(images/insta-1.jpg);">
              <div class="icon d-flex justify-content-center">
                <span class="icon-instagram align-self-center"></span>
              </div>
            </a>
          </div>
          <div class="col-sm-12 col-md ftco-animate">
            <a href="images/insta-2.jpg" class="insta-img image-popup" style="background-image: url(images/insta-2.jpg);">
              <div class="icon d-flex justify-content-center">
                <span class="icon-instagram align-self-center"></span>
              </div>
            </a>
          </div>
          <div class="col-sm-12 col-md ftco-animate">
            <a href="images/insta-3.jpg" class="insta-img image-popup" style="background-image: url(images/insta-3.jpg);">
              <div class="icon d-flex justify-content-center">
                <span class="icon-instagram align-self-center"></span>
              </div>
            </a>
          </div>
          <div class="col-sm-12 col-md ftco-animate">
            <a href="images/insta-4.jpg" class="insta-img image-popup" style="background-image: url(images/insta-4.jpg);">
              <div class="icon d-flex justify-content-center">
                <span class="icon-instagram align-self-center"></span>
              </div>
            </a>
          </div>
          <div class="col-sm-12 col-md ftco-animate">
            <a href="images/insta-5.jpg" class="insta-img image-popup" style="background-image: url(images/insta-5.jpg);">
              <div class="icon d-flex justify-content-center">
                <span class="icon-instagram align-self-center"></span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <footer class="ftco-footer ftco-bg-dark ftco-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Solace Hotel</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4 ml-md-5">
              <h2 class="ftco-heading-2">Useful Links</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Blog</a></li>
                <li><a href="#" class="py-2 d-block">Rooms</a></li>
                <li><a href="#" class="py-2 d-block">Amenities</a></li>
                <li><a href="#" class="py-2 d-block">Gift Card</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
             <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Privacy</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Career</a></li>
                <li><a href="#" class="py-2 d-block">About Us</a></li>
                <li><a href="#" class="py-2 d-block">Contact Us</a></li>
                <li><a href="#" class="py-2 d-block">Services</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
            	<h2 class="ftco-heading-2">Have a Questions?</h2>
            	<div class="block-23 mb-3">
	              <ul>
	                <li><span class="icon icon-map-marker"></span><span class="text">75 Şehitler Caddesi Atatürk Mahallesi 06530 Çankaya, Ankara Turkey</span></li>
	                <li><a href="#"><span class="icon icon-phone"></span><span class="text">+50 5388255988</span></a></li>
	                <li><a href="#"><span class="icon icon-envelope"></span><span class="text">hamzaab25@gmail.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">

            <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
 
  <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
          </div>
        </div>
      </div>
    </footer>
    
  

  <!-- loader -->
  <div id="ftco-loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00"/></svg></div>


  <script src="js/jquery.min.js"></script>
  <script src="js/jquery-migrate-3.0.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.easing.1.3.js"></script>
  <script src="js/jquery.waypoints.min.js"></script>
  <script src="js/jquery.stellar.min.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/jquery.magnific-popup.min.js"></script>
  <script src="js/aos.js"></script>
  <script src="js/jquery.animateNumber.min.js"></script>
  <script src="js/bootstrap-datepicker.js"></script>
  <script src="js/jquery.timepicker.min.js"></script>
  <script src="js/scrollax.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script>
  <script src="js/google-map.js"></script>
  <script src="js/main.js"></script>
    
  </body>
</html>