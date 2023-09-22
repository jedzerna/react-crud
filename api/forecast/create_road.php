<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/forecast.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $forecast = new Forecast($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['title']) || empty($_POST['title'])) {
        $result = "The title must be filled.";
    } else if(is_null($_POST['createdby']) || empty($_POST['createdby'])) {
        $result = "The createdby must be filled.";
    } else if(is_null($_POST['tool']) || empty($_POST['tool'])) {
        $result = "The tool must be filled.";
    } else if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else if(is_null($_POST['addedby']) || empty($_POST['addedby'])) {
        $result = "The addedby must be filled.";
    } else {
        $forecast->title = $_POST['title'];
        $forecast->createdby = $_POST['createdby'];
        $forecast->tool = $_POST['tool'];
        $forecast->description = $_POST['description'];
        $forecast->addedby = $_POST['addedby'];
        $result = $forecast->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}