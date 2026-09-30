// Credenciales correctas (constantes)
const USUARIO_CORRECTO = "admin";
const CONTRASENA_CORRECTA = "1234";

// Elementos del login
const formulario = document.getElementById("form-login");
const campoUsuario = document.getElementById("usuario");
const campoContrasena = document.getElementById("contrasena");
const errorUsuario = document.getElementById("error-usuario");
const errorContrasena = document.getElementById("error-contrasena");
const enlaceOlvide = document.getElementById("enlace-olvide");
const mensajeRecuperacion = document.getElementById("mensaje-recuperacion");
const bienvenida = document.getElementById("bienvenida");
const nombreUsuario = document.getElementById("nombre-usuario");

const dialogo = document.getElementById("dialogo-recuperar");
const formularioRecuperar = document.getElementById("form-recuperar");
const campoCorreo = document.getElementById("correo");
const errorCorreo = document.getElementById("error-correo");


function mostrarMensaje(elemento, texto) {
  elemento.textContent = texto;
  elemento.classList.remove("oculto");
}

function ocultarMensaje(elemento) {
  elemento.textContent = "";
  elemento.classList.add("oculto");
}

function marcarCampo(campo) {
  campo.classList.add("campo-error");
  campo.setAttribute("aria-invalid", "true");
}

function desmarcarCampo(campo) {
  campo.classList.remove("campo-error");
  campo.removeAttribute("aria-invalid");
}

// Oculta todos los mensajes antes de cada validación para que no se acumulen
function limpiarErrores() {
  ocultarMensaje(errorUsuario);
  ocultarMensaje(errorContrasena);
  ocultarMensaje(mensajeRecuperacion);
  desmarcarCampo(campoUsuario);
  desmarcarCampo(campoContrasena);
}

// Formulario de login 

formulario.addEventListener("submit", (event) => {
  event.preventDefault(); // evita que la página se recargue

  limpiarErrores();

  const usuario = campoUsuario.value.trim();
  const contrasena = campoContrasena.value;
  const usuarioVacio = usuario === "";
  const contrasenaVacia = contrasena.trim() === "";

  // Campos vacíos 
  if (usuarioVacio) {
    mostrarMensaje(errorUsuario, "! ingresa tu cuenta de usuario");
    marcarCampo(campoUsuario);
  }
  if (contrasenaVacia) {
    mostrarMensaje(errorContrasena, "! ingresa tu contraseña");
    marcarCampo(campoContrasena);
  }
  if (usuarioVacio || contrasenaVacia) {
    return;
  }

  // Ninguno vacío, pero incorrectos
  if (usuario !== USUARIO_CORRECTO || contrasena !== CONTRASENA_CORRECTA) {
    mostrarMensaje(errorContrasena, "! usuario o contraseña incorrectos");
    return;
  }

  // Correctos, y mensaje de bienvenida
  nombreUsuario.textContent = usuario;
  formulario.classList.add("oculto");
  bienvenida.classList.remove("oculto");
  bienvenida.focus();
});

// Ocultar el mensaje de un campo cuando el usuario escribe

campoUsuario.addEventListener("input", () => {
  ocultarMensaje(errorUsuario);
  desmarcarCampo(campoUsuario);
});

campoContrasena.addEventListener("input", () => {
  ocultarMensaje(errorContrasena);
  desmarcarCampo(campoContrasena);
});

// Ventana recuperar contraseña

enlaceOlvide.addEventListener("click", (event) => {
  event.preventDefault();

  
  campoCorreo.value = "";
  ocultarMensaje(errorCorreo);
  desmarcarCampo(campoCorreo);

  dialogo.showModal();
});

formularioRecuperar.addEventListener("submit", (event) => {
  event.preventDefault();

  const correo = campoCorreo.value.trim();

  // Correo vacío o sin "@": mensaje de error
  if (correo === "" || !correo.includes("@")) {
    mostrarMensaje(errorCorreo, "! ingresa un correo electrónico válido");
    marcarCampo(campoCorreo);
    return;
  }

  // Correo válido
  ocultarMensaje(errorCorreo);
  desmarcarCampo(campoCorreo);
  dialogo.close();
  mostrarMensaje(mensajeRecuperacion, "Se envió el enlace a " + correo);
});

campoCorreo.addEventListener("input", () => {
  ocultarMensaje(errorCorreo);
  desmarcarCampo(campoCorreo);
});

//Cerrar ventana si se da clic fuera o con tecla Escape
dialogo.addEventListener("click", (event) => {
  if (event.target === dialogo) {
    dialogo.close();
  }
});
