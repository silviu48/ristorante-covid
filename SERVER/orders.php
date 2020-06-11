<?php

    require_once './utils/Database.php';

    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

    $res = DB::query(
        "SELECT id, nome , ordiniAttivi
        FROM piatto p
        WHERE ordiniAttivi != 0
        GROUP BY p.id"
    );
    $res= $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res);

?>