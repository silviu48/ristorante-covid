<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

if(isset($_GET['id'])){

    $db = new Database();
    $db->startTransaction();

    $stmt = $db->newQuery("
        SELECT ordine FROM contiene WHERE piatto = ? AND evaso = 0 LIMIT 1
    ");
    $stmt->bind_param("i", $_GET['id']);
    $res = $db->executeQuery($stmt);
    /*
    * LIMIT nelle Subquery non funziona
    $stmt = $db->newQuery(
        "UPDATE contiene
        SET quantitaAttuale = quantitaAttuale - 1 
        WHERE ordine = ? and piatto = ? and evaso = 0
        "
    );
    */
    $stmt = $db->newQuery(
        "UPDATE contiene
        SET quantitaAttuale = quantitaAttuale - 1 
        WHERE ordine = ? and piatto = ?
        "
    );
    $stmt->bind_param("ii", $res[0]['ordine'], $_GET['id']);
    $res = $db->insertQuery($stmt);
    $success = $db->commit();
    echo json_encode($success);

} else echo json_encode("Errore");

?>