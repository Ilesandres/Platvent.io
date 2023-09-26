// Función para registrar un nuevo usuario
function registrarUsuario() {
    // Obtener los valores ingresados en el formulario
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const celular = document.getElementById('celular').value;
    const edad = document.getElementById('edad').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const direccion = document.getElementById('direccion').value;
    const departamento = document.getElementById('departamento').value;
    const municipio = document.getElementById('municipio').value;
    const contraseña = document.getElementById('contraseña').value;

    // Crear un objeto con los datos del usuario
    const nuevoUsuario = {
        tipoUsuario,
        email,
        nombre,
        celular,
        edad,
        fechaNacimiento,
        direccion,
        departamento,
        municipio,
        contraseña
    };

    // Realizar una solicitud para cargar los usuarios existentes desde el archivo JSON
    fetch('../json/usuarios.json')
        .then(response => response.json())
        .then(data => {
            // Agregar el nuevo usuario a la lista de usuarios
            data.push(nuevoUsuario);

            // Guardar la lista actualizada en el archivo JSON
            return fetch('../php/guardar_usuarios.php', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            // Redirigir al usuario a la página de inicio de sesión u otra página
            alert('Registro exitoso. Redirigiendo...');
            window.location.href = '../login/index.html';
        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
        });
}
