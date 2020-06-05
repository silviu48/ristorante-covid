<?php
    class Database{
        private $connection;

        function __construct($host = "localhost", $username = "root", $psw = "", $db = "ristorante"){

            $this->connection = new mysqli($host, $username, $psw, $db);

        }

        function executeQuery($query, $args){
            $stmt = $this->connection->prepare($query);
            foreach($args as $value) $stmt->bind_param($value['type'], $value['value']);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all();
            $stmt->reset();
            return $result;
        }

        function __destruct()
        {

            mysqli_close($this->connection);

        }
    }
?>