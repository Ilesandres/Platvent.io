document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    //obtener la tienda para luego mostrarlo
    const tienda=sessionStorage.getItem("usuario");

    const formData = new FormData(this);

    formData.append('tienda', tienda);

    fetch('../php/agregar_productos.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto agregado con éxito.');
            // redirigir al usuario a la página de inicio:
            window.location.href = '../index.html';
        } else {
            alert('Error al agregar el producto.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
