<?php
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../../objects/roadmap.php';
$database = new Database();
$db = $database->getConnection();
$RoadMap = new RoadMap($db);
$results = $RoadMap->readAllHori();

echo $results;
