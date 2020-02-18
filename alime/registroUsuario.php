<?php


require_once '../database/usuario.php';


if(array_key_exists('registrar', $_POST)){
  
  $Usuario = new Usuario();

  $nombre = $_POST['nombre'];
  $apellido = $_POST['apellido'];
  $cedula = $_POST['cedula'];
  $fechaNac = $_POST['fechaNac'];
  $email = $_POST['email'];
  $telefono = $_POST['telefono'];
  $direccion = $_POST['direccion'];
  $pais = $_POST['pais'];

    $exito = $Usuario->registroUsuario($nombre, $apellido, $cedula, $fechaNac, $email, $telefono, $direccion, $pais);
    if($exito){
        print('Pronto recibirá un correo electrónico con su casillero virtual asignado.');
    }else{
      print('no se pudo crear usuario ya existe');
    }
}else{
     /* <a href="./registro.html">Registro</a> */
}
?>