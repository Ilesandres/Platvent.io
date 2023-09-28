<?php
// Verificar si se recibieron datos del formulario por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Datos del formulario
    $email = $_POST['email'] ?? '';
    $newPassword = $_POST['newPassword'] ?? '';

    if (!empty($email) && !empty($newPassword)) {
        // Cargar datos existentes desde el archivo JSON
        $archivoJSON = '../json/usuarios.json';
        $datosJson = file_get_contents($archivoJSON);

        // Decodificar el JSON a un array asociativo
        $usuarios = json_decode($datosJson, true);

        // Buscar al usuario por su email
        $index = array_search($email, array_column($usuarios, 'email'));

        if ($index !== false) {
            // Actualizar la contraseña del usuario
            $usuarios[$index]['contraseña'] = $newPassword;

            // Convertir el array de usuarios de nuevo a JSON
            $nuevosDatosJson = json_encode($usuarios, JSON_PRETTY_PRINT);

            // Guardar los datos actualizados en el archivo JSON
            if (file_put_contents($archivoJSON, $nuevosDatosJson)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'El email proporcionado no coincide con ningún usuario.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos obligatorios.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
?>
