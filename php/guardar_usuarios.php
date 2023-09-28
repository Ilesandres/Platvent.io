<?php
// Verificar si se recibieron datos del formulario por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Datos del formulario
    $tipoUsuario = $_POST['tipoUsuario'] ?? '';
    $email = $_POST['email'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $celular = $_POST['celular'] ?? '';
    $edad = $_POST['edad'] ?? '';
    $fechaNacimiento = $_POST['fechaNacimiento'] ?? '';
    $direccion = $_POST['direccion'] ?? '';
    $departamento = $_POST['departamento'] ?? '';
    $municipio = $_POST['municipio'] ?? '';
    $contraseña = $_POST['contraseña'] ?? '';

    // Validar que los campos obligatorios no estén vacíos
    if (!empty($email) && !empty($nombre) && !empty($celular) && !empty($edad) && !empty($fechaNacimiento) && !empty($direccion) && !empty($departamento) && !empty($municipio) && !empty($contraseña)) {
        // Cargar datos existentes desde el archivo JSON
        $archivoJSON = '../json/usuarios.json';
        $datosJson = file_get_contents($archivoJSON);

        // Decodificar el JSON a un array asociativo
        $usuarios = json_decode($datosJson, true);

        // Verificar si el correo electrónico ya existe
        $correoExistente = false;
        foreach ($usuarios as $usuario) {
            if ($usuario['email'] === $email) {
                $correoExistente = true;
                break;
            }
        }

        if (!$correoExistente) {
            // Generar un ID único basado en el tiempo actual
            $id = time();

            // Crear un nuevo objeto de usuario
            $nuevoUsuario = [
                'id' => $id,
                'tipoUsuario' => $tipoUsuario,
                'email' => $email,
                'nombre' => $nombre,
                'celular' => $celular,
                'edad' => $edad,
                'fechaNacimiento' => $fechaNacimiento,
                'direccion' => $direccion,
                'departamento' => $departamento,
                'municipio' => $municipio,
                'contraseña' => $contraseña
            ];

            // Agregar el nuevo usuario al array de usuarios
            $usuarios[] = $nuevoUsuario;

            // Convertir el array de usuarios de nuevo a JSON
            $nuevosDatosJson = json_encode($usuarios, JSON_PRETTY_PRINT);

            // Guardar los datos actualizados en el archivo JSON
            if (file_put_contents($archivoJSON, $nuevosDatosJson)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'El correo electrónico ya existe.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos obligatorios.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
?>
