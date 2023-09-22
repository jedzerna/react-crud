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

    $result = 'true';
    if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else if(is_null($_POST['addedby']) || empty($_POST['addedby'])) {
        $result = "The addedby must be filled.";
    } else if(is_null($_POST['tool']) || empty($_POST['tool'])) {
        $result = "The tool must be filled.";
    } else if(is_null($_POST['id']) || empty($_POST['id'])) {
        $result = "The id must be filled.";
    } else {
        // new values
        $forecast->description = $_POST['description'];
        $forecast->addedby = $_POST['addedby'];
        $forecast->tool = $_POST['tool'];
        $forecast->id = $_POST['id'];
        $result = $forecast->updateToolOnly() ? "true" : 'false';
    }

    // update the product
    echo $result;
}