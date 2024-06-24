<?php


$errors = array(); // Initialize an empty array to store errors
$successMessage = ""; // Initialize an empty string for success message

if (ISSET($_POST['rent_room'])) {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $roomType = $_POST['room_type'];
    $checkinDate = date('Y-m-d', strtotime($_POST['checkin_date']));
    $checkoutDate = date('Y-m-d', strtotime($_POST['checkout_date']));
    $phoneNumber = $_POST['phone_number'];
    $note = $_POST['note'];

    // Insert the form data into the database
    // Modify the following code based on your database structure and connection

    // Establish a database connection
    require 'connect.php';

    // Get the room ID from the room table using roomType
    $roomQuery = $conn->prepare("SELECT room_id FROM room WHERE room_type = ?");
    $roomQuery->bind_param("s", $roomType);
    $roomQuery->execute();
    $roomResult = $roomQuery->get_result();
    $roomData = $roomResult->fetch_assoc();
    $roomId = $roomData['room_id'];

    // Prepare the insert statement
    $query = $conn->prepare("INSERT INTO reservations (`full name`, `checkIn`, `CheckOut`, `PhoneNO`, `Status`, `room_id`) 
                            VALUES (?, ?, ?, ?, ?, ?)");

    $status = 'Pending'; // Assuming the default status is "Pending"

    // Bind the parameters and execute the statement
    $query->bind_param("sssssi", $name, $checkinDate, $checkoutDate, $phoneNumber, $status, $roomId);

    if ($query->execute()) {
        // Insertion successful
        $query->close();
        $conn->close();



        header("Location: succeful_page.php");
    } else {
        // Insertion failed, store the error message
        $errors[] = "An error occurred while submitting the form. Please try again.";

        // Display the SQL error message for debugging
        $errors[] = "SQL Error: " . $query->error;
    }
}

// Display errors if any
if (count($errors) > 0) {
    echo '<div class="alert alert-danger">';
    foreach ($errors as $error) {
        echo '<p>' . $error . '</p>';
    }
    echo '</div>';
}

// Display success message if set
if ($successMessage !== "") {
    echo '<div class="alert alert-success">';
    echo '<p>' . $successMessage . '</p>';
    echo '</div>';
}
?>
