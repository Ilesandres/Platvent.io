<?php
// Obtener el ID del producto a eliminar desde la solicitud POST
$input = file_get_contents('php://input');
$data = json_decode($input);

if (!empty($data->id)) {
  $id = $data->id;

  // Cargar el archivo JSON de productos
  $productosJSON = file_get_contents('../json/productos.json');
  $productos = json_decode($productosJSON, true);

  // Buscar el producto por ID y eliminarlo
  $indice = null;
  foreach ($productos as $key => $producto) {
    if ($producto['id'] === $id) {
      $indice = $key;
      break;
    }
  }

  if ($indice !== null) {
    // Obtener el nombre de la imagen asociada al producto
    $nombreImagen = $productos[$indice]['imagen'];

    // Eliminar la imagen del sistema de archivos
    $rutaImagen = '../img/' . $nombreImagen;
    if (file_exists($rutaImagen)) {
      unlink($rutaImagen);
    }

    // Eliminar el producto del array
    array_splice($productos, $indice, 1);

    // Guardar la lista actualizada de productos en el archivo productos.json
    file_put_contents('../json/productos.json', json_encode($productos, JSON_PRETTY_PRINT));

    // Enviar una respuesta de éxito
    $response = ['success' => true];
    echo json_encode($response);
  } else {
    // Enviar una respuesta de error si no se encontró el producto
    $response = ['success' => false, 'error' => 'Producto no encontrado'];
    echo json_encode($response);
  }
} else {
  // Enviar una respuesta de error si no se proporcionó un ID válido
  $response = ['success' => false, 'error' => 'ID de producto no válido'];
  echo json_encode($response);
}
?>
