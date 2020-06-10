<?php
    class Database{
        private $connection;

        function __construct($host = "localhost", $username = "root", $psw = "", $db = "ristorante"){

            $this->connection = new mysqli($host, $username, $psw, $db);

        }

        function startTransaction(){
            $this->connection->begin_transaction();
        }

        function newQuery($query){
            return $this->connection->prepare($query);
        }

        function executeQuery($stmt){
            $stmt->execute();
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            return $result;
        }

        function insertQuery($stmt){
            return $stmt->execute();
        }

        function commit(){
            return $this->connection->commit();
        }

        function __destruct()
        {

            mysqli_close($this->connection);

        }
    }
?>