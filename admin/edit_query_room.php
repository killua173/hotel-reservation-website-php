<?php
	require_once 'connect.php';
	if(ISSET($_POST['edit_room'])){
		$room_type = $_POST['room_type'];
		$pricePerDay = $_POST['price'];
		$RoomsNumber = $_POST['RoomsNumber'];
		$photo = addslashes(file_get_contents($_FILES['photo']['tmp_name']));
		$photo_name = addslashes($_FILES['photo']['name']);
		$photo_size = getimagesize($_FILES['photo']['tmp_name']);
		move_uploaded_file($_FILES['photo']['tmp_name'],"../photo/" . $_FILES['photo']['name']);
		$conn->query("UPDATE `room` SET `room_type` = '$room_type',`RoomsNumber`='$RoomsNumber', `pricePerDay` = '$pricePerDay', `photo` = '$photo_name' WHERE `room_id` = '$_REQUEST[room_id]'") or die(mysqli_error());
		header("location:room.php");
	}
?>