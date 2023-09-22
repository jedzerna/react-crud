<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/techP.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $Pending = new Pending($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['Team']) || empty($_POST['Team'])) {
        $result = "The Team must be filled.";
    } else if(is_null($_POST['Publisher']) || empty($_POST['Publisher'])) {
        $result = "The Publisher must be filled.";
    } else if(is_null($_POST['ProjectDetails']) || empty($_POST['ProjectDetails'])) {
        $result = "The Project Details must be filled.";
    } else if(is_null($_POST['ReceivedDate']) || empty($_POST['ReceivedDate'])) {
        $result = "The Received Date Details must be filled.";
    } else if(is_null($_POST['DueDate']) || empty($_POST['DueDate'])) {
       $result = "The Due Date Details must be filled.";
    } else if(is_null($_POST['CurrentStatus']) || empty($_POST['CurrentStatus'])) {
        $result = "The Current Status Details must be filled.";
    } else if(is_null($_POST['Remarks']) || empty($_POST['Remarks'])) {
       // $result = "The Remarks Details must be filled.";
    } else {
      
        $Pending->Team = $_POST['Team'];
        $Pending->Publisher = $_POST['Publisher'];
        $Pending->ProjectDetails = $_POST['ProjectDetails'];
        $Pending->ReceivedDate = $_POST['ReceivedDate'];
        $Pending->DueDate = $_POST['DueDate'];
        $Pending->CurrentStatus = $_POST['CurrentStatus'];
        $Pending->Remarks = $_POST['Remarks'];
        
        $result = $Pending->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}