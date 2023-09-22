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
    } else if(is_null($_POST['quarterid']) || empty($_POST['quarterid'])) {
        $result = "The quarterid must be filled.";
    } else if(is_null($_POST['status']) || empty($_POST['status'])) {
        $result = "The status must be filled.";
    } else if(is_null($_POST['startdate']) || empty($_POST['startdate'])) {
        $result = "The startdate must be filled.";
    } else if(is_null($_POST['userstory']) || empty($_POST['userstory'])) {
        $result = "The userstory must be filled.";
    } else if(is_null($_POST['developby']) || empty($_POST['developby'])) {
        $result = "The developby must be filled.";
    } else if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else if(is_null($_POST['createdby']) || empty($_POST['createdby'])) {
        $result = "The createdby must be filled.";
    } else {
        $RoadMap->toolname = $_POST['toolname'];
        $RoadMap->quarterid = $_POST['quarterid'];
        $RoadMap->status = $_POST['status'];
        $RoadMap->startdate = $_POST['startdate'];
        $RoadMap->enddate = $_POST['enddate'];
        $RoadMap->userstory = $_POST['userstory'];
        $RoadMap->developby = $_POST['developby'];
        $RoadMap->description = $_POST['description'];
        $RoadMap->createdby = $_POST['createdby'];
        $result = $RoadMap->createData() ? "true" : 'false';
    }

    // create the product
    echo $result;
}