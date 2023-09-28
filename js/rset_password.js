document.getElementById('reset-password-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const celular = document.getElementById('celular').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    // Cargar los datos de usuarios desde usuarios.json
    fetch('../json/usuarios.json')
        .then(response => response.json())
        .then(data => {
            // Buscar un usuario con el email proporcionado
            const usuarioEncontrado = data.find(usuario => usuario.email === email);

            if (usuarioEncontrado) {
                // Comprobar si los demás datos coinciden
                if (
                    usuarioEncontrado.nombre === nombre &&
                    usuarioEncontrado.edad === edad &&
                    usuarioEncontrado.celular === celular &&
                    usuarioEncontrado.tipoUsuario === tipoUsuario
                ) {
                    // Todos los datos coinciden
                    alert('Datos coinciden con un usuario existente. Puedes restablecer la contraseña.');
                    // Todos los datos coinciden
                    const newPassword = prompt('Ingresa tu nueva contraseña:');

                    if (newPassword !== null) {

                        // Enviar la nueva contraseña a PHP para actualizar
                        fetch('../php/reset_password.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `email=${email}&newPassword=${newPassword}`,
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Contraseña restablecida correctamente.');
                            } else {
                                alert('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    } else {
                        alert('Operación cancelada.');
                    }
                } else {
                    // No coinciden todos los datos
                    alert('Los datos no coinciden con el usuario encontrado. Verifica la información.');
                }
            } else {
                // No se encontró un usuario con el email proporcionado
                alert('No se encontró un usuario con el email proporcionado. Verifica la dirección de correo.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


function inicio(){
    window.location.href="./index.html"
}