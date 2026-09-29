// Datos correctos
const USUARIO_CORRECTO = "admin";
const CONTRASENA_CORRECTA = "1234";

document.addEventListener("DOMContentLoaded", () => {
  const campoUsuario = document.getElementById("usuario");
  const campoContrasena = document.getElementById("contrasena");
  const botonLogin = document.querySelector("#btn-login");

  // Quitar mensajes y estilos de error anteriores
  function limpiarErrores() {
    document.querySelectorAll(".error, .exito").forEach((mensaje) => mensaje.remove());

    document.querySelectorAll(".campo-error").forEach((campo) => {
      campo.classList.remove("campo-error");
      campo.removeAttribute("aria-invalid");
      campo.removeAttribute("aria-describedby");
    });
  }

  // Crear un mensaje de error 
  function crearMensaje(texto, clase) {
    const mensaje = document.createElement("div");
    mensaje.classList.add(clase);
    mensaje.setAttribute("role", "alert");
    mensaje.innerHTML = "<span aria-hidden='true'>⚠ </span>" + texto;
    return mensaje;
  }

  // Marcar un campo con borde rojo y mostrar su mensaje debajo
  function marcarCampo(campo, texto) {
    const mensaje = crearMensaje(texto, "error");
    mensaje.id = campo.id + "-error";

    campo.classList.add("campo-error");
    campo.setAttribute("aria-invalid", "true");
    campo.setAttribute("aria-describedby", mensaje.id);
    campo.insertAdjacentElement("afterend", mensaje);
  }

  botonLogin.addEventListener("click", () => {
    limpiarErrores();

    const usuario = campoUsuario.value.trim();
    const contrasena = campoContrasena.value.trim();

    // Caso 1: campos vacíos (si ambos están vacíos, salen los dos mensajes)
    if (usuario === "") {
      marcarCampo(campoUsuario, "Ingresa tu cuenta de usuario");
    }
    if (contrasena === "") {
      marcarCampo(campoContrasena, "Ingresa tu contraseña");
    }
    if (usuario === "" || contrasena === "") {
      return;
    }

    // Caso 2: datos que no coinciden
    if (usuario !== USUARIO_CORRECTO || contrasena !== CONTRASENA_CORRECTA) {
      campoUsuario.classList.add("campo-error");
      campoContrasena.classList.add("campo-error");

      const errorGeneral = crearMensaje("Usuario o contraseña incorrectos", "error");
      errorGeneral.classList.add("error-general");
      botonLogin.insertAdjacentElement("beforebegin", errorGeneral);
      return;
    }

    // Caso 3: datos correctos
    const exito = document.createElement("div");
    exito.classList.add("exito");
    exito.setAttribute("role", "status");
    exito.textContent = "¡Bienvenido(a), " + usuario + "!";
    botonLogin.insertAdjacentElement("beforebegin", exito);
  });
});
