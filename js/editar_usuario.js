document.addEventListener('DOMContentLoaded', function () {
    const nombrePersona = document.getElementById('nombrePersona');
    const editarForm = document.getElementById('editar-form');

    // Obtener el nombre de usuario almacenado en sessionStorage
    let nombreUsuarioSession = sessionStorage.getItem('usuario');

    // Verificar si se almacenó un nombre de usuario en sessionStorage
    if (nombreUsuarioSession) {
        nombrePersona.textContent = nombreUsuarioSession;

        // Llenar los campos del formulario con los datos actuales del usuario
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const edadInput = document.getElementById('edad');
        const celularInput = document.getElementById('celular');

        // Agregar evento de envío del formulario
        editarForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener los valores editados del formulario
            const nuevoNombre = nombreInput.value;
            const nuevoEmail = emailInput.value;
            const nuevaEdad = edadInput.value;
            const nuevoCelular = celularInput.value;

            // Cargar usuarios desde usuarios.json 
            fetch('../json/usuarios.json') // Reemplaza con la ruta correcta
                .then(response => response.json())
                .then(data => {
                    // Buscar un usuario con el mismo nombre
                    const usuarioEncontrado = data.find(usuario => usuario.nombre === nombreUsuarioSession);

                    if (usuarioEncontrado) {
                        // Actualizar el nombre del usuario en sessionStorage
                        nombreUsuarioSession = nuevoNombre;

                        // Actualizar el nombre en la página
                        nombrePersona.textContent = nuevoNombre;

                        // Enviar los nuevos datos al servidor (PHP) para actualizar la información del usuario
                        fetch('../php/editar_usuarios.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nombre: nuevoNombre,
                                email: nuevoEmail,
                                edad: nuevaEdad,
                                celular: nuevoCelular
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                // Los datos se actualizaron con éxito en usuarios.json
                                alert('Los cambios se guardaron correctamente.');
                                sessionStorage.setItem('usuario', nuevoNombre); // Cambiado de 'nombreUsuario' a 'usuario'

                            } else {
                                // Hubo un error al guardar los cambios
                                alert('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    } else {
                        alert('Usuario no encontrado en usuarios.json.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});
