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
    if(is_null($_POST['SkillSets']) || empty($_POST['SkillSets'])) {
        $result = "The SkillSets must be filled.";
    } else if(is_null($_POST['SubTeam']) || empty($_POST['SubTeam'])) {
        $result = "The SubTeam must be filled.";
    } else if(is_null($_POST['Team']) || empty($_POST['Team'])) {
        $result = "The Team must be filled.";
    } else {
        // new values
        $RoadMap->toolname = $_POST['toolname'];
        $RoadMap->createdby = $_POST['createdby'];
        $RoadMap->quarter = $_POST['quarter'];
        $RoadMap->description = $_POST['description'];
        $RoadMap->year = $_POST['year'];
        $RoadMap->developby = $_POST['developby'];
        $RoadMap->id = $_POST['id'];
        $result = $RoadMap->update() ? "true" : 'false';
    }

    // update the product
    echo $result;
}