<?php
require_once("./utils/Database.php");

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

if($_REQUEST['id'] != 0){

    $id = $_REQUEST['id'];
    $nome = $_REQUEST['nome'];
    $img = $_REQUEST['img'];
    $tipologia = $_REQUEST['tipologia'];
    $tempoPreparazione = $_REQUEST['tempoPreparazione'];
    $costo = $_REQUEST['costo'];
    
    DB::startTransaction();
    $res = DB::query(
        "UPDATE piatto SET nome = '$nome', img = '$img', tipologia = '$tipologia', tempoPreparazione = '$tempoPreparazione', costo = '$costo' WHERE id = '$id'"
    );

    for($i = 0; $i < ((count($_REQUEST) - 6)/2)-1; $i++){
        $ingrediente = $_REQUEST['ingrediente'.$i];
        $quantita = $_REQUEST['quantita'.$i];
        try{
            $app = DB::query(
                "INSERT INTO fattoda(piatto, ingrediente, quantita) VALUE ('$id', '$ingrediente', '$quantita')"
            );
        }catch(Exception $e){}
        
    }

    DB::endTransaction();
    if(!isset($app)) echo json_encode(true);
    else echo json_encode($app);

} else if(empty($_REQUEST['id'])){

    $nome = $_REQUEST['nome'];
    $tipologia = $_REQUEST['tipologia'];
    $tempoPreparazione = $_REQUEST['tempoPreparazione'];
    $costo = $_REQUEST['costo'];
    
    DB::startTransaction();
    $res = DB::getInsertId(
        "INSERT INTO piatto(nome, tipologia, costo, tempoPreparazione) VALUE ('$nome', '$note', '$quantita', '$quantitaMinima')"
    );

    for($i = 0; $i < count($_REQUEST) - 4; $i++){
        $ingrediente = $_REQUEST['ingrediente'.$i];
        $quantita = $_REQUEST['quantita'.$i];

        echo $ingrediente, $quantita;
        $app = DB::query(
            "INSERT INTO fattoda(piatto, ingrediente, quantita) VALUE ('$res', '$ingrediente', '$quantita')"
        );
    }
    

    DB::endTransaction();

    if(!isset($app)) echo json_encode(true);
    else echo json_encode($app);

} else echo json_encode("Non ho capito");


?>