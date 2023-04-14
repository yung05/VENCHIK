<?php
error_reporting(E_ALL);
$link = mysqli_connect('localhost', 'root', '', 'user_cakes') or die('Error connect to database');

if (!empty($_POST['loginreg'])) {
    $loginreg = $_POST['loginreg'];
    $passwordreg = $_POST['passwordreg'];
    $emailreg = $_POST['emailreg'];
    $res = mysqli_query($link, "INSERT INTO users (login, email, password) VALUES ('$loginreg', '$emailreg', '$passwordreg')");
    if ($res->num_rows > 0) {
        echo 'accept';
    }
};

if (!empty($_REQUEST['loginavt'])) {
    $loginavt = $_REQUEST['loginavt'];
    $passwordavt = $_REQUEST['passwordavt'];
    $avt = mysqli_query($link, "SELECT * FROM users WHERE login = '$loginavt'");
    if ($avt->num_rows == 0) {
        echo 'wrong name';
    } else {
        while ($row = mysqli_fetch_array($avt)) {
            if ($row['password'] == $passwordavt) {
                echo $row['login'];
            } else {
                echo 'wrong pass';
            }
        }
    }
};

if (!empty($_POST['loginform']) AND !empty($_POST['emailform']) AND !empty($_POST['messageform'])) {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "user_cakes";
    
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Ошибка подключения: " . mysqli_connect_error());
    }
    
    $loginform = mysqli_real_escape_string($conn, $_POST['loginform']);
    $emailform = mysqli_real_escape_string($conn, $_POST['emailform']);
    $messageform = mysqli_real_escape_string($conn, $_POST['messageform']);
    
    $sql = "INSERT INTO messages (name, email, message) VALUES ('$loginform', '$emailform', '$messageform')";
    
    if (mysqli_query($conn, $sql)) {
        echo "good";
    }
    
    mysqli_close($conn);
}