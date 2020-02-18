<?php
if($_POST){
  
     
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $cedula = $_POST['cedula'];
    $fechaNac = $_POST['fechaNac'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

  require_once 'conexion.php';

  class Usuario extends Conexion
{
    // A $database variable que contiene la conexion a la base de datos
    public function __construct()
    {
        parent::__construct();
    }

    public function registro_usuario($nombre, $apellido, $cedula, $fechaNac, $email, $telefono, $direccion, $pais){
        $crear = $this->buscarUsuario($cedula);
        if($crear){
            return false;

        } else {
           
            $query = "INSERT INTO `registro_usuario` (`nombre`, `apellido`, `cedula`, `fechaNac`, `email`, `telefono`, `direccion`, `pais`)
            values('$nombre', '$apellido', '$cedula', '$fechaNac', '$email', '$telefono', '$direccion', '$pais' )";    
            $ejecutar=($query);
            $consulta = $this->database->query($query);
            echo "<script> alert('Datos guardados'); <script>";
            if(!$consulta){
                return false;
            } 
           else {
              /*  $query = "INSERT INTO `registro_usuario` (`id_usuario`, `id_actividad`)  
                values('".$cedula."', '".$seminario."')";    
    
                $consulta = $this->database->query($query);
                if(!$consulta){
                    return false;
                }*/
                return true;
            }
        }
    }

    public function buscarUsuario($cedula){
        $query = "select * from `registro_usuario` where `cedula` LIKE '".$cedula."%'";
        $consulta = $this->database->query($query);

        if(!$consulta){
            return false;
        }
        return true;
    }
}
}
?>