<?php
    require_once("./utils/Database.php");
    //header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *'); //CHANGE IT FOR SECURITY REASONS

    $db = new Database();
    if(isset($_GET['tipologia'])){
        $res = $db->executeQuery(
            /*"SELECT p.*, i.nome, i.allergenico 
            FROM piatto p JOIN fattoda f ON p.id = f.piatto 
            JOIN ingrediente i ON f.ingrediente = i.id"*/
            "SELECT * FROM piatto WHERE tipologia = ?"
            , array('type'=>'s', 'value'=>$_GET['tipologia']));
    } else {
        $res = $db->executeQuery(
            /*"SELECT p.*, i.nome, i.allergenico 
            FROM piatto p JOIN fattoda f ON p.id = f.piatto 
            JOIN ingrediente i ON f.ingrediente = i.id"*/
            "SELECT * FROM piatto"
            , []);
        foreach($res as $entry){
            if(isset($entry['img'])) $entry['img'] = 'data:image;base64,'.$entry['img'];
        }
    }
    
    echo json_encode($res);
    exit();
?>