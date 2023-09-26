// admin.js

// Función para cargar y mostrar la lista de productos
function cargarProductos() {
    fetch('../json/productos.json') // Cambia la ruta al archivo JSON si es necesario
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiar la lista existente
            
            data.forEach(producto => {
                const productItem = document.createElement('li');

                // Crear un contenedor para mostrar información del producto
                const productInfo = document.createElement('div');
                productInfo.classList.add('info-container');

                // Mostrar imagen del producto
                const productImage = document.createElement('img');
                productImage.src = "../img/" + producto.imagen;
                productInfo.appendChild(productImage);

                // Mostrar nombre del producto
                const productName = document.createElement('span');
                productName.textContent = producto.nombre;
                productInfo.appendChild(productName);

                // Agregar un botón para eliminar el producto
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    eliminarProducto(producto.nombre);
                });
                productInfo.appendChild(deleteButton);

                productItem.appendChild(productInfo);
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de productos:', error);
        });
}

// Función para cargar y mostrar la lista de usuarios
function cargarUsuarios() {
    fetch('../json/usuarios.json') // Cambia la ruta al archivo JSON si es necesario
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = ''; // Limpiar la lista existente
            
            data.forEach(usuario => {
                const userItem = document.createElement('li');

                // Crear un contenedor para mostrar información del usuario
                const userInfo = document.createElement('div');
                userInfo.classList.add('info-container');

                // Mostrar nombre del usuario
                const userName = document.createElement('span');
                userName.textContent = usuario.nombre;
                userInfo.appendChild(userName);

                // Agregar un botón para eliminar el usuario
                

                userItem.appendChild(userInfo);
                userList.appendChild(userItem);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de usuarios:', error);
        });
}

// Función para eliminar usuarios (debe implementarse según tus necesidades)
function eliminarUsuario(nombreUsuario) {
    // Agrega aquí la lógica para eliminar usuarios
    
    
}

// Función para eliminar productos (debe implementarse según tus necesidades)
const deleteButton = document.getElementById('delete-user-btn');
deleteButton.addEventListener('click', () => {
    const userNameInput = document.getElementById('user-name');
    const nombreUsuario = userNameInput.value.trim(); // Obtener el nombre del usuario ingresado

    if (nombreUsuario === '') {
        // Manejar el caso en que el campo esté vacío
        console.log('Por favor, ingrese un nombre de usuario válido.');
        return;
    }

    // Llamar a la función eliminarUsuario con el nombre del usuario ingresado
    eliminarUsuario(nombreUsuario);

    // Limpiar el campo de entrada después de eliminar
    userNameInput.value = '';
});
// Cargar las listas de productos y usuarios cuando la página se carga
window.addEventListener('load', () => {
    cargarProductos();
    cargarUsuarios();
});

// Manejar clic en el botón de cerrar sesión
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', () => {
    // Agrega aquí la lógica para cerrar sesión
    console.log('Cerrar sesión');
});
