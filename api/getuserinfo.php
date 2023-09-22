<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../config/core.php';

    // include database connection
    include_once '../config/database.php';

    // product object
    include_once '../objects/user.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    // set product property values
    $msg = 'true';
    $result = null;
    if(is_null($_POST['email']) || empty($_POST['email'])) {
        $msg = "The email field is required.";
    } else if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $msg = "The email is invalid.";
    } else {
        $user->email = $_POST['email'];
        $obj = $user->authnopass();
        $result = $obj;
        if($obj != null)
            $msg = 'true';
    }

    $data = [
        'message'   => $msg,
        'user'      => $result
    ];
    // create the product
    echo json_encode($data);

    
// $userObject = '';

// if(isset($_SESSION['id'])) {
//     $user->id = $_SESSION['id'];
//     $userObject = $user->readOne();
// }
// echo $userObject;
}