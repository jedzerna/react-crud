<?php
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

$results = $Employee->gethighestid();

// output in json format
echo $results;
