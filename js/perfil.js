// Función para cargar y mostrar datos desde datos.json
function cargarDatos() {
    // Obtener el usuario almacenado en sessionStorage
    const usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
        console.error('No se ha encontrado un usuario en sessionStorage.');
        return;
    }

    // Puedes utilizar una solicitud fetch para cargar datos desde datos.json
    fetch('../json/usuarios.json')
        .then(response => response.json())
        .then(data => {
            // Verificar si el usuario existe en el JSON
            const usuarioEncontrado = data.find(user => user.nombre === usuario);
            
            if(usuarioEncontrado.tipoUsuario=="vendedor"){
                document.getElementById("product").style.visibility = 'visible';
            }
            if(usuarioEncontrado.tipoUsuario=="admin"){
                document.getElementById("product").style.visibility = 'visible';
                document.getElementById("admin").style.visibility = 'visible';
            }

            if (usuarioEncontrado) {
                const datosContainer = document.getElementById('datos-container');
                datosContainer.innerHTML = '';
                // Iterar sobre los datos del usuario y crear elementos para mostrarlos
                for (const key in usuarioEncontrado) {
                    if (usuarioEncontrado.hasOwnProperty(key)) {
                        const dato = usuarioEncontrado[key];
                        const datoElement = document.createElement('div');
                        datoElement.className = 'dato';
                        datoElement.innerHTML = `<strong>${key}:</strong> ${dato}`;
                        datosContainer.appendChild(datoElement);
                    }
                }
            } else {
                console.error(`El usuario '${usuario}' no se encontró en los datos.`);
            }
            
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
}

// Función para obtener el nombre de la persona desde Session Storage y mostrarlo
function mostrarNombrePersona() {
    const nombrePersona = sessionStorage.getItem('usuario');
    if (nombrePersona) {
        document.getElementById('nombrePersona').textContent = nombrePersona;
    }
}

// Cargar datos y mostrar el nombre de la persona cuando la página se carga
window.onload = function () {
    cargarDatos();
    mostrarNombrePersona();
};


// cerrar cesion y eliminar sesionstorage 
function logout() {
    sessionStorage.clear();
    location.href = "../index.html";
}

