<?php
$servername = "localhost:3306";
$username = "root"; 
$password = "1111"; 
$dbname = "tz"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    var_dump($_POST); 
    exit(); 

    $firstName = $conn->real_escape_string($_POST['firstName']);
    $lastName = $conn->real_escape_string($_POST['lastName']);
    $middleName = isset($_POST['middleName']) ? $conn->real_escape_string($_POST['middleName']) : null;
    $birthDate = $conn->real_escape_string($_POST['birthDate']);
    $email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : null;
    $phoneNumbers = isset($_POST['phoneNumbers']) ? json_decode($_POST['phoneNumbers'], true) : [];
    if (json_last_error() !== JSON_ERROR_NONE) {
        die("JSON decode error: " . json_last_error_msg());
    }
    $maritalStatus = $conn->real_escape_string($_POST['marital_status']);
    $about = isset($_POST['about']) ? $conn->real_escape_string($_POST['about']) : null;

    $sql = "INSERT INTO users (first_name, last_name, middle_name, birth_date, email, marital_status, about)
            VALUES ('$firstName', '$lastName', '$middleName', '$birthDate', '$email', '$maritalStatus', '$about')";

    if ($conn->query($sql) === TRUE) {
        $userId = $conn->insert_id;

        if (!empty($phoneNumbers)) {
            foreach ($phoneNumbers as $phoneData) {
                $countryCode = $conn->real_escape_string($phoneData['countryCode']);
                $phoneNumber = $conn->real_escape_string($phoneData['phoneNumber']);
                $phoneSql = "INSERT INTO phones (user_id, country_code, phone_number)
                             VALUES ('$userId', '$countryCode', '$phoneNumber')";

                if (!$conn->query($phoneSql)) {
                    echo "Error saving phone number: " . $conn->error;
                }
            }
        }

        echo "Data saved successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
