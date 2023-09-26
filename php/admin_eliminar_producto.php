<?php
// Obtén los datos del producto a eliminar enviados mediante una solicitud POST
$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $producto_a_eliminar = $data->nombre;

    // Agrega aquí la lógica para eliminar el producto en tu base de datos o archivo JSON
    // Por ejemplo, si los productos están almacenados en un archivo JSON:
    $productos = json_decode(file_get_contents("../json/productos.json"), true);
    foreach ($productos as $key => $producto) {
        if ($producto["nombre"] === $producto_a_eliminar) {
            unset($productos[$key]);
            file_put_contents("../json/productos.json", json_encode(array_values($productos)));
            echo json_encode(["message" => "Producto eliminado exitosamente"]);
            exit;
        }
    }
}

// Si no se pudo eliminar el producto, muestra un mensaje de error
http_response_code(400);
echo json_encode(["message" => "No se pudo eliminar el producto"]);
?>
