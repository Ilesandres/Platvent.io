<?php
// Obtén los datos JSON enviados en el cuerpo de la solicitud
$jsonData = file_get_contents('php://input');

// Decodifica los datos JSON en un array asociativo de PHP
$data = json_decode($jsonData, true);

// Ruta al archivo JSON donde se guardarán los datos
$archivoJSON = '../json/usuarios.json';

// Abre o crea el archivo JSON para escritura
$file = fopen($archivoJSON, 'w');

if ($file) {
    // Convierte el array asociativo de PHP nuevamente a formato JSON
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    // Escribe los datos JSON en el archivo
    fwrite($file, $jsonData);

    // Cierra el archivo
    fclose($file);

    // Responde con un mensaje de éxito
    echo json_encode(['message' => 'Datos guardados correctamente']);
} else {
    // Responde con un mensaje de error en caso de que no se pueda abrir el archivo
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo guardar los datos']);
}
?>
