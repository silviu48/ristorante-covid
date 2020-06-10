<?php

    require_once './utils/Database.php';

    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

    $db = new Database();

    $stmt = $db->newQuery(
        "SELECT p.id as id, p.nome as nome, SUM(c.quantitaAttuale) as quantita
        FROM contiene c JOIN piatto p ON c.piatto = p.id
        WHERE c.evaso = 0
        GROUP BY p.id"
    );

    $res = $db->executeQuery($stmt);


    echo json_encode($res);

?>