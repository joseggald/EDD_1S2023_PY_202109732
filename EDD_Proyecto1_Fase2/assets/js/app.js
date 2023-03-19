$(window).ready(function(){

    $('#login_form').on('submit', function(e){
        e.preventDefault();
                
    })
});
let alumnos = [];

function loginVerificar(){
    let user = $('#txtUsuario').val();
    let pass = $('#txtPassword').val();
    if(user === "admin" && pass === "admin"){         
        cambiar_pagina_admin();
    }else{
        alert("Usuario y contraseña incorrecta!");
    }
}

function cargarMasiva() {
    document.getElementById('contenedor_admin').hidden = true;
    document.getElementById('contenedor_cargamasiva').hidden = false;
}
  

function cambiar_pagina_admin(){
	document.getElementById('contenedor').hidden = true;
    document.getElementById('contenedor_admin').hidden = false;
}