// Función para cargar y mostrar la lista de productos
function cargarProductos() {
    fetch('../json/productos.json')
      .then(response => response.json())
      .then(data => {
        const productosLista = document.getElementById('productos-lista');
        productosLista.innerHTML = '';
  
        data.forEach(producto => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${producto.nombre}
            <img src="../img/${producto.imagen}" alt="${producto.nombre}" width="100">
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
          `;
          productosLista.appendChild(li);
        });
      })
      .catch(error => console.error('Error al cargar productos:', error));
  }
  
  // Función para eliminar un producto por ID
  function eliminarProducto(id) {
    fetch('../php/admin_eliminar_producto.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(`Producto con ID ${id} eliminado correctamente.`);
          cargarProductos();
        } else {
          console.error(`Error al eliminar producto con ID '${id}': ${data.error}`);
        }
      })
      .catch(error => console.error('Error al eliminar producto:', error));
  }
  
  // Función para cargar y mostrar la lista de usuarios
  function cargarUsuarios() {
    fetch('../json/usuarios.json')
      .then(response => response.json())
      .then(data => {
        const usuariosLista = document.getElementById('usuarios-lista');
        usuariosLista.innerHTML = '';
  
        data.forEach(usuario => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${usuario.nombre}
            <button onclick="eliminarUsuario('${usuario.id}')">Eliminar</button>
          `;
          usuariosLista.appendChild(li);
        });
      })
      .catch(error => console.error('Error al cargar usuarios:', error));
  }
  
  // Función para eliminar un usuario por ID
  function eliminarUsuario(id) {
    // Confirmación del usuario
    if (confirm(`¿Estás seguro de que deseas eliminar este usuario con ID ${id}?`)) {
      // Realizar una solicitud fetch para enviar el ID del usuario al servidor PHP
      fetch('../php/admin_eliminar_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Eliminación exitosa, actualiza la interfaz de usuario
            console.log(`Usuario con ID ${id} eliminado correctamente.`);
            // Puedes implementar una función para recargar la lista de usuarios o actualizar la vista
            cargarUsuarios();
          } else {
            // Hubo un error al eliminar el usuario
            console.error(`Error al eliminar usuario con ID ${id}: ${data.error}`);
          }
        })
        .catch(error => console.error('Error al eliminar usuario:', error));
    }
  }
  
  // Función para volver a la página de inicio
  function volverAInicio() {
    // Agrega la lógica para volver a la página de inicio
    console.log('Volviendo a la página de inicio');
  }
  
  // Función para ver el perfil del usuario
  function verPerfil() {
    // Agrega la lógica para ver el perfil del usuario
    console.log('Viendo el perfil del usuario');
  }
  
  // Cargar las listas al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarUsuarios();
  });
  