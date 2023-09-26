<?php
// Ruta al archivo JSON de usuarios
$jsonFile = '../json/usuarios.json'; // Asegúrate de proporcionar la ruta correcta

// Leer el contenido del archivo JSON
$usuarios = json_decode(file_get_contents($jsonFile), true);

// Obtener el ID del usuario a eliminar de la solicitud POST
$id = isset($_POST['id']) ? $_POST['id'] : '';

if (!empty($id)) {
    // Buscar el usuario por ID en el array de usuarios
    $index = -1;
    foreach ($usuarios as $key => $usuario) {
        if ($usuario['id'] == $id) { // Usamos == en lugar de === para que coincida aunque los tipos sean diferentes
            $index = $key;
            break;
        }
    }

    // Si se encontró el usuario, eliminarlo
    if ($index !== -1) {
        array_splice($usuarios, $index, 1);

        // Guardar los cambios de nuevo en el archivo JSON
        file_put_contents($jsonFile, json_encode($usuarios));

        // Respuesta JSON exitosa
        echo json_encode(['success' => true]);
    } else {
        // Usuario no encontrado
        echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);
    }
} else {
    // ID no válido
    echo json_encode(['success' => false, 'error' => 'ID de usuario no válido']);
}
?>
