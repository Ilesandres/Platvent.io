<?php
// Verificar si se ha recibido el nombre del usuario a eliminar
if (isset($_POST['nombre'])) {
    $nombreUsuario = $_POST['nombre'];

    // Leer el contenido actual del archivo usuarios.json
    $usuariosJSON = file_get_contents('./json/usuarios.json');
    $usuarios = json_decode($usuariosJSON, true);

    // Buscar el usuario en el arreglo y eliminarlo
    foreach ($usuarios as $key => $usuario) {
        if ($usuario['nombre'] === $nombreUsuario) {
            unset($usuarios[$key]);
            break; // Terminar el bucle una vez que se haya encontrado y eliminado el usuario
        }
    }

    // Guardar el arreglo actualizado en usuarios.json
    file_put_contents('./json/usuarios.json', json_encode(array_values($usuarios)));

    // Respuesta de éxito
    echo json_encode(['success' => true, 'message' => 'Usuario eliminado con éxito']);
} else {
    // Respuesta de error si no se proporciona el nombre del usuario
    echo json_encode(['success' => false, 'message' => 'No se proporcionó el nombre del usuario']);
}
?>
