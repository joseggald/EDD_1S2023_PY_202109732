document.getElementById("btn_register").addEventListener("click", register);
document.getElementById("btn_login").addEventListener("click", login);

var contenedor_login_register= document.querySelector(".contenedor_login-register");
var formulario_login = document.querySelector(".formulario_login");
var formulario_register = document.querySelector(".formulario_register");
var caja_traseraLogin = document.querySelector(".caja_traseraLogin");
var caja_traseraRegister = document.querySelector(".caja_traseraRegister");

function login(){
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "10px";
    formulario_login.style.display = "block";
    caja_traseraRegister.style.opacity = "1";
    caja_traseraLogin.style.opacity = "0";
}

function register(){
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_traseraRegister.style.opacity = "0";
    caja_traseraLogin.style.opacity = "1";
}
 
