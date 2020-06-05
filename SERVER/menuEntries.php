<?php
    require_once("./utils/Database.php");

    $db = new Database();

    $res = $db->executeQuery("
                    SELECT p.*, i.nome, i.allergenico 
                    FROM piatto p JOIN fattoda f ON p.id = f.piatto JOIN ingrediente i ON f.ingrediente = i.id", []);

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS
    echo json_encode($res);
    exit();
?>