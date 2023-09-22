<?php
// if the form was submitted
if($_POST){


    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/achievements.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Achievements = new Achievements($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['team']) || empty($_POST['team'])) {
        $result = "The team name must be filled.";
    } else if(is_null(trim($_POST['month'])) || empty(trim($_POST['month']))) {
        $result = "The date must be filled.";
    } else if(is_null($_POST['year']) || empty($_POST['year'])) {
        $result = "The date must be filled.";
    } else if(is_null($_POST['achievements'])  && is_null($_POST['challenges'])) {
        $result = "The achievements/challenges must be filled.";
    } else if(empty($_POST['achievements']) && empty($_POST['challenges'])) {
        $result = "The achievements/challenges must be filled.";
    } else {
        $Achievements->team = $_POST['team'];
        $Achievements->month = $_POST['month'];
        $Achievements->year = $_POST['year'];
        $Achievements->achievements = $_POST['achievements'];
        $Achievements->challenges = $_POST['challenges'];
        $result = $Achievements->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}