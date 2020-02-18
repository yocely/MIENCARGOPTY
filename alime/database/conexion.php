<?php

require_once 'config.php';
$conectar = new msqli('localhost', 'root','', 'miencargopty');
// localhost es el nombre del servidor, root es el usuario para acceder al servidor, el '' es la contraseña miencargopty es la base de datos.
class Conexion
{
    protected $database;
    public function __construct()
    {
        $this->database = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if ($this->database->connect_errno) {
            echo "Fallo al conectar la base de datos" . $this->database->connect_errno;
        }
    }
}
?>