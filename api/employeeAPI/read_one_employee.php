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

// read all products
$Employee->id = $_POST['prod_id'];
$results = $Employee->readOne();

// output in json format
echo $results;
