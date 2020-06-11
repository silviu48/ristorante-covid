<?php

require_once("./utils/Database.php");

//header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS
var_dump($_COOKIE);

if(isset($_REQUEST['id']) && isset($_COOKIE['actualOrder'])){
    $id = $_GET['id'];
    $ordine = $_COOKIE['actualOrder'];

    $res = DB::query(
        "INSERT INTO contiene(ordine, piatto) VALUE ($ordine, $id) ON DUPLICATE KEY UPDATE quantitaOrdinata = quantitaOrdinata + 1, quantitaAttuale = quantitaAttuale + 1"
    );
    if(!isset($res)) echo json_encode("true");
    else echo json_encode($res);

} else echo json_encode("Inserimento fallito");

?>