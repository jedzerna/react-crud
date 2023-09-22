<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/projects.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $Projects = new Projects($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['SkillSets']) || empty($_POST['SkillSets'])) {
        $result = "The SkillSets must be filled.";
    } else if(is_null($_POST['SubTeam']) || empty($_POST['SubTeam'])) {
        $result = "The SubTeam must be filled.";
    } else if(is_null($_POST['Team']) || empty($_POST['Team'])) {
        $result = "The Team must be filled.";
    } else {
        $Projects->SkillSets = $_POST['SkillSets'];
        $Projects->SrEngineers = $_POST['SrEngineers'];
        $Projects->Intermediates = $_POST['Intermediates'];
        $Projects->JrEngineers	 = $_POST['JrEngineers'];
        $Projects->SubTeam = $_POST['SubTeam'];
        $Projects->Team = $_POST['Team'];
        $result = $Projects->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}