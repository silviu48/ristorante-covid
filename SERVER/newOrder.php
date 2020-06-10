<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

if(isset($_GET['id']) and isset($_COOKIE['actualOrder'])){

    $db = new Database();

    $stmt = $db->newQuery(
        "INSERT INTO contiene(ordine, piatto) VALUE (?, ?) ON DUPLICATE KEY UPDATE quantitaOrdinata = quantitaOrdinata + 1, quantitaAttuale = quantitaAttuale + 1"
    );

    $stmt->bind_param("ii", $_COOKIE['actualOrder'], $_GET['id']);
    $res = $db->insertQuery($stmt);
    
    echo json_encode($res);

} else echo json_encode("Inserimento fallito");

?>