<?php
    require_once("./utils/Database.php");

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS 
    
if(isset($_REQUEST['tavolo'])){
    $tavolo = $_REQUEST['tavolo'];
    $res = DB::query(
        /*"SELECT p.*, i.nome, i.allergenico 
        FROM piatto p JOIN fattoda f ON p.id = f.piatto 
        JOIN ingrediente i ON f.ingrediente = i.id"*/
        "SELECT id as ordine FROM ordine WHERE tavolo = $tavolo and evaso = 0"
    )->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($res);
    exit();
} else echo json_encode("Something\'s Missing");
    
?>