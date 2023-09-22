<?php
// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

// product object
include_once '../objects/thirdparty.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$ThirdParty = new ThirdParty($db);

$where = '%%';
$orderBy = 'Team';
$orderType = 'asc';
$limit = 5;
$currentPage = 1;

if(isset($_GET['Team']))
    if(!empty($_GET['Team']))
        $where = '%' . $_GET['Team'] . '%';

// $results = $product->readAll();
$results = $ThirdParty->count($where);

// output in json format
echo $results;