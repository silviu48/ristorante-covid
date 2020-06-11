<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS
    

if(isset($_GET['id'])){

    $piatto = $_GET['id'];
    DB::startTransaction();

    $res = DB::query("
        SELECT ordine FROM contiene WHERE piatto = $piatto AND evaso = 0 LIMIT 1
    ");
    /*
    * LIMIT nelle Subquery non funziona
    $stmt = $db->newQuery(
        "UPDATE contiene
        SET quantitaAttuale = quantitaAttuale - 1 
        WHERE ordine = ? and piatto = ? and evaso = 0
        "
    );
    */
    $ordine = $res->fetch_assoc()['ordine'];

    if(isset($ordine)){
        $affected_rows = DB::getAffectedRows(
            "UPDATE contiene
            SET quantitaAttuale = quantitaAttuale - 1 
            WHERE ordine = $ordine and piatto = $piatto"
        );

        DB::endTransaction();
        
        if ($affected_rows) echo json_encode("true");
        else echo json_encode("false");

    } else echo json_encode("Nessun Piatto");
    

} else echo json_encode("Errore");

?>