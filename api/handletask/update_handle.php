<?php
// if the form was submitted
if($_POST){

       // include core configuration
       include_once '../../config/core.php';

       // include database connection
       include_once '../../config/database.php';
   
       // product object
    include_once '../../objects/handletask.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $handle = new HandleTask($db);

    $result = 'true';
    if(is_null($_POST['action']) || empty($_POST['action'])) {
        $result = "The action must be filled.";
    } else if(is_null($_POST['dateraised']) || empty($_POST['dateraised'])) {
        $result = "The dateraised must be filled.";
    } else if(is_null($_POST['responsible']) || empty($_POST['responsible'])) {
        $result = "The responsible must be filled.";
    } else {
        // new values
        $handle->action = $_POST['action'];
        $handle->dateraised = $_POST['dateraised'];
        $handle->responsible = $_POST['responsible'];
        $handle->duedate = $_POST['duedate'];
        $handle->status = $_POST['status'];
        $handle->remarks = $_POST['remarks'];
        $handle->id = $_POST['id'];
        $result = $handle->update() ? "true" : 'false';
    }

    // update the product
    echo $result;
}