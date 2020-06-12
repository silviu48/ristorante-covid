<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

$res = DB::query(
    "SELECT *
    FROM tavolo
")->fetch_all(MYSQLI_ASSOC);

echo json_encode($res);

?>