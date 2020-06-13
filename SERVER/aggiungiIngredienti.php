<?php

require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

if($_REQUEST['id'] != 0){

    $id = $_REQUEST['id'];
    $nome = $_REQUEST['nome'];
    $note = $_REQUEST['note'];
    $quantita = $_REQUEST['quantitaDisponibile'];
    $quantitaMinima = $_REQUEST['quantitaMinima'];
    $allergenico = $_REQUEST['allergenico'];
    
    DB::startTransaction();
    $res = DB::query(
        "UPDATE ingrediente SET nome = '$nome', note = '$note', quantitaDisponibile = '$quantita', quantitaMinima = '$quantitaMinima', allergenico = '$allergenico' WHERE id = '$id'"
    );

    DB::endTransaction();
    if(!isset($res)) echo json_encode(true);
    else echo json_encode($res);

} else if(empty($_REQUEST['id'])){

    $nome = $_REQUEST['nome'];
    $note = $_REQUEST['note'];
    $quantita = $_REQUEST['quantita'];
    $quantitaMinima = $_REQUEST['quantitaMinima'];
    $allergenico = $_REQUEST['allergenico'];
    
    DB::startTransaction();
    $res = DB::query(
        "INSERT INTO ingrediente(nome, note, quantitaDisponibile, quantitaMinima, allergenico) VALUE ('$nome', '$note', $quantita, $quantitaMinima, $allergenico)"
    );

    DB::endTransaction();

    if(!isset($res)) echo json_encode(true);
    else echo json_encode($res);

} else echo json_encode("Non ho capito");


?>