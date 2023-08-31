<?php
// if the form was submitted
if($_POST){

       // include core configuration
       include_once '../../config/core.php';

       // include database connection
       include_once '../../config/database.php';
   
       // product object
    include_once '../../objects/roadmap.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $RoadMap = new RoadMap($db);

    $result = 'true';
    if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else if(is_null($_POST['developby']) || empty($_POST['developby'])) {
        $result = "The developby must be filled.";
    } else if(is_null($_POST['id']) || empty($_POST['id'])) {
        $result = "The id must be filled.";
    } else {
        // new values
        $RoadMap->description = $_POST['description'];
        $RoadMap->developby = $_POST['developby'];
        $RoadMap->id = $_POST['id'];
        $result = $RoadMap->updateToolOnly() ? "true" : 'false';
    }

    // update the product
    echo $result;
}