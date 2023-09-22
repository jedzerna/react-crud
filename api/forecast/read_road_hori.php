<?php
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../../objects/forecast.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$forecast = new Forecast($db);
$results = $forecast->readAllHori();

echo $results;
