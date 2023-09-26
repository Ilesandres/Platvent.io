function cargarProductos() {
    fetch('./json/productos.json') // Cambia la ruta al archivo JSON si es necesario
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('product-list');

            // Limpiar el contenido existente
            productContainer.innerHTML = '';

            // Recorrer la lista de productos y agregarlos al DOM
            data.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                // Construir la tarjeta del producto
                productCard.innerHTML = `
                    <img src="./img/${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <p>${producto.descripcion}</p>
                    <button class="show-product-btn">Ver Detalles</button>
                `;

                // Agregar evento de clic para mostrar solo el producto
                const showProductButton = productCard.querySelector('.show-product-btn');
                showProductButton.addEventListener('click', () => {
                    mostrarProducto(producto);
                });

                productContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

function mostrarProducto(producto) {
    const productContainer = document.getElementById('product-list');
    
    // Limpiar el contenido existente
    productContainer.innerHTML = '';

    // Crear la tarjeta del producto seleccionado
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Construir la tarjeta del producto
    productCard.innerHTML = `
        <button class="back-to-list-btn">Volver a la Lista</button>
        <img src="./img/${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>${producto.descripcion}</p>
        
    `;

    // Agregar evento de clic para volver a mostrar todos los productos
    const backButton = productCard.querySelector('.back-to-list-btn');
    backButton.addEventListener('click', () => {
        cargarProductos();
    });

    productContainer.appendChild(productCard);
}

// Llama a la función para cargar y mostrar productos cuando la página se carga
window.addEventListener('load', cargarProductos);
