<?php 
    require_once("./utils/Database.php");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

    $res = DB::select("ingrediente", "*"
            /*"SELECT p.*, i.nome, i.allergenico 
            FROM piatto p JOIN fattoda f ON p.id = f.piatto 
            JOIN ingrediente i ON f.ingrediente = i.id"
            "SELECT * FROM piatto"*/
        )->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res);
    exit();

?>