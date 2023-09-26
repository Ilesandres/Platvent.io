<?php

// Simula una base de datos en formato JSON
$data = '{
    "usuarios": [
        {"nombre": "Usuario 1"},
        {"nombre": "Usuario 2"},
        {"nombre": "Usuario 3"}
    ],
    "productos": [
        {"nombre": "Producto 1", "imagen": "imagen1.jpg"},
        {"nombre": "Producto 2", "imagen": "imagen2.jpg"},
        {"nombre": "Producto 3", "imagen": "imagen3.jpg"}
    ]
}';

// Devuelve los datos como JSON
header('Content-Type: application/json');
echo $data;

?>
