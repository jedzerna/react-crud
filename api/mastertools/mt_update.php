<?php
// if the form was submitted
if($_POST){

    
    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/mastertools.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$master = new MasterTools($db);

    $result = 'true';
    if(is_null($_POST['department']) || empty($_POST['department'])) {
        $result = "The department must be filled.";
    } else if(is_null($_POST['toolname']) || empty($_POST['toolname'])) {
        $result = "The toolname must be filled.";
    } else if(is_null($_POST['productname']) || empty($_POST['productname'])) {
        $result = "The productname must be filled.";
    } else if(is_null($_POST['activities']) || empty($_POST['activities'])) {
        $result = "The activities must be filled.";
    } else if(is_null($_POST['publishers']) || empty($_POST['publishers'])) {
        $result = "The publishers must be filled.";
    } else if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else {
        // new values
        $master->department = $_POST['department'];
        $master->toolname = $_POST['toolname'];
        $master->productname = $_POST['productname'];
        $master->activities = $_POST['activities'];
        $master->publishers = $_POST['publishers'];
        $master->description = $_POST['description'];
        $master->id = $_POST['id'];
        $result = $master->update() ? "true" : 'false';
    }

    // update the product
    echo $result;
}