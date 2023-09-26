
//valida si ya hay un inicio de sesion
if(sessionStorage.getItem('usuario')!==null){
    location.href="../perfil/cliente.html";
}

// Función para realizar el inicio de sesión
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realizar una solicitud para cargar los usuarios desde el archivo JSON
    fetch('../json/usuarios.json')
        .then(response => response.json())
        .then(data => {
            // Verificar las credenciales del usuario
            const usuarioEncontrado = data.find(user => user.email === email && user.contraseña === password);

            if (usuarioEncontrado) {
                alert('Inicio de sesión exitoso. Redirigiendo...');
                // Guardar el nombre de usuario en sesión
                const username = usuarioEncontrado.nombre;
                guardarUsuarioEnSesion(username);

                // Redirigir al usuario a la página principal o a donde desees
                window.location.href = '../perfil/cliente.html';
            } else {
                alert('Credenciales incorrectas. Por favor, inténtalo nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
        });
}

function guardarUsuarioEnSesion(username) {
    sessionStorage.setItem('usuario', username);
}


// Obtener nombre de usuario de sessionStorage
function obtenerUsuarioDeSesion() {
    return sessionStorage.getItem('usuario');
}

// Eliminar nombre de usuario de sessionStorage
function eliminarUsuarioDeSesion() {
    sessionStorage.removeItem('usuario');
}

function logout() {
    sessionStorage.clear();
    document.getElementById("btn-mostrar").style.visibility = 'hidden';
    document.getElementById("cerrarses").innerHTML = "Inicio";
    location.href = "index.html";
}

function usuario() {
    console.log(sessionStorage.getItem('usuario'));
}

// Si deseas mostrar el nombre de usuario en algún elemento HTML, puedes usar la siguiente función
function mostrarUsuarioEnHTML() {
    const username = obtenerUsuarioDeSesion();
    if (username) {
        document.getElementById("usuario2").innerHTML = "Usuario: " + username;
    }
}
