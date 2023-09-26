<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST["nombre"];
    $descripcion = $_POST["descripcion"];
    $valor = $_POST["valor"];
    
    // Subir la imagen y obtener el nombre de archivo
    $imagen = $_FILES["imagen"];
    $imagenNombre = $imagen["name"];
    $imagenTmpName = $imagen["tmp_name"];
    
    $rutaImagen = "../img/" . $imagenNombre;
    
    if (move_uploaded_file($imagenTmpName, $rutaImagen)) {
        // Cargar los productos existentes desde el archivo JSON
        $productosJSON = file_get_contents("../json/productos.json");
        $productosArray = json_decode($productosJSON, true);
        
        // Generar un nuevo ID para el producto
        $nuevoID = uniqid();

        // Crear un nuevo producto
        $nuevoProducto = [
            "id" => $nuevoID,
            "nombre" => $nombre,
            "descripcion" => $descripcion,
            "precio" => $valor,
            "imagen" => $imagenNombre
        ];
        
        // Agregar el nuevo producto al array de productos
        $productosArray[] = $nuevoProducto;

        // Codificar el array de productos a JSON
        $productosJSON = json_encode($productosArray, JSON_PRETTY_PRINT);
        
        // Guardar los productos actualizados en el archivo JSON
        file_put_contents("../json/productos.json", $productosJSON);
        
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}
?>
