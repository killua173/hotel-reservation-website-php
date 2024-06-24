<?php
	require_once 'connect.php';
	if(ISSET($_POST['add_form'])){
		$room_no = $_POST['room_no'];
	

		$query = $conn->query("SELECT * FROM `reservations` WHERE `room_no` = '$room_no' && `status` = 'Check In'") or die(mysqli_error());
		$row = $query->num_rows;
		$time = date("H:i:s", strtotime("+8 HOURS"));
		if($row > 0){
			echo "<script>alert('Room not available')</script>";
		}else{
			$query2 = $conn->query("SELECT * FROM `reservations` NATURAL JOIN `room` WHERE `transaction_id` = '$_REQUEST[transaction_id]'") or die(mysqli_error());
			$fetch2 = $query2->fetch_array();
	
	
			
	
			$conn->query("UPDATE `reservations` SET `room_no` = '$room_no', `Status` = 'Check In' WHERE `transaction_id` = '$_REQUEST[transaction_id]'") or die(mysqli_error());


			header("location:checkin.php");
		}
	}
?>