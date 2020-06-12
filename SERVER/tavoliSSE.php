<?php

echo json_encode($res);

require_once "./utils/Database.php";

    include './vendor/autoload.php';

    use Hhxsv5\SSE\SSE;
    use Hhxsv5\SSE\Update;

    set_time_limit(1200);

    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    header('Connection: keep-alive');
    header('X-Accel-Buffering: no');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

    (new SSE())->start(new Update(function () {
        // $data = [['id' => $id, 'title' => 'title ' . $id, 'content' => 'content ' . $id]]; // Get news from database or service.
        $data = DB::query("SELECT * FROM tavolo")->fetch_all(MYSQLI_ASSOC);
        var_dump($data);
        if (empty($data)) {
            return false; // Return false if no new messages
        } else return json_encode($data);
    }, 15), 'message', 5000);
    // StreamUpdate::updatePiatti();

?>