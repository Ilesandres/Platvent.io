document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);

    fetch('../php/agregar_productos.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto agregado con éxito.');
            // Puedes redirigir al usuario a otra página o realizar alguna otra acción
            // Por ejemplo, redirigir al usuario a la página de inicio:
            window.location.href = '../index.html';
        } else {
            alert('Error al agregar el producto.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
