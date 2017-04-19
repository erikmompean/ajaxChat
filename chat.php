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
            $myUser = (int)$_GET['myId'];
            $otherUser = (int)$_GET['otherId'];
            $array = array();
            $result = mysqli_query($conn, "SELECT * FROM `messages` WHERE sender LIKE $myUser AND receiver LIKE $otherUser OR sender LIKE $otherUser AND receiver LIKE $myUser");

            while($i = mysqli_fetch_assoc($result)){
                $array[] = $i;
            }
            echo json_encode($array);
            
            break;
        case 4:

            echo json_encode($_SESSION["myuser"]);
            break;

        case 5:
        
            $sender = (int)$_GET['sender'];
            $receiver = (int)$_GET['receiver'];
            $text = $_GET['text'];
            $sql = "INSERT INTO `messages` (`message_id`, `sender`, `receiver`, `text`) VALUES (NULL, $sender, $receiver, '$text');";
            if (mysqli_query($conn, $sql)) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }

            break;
        case 6:
                //
            $id = (int)$_GET['id'];
            $array = array();
            $result = mysqli_query($conn, "SELECT * FROM `users` WHERE user_id LIKE $id");

            while($i = mysqli_fetch_assoc($result)){
                $array[] = $i;
            }
            echo json_encode($array);
            break;
    }
    
?>