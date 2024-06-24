<?php
	require_once 'connect.php';
	$conn->query("DELETE FROM `reservations` WHERE `transaction_id` = '$_REQUEST[transaction_id]'") or die(mysqli_error());
	header("location:reserve.php");
?>