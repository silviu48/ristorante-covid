<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

if(isset($_REQUEST['ordineAttuale'])){

    $ordineAttuale = $_REQUEST['ordineAttuale'];

    $res = DB::query(
        "SELECT p.nome AS nome, p.costo AS costo, c.quantitaOrdinata AS quantita
        FROM piatto p JOIN contiene c ON p.id = c.piatto
        WHERE c.ordine = $ordineAttuale 
    ")->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res);

} else if(isset($_REQUEST['tavolo'])){

    $tavolo = $_REQUEST['tavolo'];
    $tavolo = (int)$tavolo;
    
    $res = DB::query(
        "SELECT p.nome AS nome, p.costo AS costo, c.quantitaOrdinata AS quantita
        FROM piatto p JOIN contiene c ON p.id = c.piatto JOIN ordine o ON c.ordine = o.id
        WHERE o.tavolo = $tavolo and o.evaso = 0")->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res);


} else echo json_encode("Nessun Ordine Attivo")

?>