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
    if(is_null($_POST['tool']) || empty($_POST['tool'])) {
        $result = "The tool name must be filled.";
    } else {
        $forecast->tool = $_POST['tool'];
        $result = $forecast->createTool() ? 'true' : 'false';
    }

    // create the product
    echo $result;
}