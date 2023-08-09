<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../config/core.php';

    // include database connection
    include_once '../config/database.php';

    // product object
    include_once '../objects/thirdparty.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $ThirdParty = new ThirdParty($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['Team']) || empty($_POST['Team'])) {
        $result = "The Team must be filled.";
    } else if(is_null($_POST['Purpose']) || empty($_POST['Purpose'])) {
        $result = "The Purpose must be filled.";
    } else if(is_null($_POST['SoftwareName']) || empty($_POST['SoftwareName'])) {
        $result = "The SoftwareName must be filled.";
    } else if(is_null($_POST['Details']) || empty($_POST['Details'])) {
        $result = "The Details must be selected.";
    } else if(is_null($_POST['License']) || empty($_POST['License'])) {
        $result = "The License must be filled.";
    } else {
        $ThirdParty->Team = $_POST['Team'];
        $ThirdParty->Purpose = $_POST['Purpose'];
        $ThirdParty->SoftwareName = $_POST['SoftwareName'];
        $ThirdParty->Details = $_POST['Details'];
        $ThirdParty->License = $_POST['License'];
        $ThirdParty->site = $_POST['site'];
        $result = $ThirdParty->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}