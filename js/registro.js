document.getElementById('registro-formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('../php/guardar_usuarios.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registro exitoso. Serás redirigido al inicio de sesión.');
            // Redirigir al usuario a la página de inicio de sesión:
            window.location.href = '../login/index.html';
        } else {
            alert('Error en el registro. Por favor, verifica tus datos, puede que ya exista un usuario con tu email');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
