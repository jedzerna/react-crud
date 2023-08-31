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

    // set product property values
    $result = 'true';
    if(is_null($_POST['toolname']) || empty($_POST['toolname'])) {
        $result = "The toolname must be filled.";
    } else if(is_null($_POST['createdby']) || empty($_POST['createdby'])) {
        $result = "The createdby must be filled.";
    } else if(is_null($_POST['quarter']) || empty($_POST['quarter'])) {
        $result = "The quarter must be filled.";
    } else if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else if(is_null($_POST['developby']) || empty($_POST['developby'])) {
        $result = "The developby must be filled.";
    } else {
        $RoadMap->toolname = $_POST['toolname'];
        $RoadMap->createdby = $_POST['createdby'];
        $RoadMap->quarter = $_POST['quarter'];
        $RoadMap->description = $_POST['description'];
        $RoadMap->developby = $_POST['developby'];
        $result = $RoadMap->createData() ? "true" : 'false';
    }

    // create the product
    echo $result;
}