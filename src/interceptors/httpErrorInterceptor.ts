import { Routes } from "../utilities/routes";

export default function httpErrorInterceptor(error: any, type: string): string {
  let erroMsg = 'Se produjo un error';
  const code = error.response.status;

  switch (type) {
    case Routes.auth.login:
      switch(code) {
        case 400:
        case 401:
          erroMsg = 'Contraseña y/o email incorrectos';
          break;
      }
      break;
    case Routes.auth.profile:
      switch(code) {
        case 409:
          erroMsg = 'Este usuario ya tiene un perfil creado';
          break;
      }
      break;
    case Routes.auth.register:
      switch(code) {
        case 422:
          erroMsg = 'Número de documento inválido';
          break;
        case 409:
          erroMsg = 'Este email ya ha sido registrado';
          break;
        case 403:
          erroMsg = 'Este número de documento ya ha sido registrado';
          break;
      }
      break;
    case Routes.auth.sendCode:
      switch(code) {
        case 403:
          erroMsg = 'Completa tu perfil antes de verificar tu cuenta';
          break;
        case 409:
          erroMsg = 'Genera el código nuevamente';
          break;
        case 410:
          erroMsg = 'Este usuario ya está verificado';
          break;
      }
      break;
    case Routes.auth.validateCode:
      switch(code) {
        case 400:
          erroMsg = 'Genera un código de validación primero';
          break;
        case 410:
          erroMsg = 'El código ha expirado, genera otro nuevamente';
          break;
        case 401:
          erroMsg = 'El código ingresado es incorrecto';
          break;
      }
      break;
    case '': // No mostrar mensaje
      erroMsg = '';
      break;
    default:
      break;
  }
  return erroMsg;
}