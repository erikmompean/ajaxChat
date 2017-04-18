<?php
    session_start();
    $_SESSION["myuser"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "chat";
    $data = (int)$_GET['option'];


    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //SELECT * FROM `users` WHERE username LIKE '%%'
    switch ($data) {
        case 0:
            $string = $_GET['string'];
            $result = mysqli_query($conn, "SELECT user_id, username FROM users WHERE username LIKE '%".$string."%'");
            $array = array();
            while($i = mysqli_fetch_assoc($result)){
                $array[] = $i;
            }

            echo json_encode($array);
            break;
        case 1:
            $result = mysqli_query($conn, "SELECT * FROM users");
            while($i = mysqli_fetch_assoc($result)){
                $array[] = $i;
            }
            echo json_encode($array);
            break;
        case 2:
            $arr = array();
            $username = $_GET['username'];
            $password = $_GET['password'];
            $result = mysqli_query($conn, "SELECT * FROM users WHERE username LIKE '".$username."' AND password LIKE '".$password."'");
            while($i = mysqli_fetch_assoc($result)){
                //$_SESSION["myuser"] = $i;
                $arr[] = $i;
            }
            if (empty($arr)) 
            {
                // list is empty.
                $_SESSION["myuser"] = [];
            }
            else
            {
                $_SESSION["myuser"] = $arr[0];
            }
            echo json_encode($_SESSION["myuser"]);
            break;
        case 3:


            break;
    }
    
?>