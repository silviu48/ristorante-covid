<?php
    require_once("./utils/Database.php");

    $db = new Database();
    $stmt = $db->newQuery(
        /*"SELECT p.*, i.nome, i.allergenico 
        FROM piatto p JOIN fattoda f ON p.id = f.piatto 
        JOIN ingrediente i ON f.ingrediente = i.id"*/
        "SELECT DISTINCT tipologia FROM piatto"
    );
    $res = $db->executeQuery($stmt);
    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS
    echo json_encode($res);
    exit();
?>