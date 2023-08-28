<?php

class Database {
    private $host = 'localhost';
    private $db_name = 'nazwa_twojej_bazy';
    private $username = 'twoj_uzytkownik';
    private $password = 'twoje_haslo';
    private $conn;

    public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
} 

class User {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($email) {
        $query = 'SELECT * FROM users WHERE email = :email';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return "Nie można zarejestrować konta ponieważ email jest w bazie.";
        } else {
           
            return "Konto zostało utworzone.";
        }
    }
}

$database = new Database();
$db = $database->connect();

$user = new User($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    $response = $user->register($email);
    echo $response;
}

?>