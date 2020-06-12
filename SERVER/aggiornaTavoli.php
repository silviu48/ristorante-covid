<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

if(isset($_REQUEST['tavolo']) and isset($_REQUEST['mode'])){
    $tavolo = $_REQUEST['tavolo'];
    $mode = (int)$_REQUEST['mode'];
    $res = DB::query(
        "UPDATE tavolo
        SET libero = $mode
        WHERE id = $tavolo
    ");

    if($mode == 0){
        $res = DB::query(
            "INSERT INTO ordine(tavolo)
            VALUE ($tavolo)");
    }
    
    if (isset($res)) echo json_encode($res);
    else echo json_encode(true);
} else echo json_encode(false);


?>