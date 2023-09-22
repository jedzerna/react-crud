<?php
// if the form was submitted
if($_POST){

    
    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/position.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Position = new Position($db);

    $result = 'true';
    if(is_null($_POST['Position']) || empty($_POST['Position'])) {
        $result = "The Position must be filled.";
    } else if(is_null($_POST['Experience']) || empty($_POST['Experience'])) {
        $result = "The Experience must be filled.";
    } else if(is_null($_POST['PositionCount']) || empty($_POST['PositionCount'])) {
        $result = "The PositionCount must be filled.";
    } else if(is_null($_POST['ReplacementAditional']) || empty($_POST['ReplacementAditional'])) {
        $result = "The ReplacementAditional must be filled.";
    } else {
        // new values
        $Position->Position = $_POST['Position'];
        $Position->Experience = $_POST['Experience'];
        $Position->PositionCount = $_POST['PositionCount'];
        $Position->SkillSets = $_POST['SkillSets'];
        $Position->Budget = $_POST['Budget'];
        $Position->ReplacementAditional = $_POST['ReplacementAditional'];
        $Position->id = $_POST['id'];
        $result = $Position->update() ? "true" : 'false';
    }

    // update the product
    echo $result;
}