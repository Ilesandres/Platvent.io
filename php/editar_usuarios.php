<?php
// Verificar si se recibieron datos del formulario por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $edad = $_POST['edad'] ?? '';
    $celular = $_POST['celular'] ?? '';

    // Validar que al menos uno de los campos se haya proporcionado
    if (!empty($nombre) || !empty($email) || !empty($edad) || !empty($celular)) {
        // Cargar datos existentes desde el archivo JSON
        $archivoJSON = '../json/usuarios.json';
        $datosJson = file_get_contents($archivoJSON);

        // Decodificar el JSON a un array asociativo
        $usuarios = json_decode($datosJson, true);

        // Buscar al usuario por su nombre (clave primaria)
        $index = array_search($nombre, array_column($usuarios, 'nombre'));

        if ($index !== false) {
            // Actualizar los campos del usuario
            if (!empty($email)) {
                $usuarios[$index]['email'] = $email;
            }
            if (!empty($edad)) {
                $usuarios[$index]['edad'] = $edad;
            }
            if (!empty($celular)) {
                $usuarios[$index]['celular'] = $celular;
            }

            // Convertir el array de usuarios de nuevo a JSON
            $nuevosDatosJson = json_encode($usuarios, JSON_PRETTY_PRINT);

            // Guardar los datos actualizados en el archivo JSON
            if (file_put_contents($archivoJSON, $nuevosDatosJson)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'El usuario no fue encontrado en usuarios.json.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Por favor, proporciona al menos un campo para actualizar.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
?>
