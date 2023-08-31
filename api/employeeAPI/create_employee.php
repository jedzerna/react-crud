<?php
// if the form was submitted
if($_POST){


    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/employee.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Employee = new Employee($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['EmployeeID']) || empty($_POST['EmployeeID'])) {
        $result = "The EmployeeID must be filled.";
    } else if(is_null($_POST['EmployeeName']) || empty($_POST['EmployeeName'])) {
        $result = "The EmployeeName must be filled.";
    } else if(is_null($_POST['PrimarySkillsets']) || empty($_POST['PrimarySkillsets'])) {
        $result = "The PrimarySkillsets must be filled.";
    } else if(is_null($_POST['SecondarySkillsets']) || empty($_POST['SecondarySkillsets'])) {
        $result = "The SecondarySkillsets must be filled.";
    } else {
        $Employee->EmployeeID = $_POST['EmployeeID'];
        $Employee->EmployeeName = $_POST['EmployeeName'];
        $Employee->PrimarySkillsets = $_POST['PrimarySkillsets'];
        $Employee->SecondarySkillsets = $_POST['SecondarySkillsets'];
        $result = $Employee->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}