/* Funciones  */

/* Validaciones de login , registro y perfil */
function isValidEmail(email) {
  return email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
}

function isValidName(name) {
  return name.match(/^[a-zA-Z\s]+$/);
}

function isValidAdress(adress) {
  return adress.match(/^[a-zA-Z\s]+$/);
}

function isValidFirst(username) {
  return username.match(/^[a-zA-Z\s]+$/);
}

function isValidNumber(input) {
  return input.match(/^[0-9]+$/);
}

/* Validaciones de Tecnicos */
/* Validacion de ingresar servicio */

function isValidNameService(nameService) {
  return nameService.match(/^[a-zA-Z\s]+$/);
}

function isValidCategories(categories) {
  return categories.match(/^[a-zA-Z\s]+$/);
}

function isValidDescription(description) {
  return description.match(/^[a-zA-Z\s]+$/);
}

/* Validacion de servicios aprobados */

function isValidInce_Parts(texto) {
  return texto.match(/^[a-zA-Z\s]+$/);
}

function isValidProf_Espec(texto1) {
  return texto1.match(/^[a-zA-Z\s]+$/);
}

function isValidAtt_Local(texto2) {
  return texto2.match(/^[a-zA-Z\s]+$/);
}

function isValidLocal_Name(texto3) {
  return texto3.match(/^[a-zA-Z\s]+$/);
}




/* Validaciones del login , registro y perfil */
/* Validacion del correo */

export const validateEmail = (email) => {
  let result = {
    result: false,
    message: "",
  };
  if (isValidEmail(email)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "El correo ingresado no es válido";
    return result;
  }
};

/* Validacion de numero convencional */
export const validatePhoneNumberConvencional = (phoneNumber) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(phoneNumber)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
  if (phoneNumber.startsWith("02")) {
    if (phoneNumber.length != 9) {
      result.result = false;
      result.message = "Debe ingresar 9 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "El número de celular convencional debe empezar con 02";
    return result;
  }
};

/* Validacion de numero celular */
export const validatePhoneNumber = (phoneNumber) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(phoneNumber)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
  if (phoneNumber.startsWith("09")) {
    if (phoneNumber.length != 10) {
      result.result = false;
      result.message = "Debe ingresar 10 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "El número de celular debe empezar con 09";
    return result;
  }
};

/* Validacion de la cedula */
export const validateDNI= (dni) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(dni)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
    if (dni.length != 10) {
      result.result = false;
      result.message = "Debe ingresar 10 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  
};

/* Validacion de username */
export const validateFirst = (username) => {
  let result = {
    result: false,
    message: "",
  };

  if (username.length < 5 || username.length > 20) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 20 caracteres";
    return result;
  }

  if (isValidFirst(username)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de nombre */
export const validateNames = (name) => {
  let result = {
    result: false,
    message: "",
  };
  if (name.length < 3 || name.length > 35) {
    result.result = false;
    result.message =
      "Debe contener mínimo 3 y máximo 35 caracteres";
    return result;
  }

  if (isValidName(name)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de fecha */
export const validateDate = (date) => {
  date = new Date(date);
  let result = {
    result: false,
    message: "",
  };
  let actualDate = new Date();

  if (
    actualDate.getFullYear() - date.getFullYear() < 16 ||
    actualDate.getFullYear() - date.getFullYear() > 90
  ) {
    result.result = false;
    result.message = "Debe tener una edad entre 16 y 90 años";
  } else {
    result.result = true;
    result.message = "¡Se ve bien!";
  }
  return result;
};

/* Validacion de direccion */
export const validatAdress = (adress) => {
  let result = {
    result: false,
    message: "",
  };
  if (adress.length < 5 || adress.length > 50) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 50 caracteres";
    return result;
  }

  if (isValidAdress(adress)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};


/* Validacion de contraseña */
export const validatePassword = (password) => {
  let result = {
    result: false,
    message: "",
  };

  let validate = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/gm;

  if (password.length < 5 || password.length > 10) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 10 caracteres";
    return result;
  }

  let resultValidation = validate.test(password);

  if (resultValidation) {
    result.result = true;
    result.message = "¡Se ve bien!";
  
  } else {
    result.result = false;
    result.message =
      "Debe contener un numero, letra mayusculas , minusculas , número y un caracter especial.";
  }

  return result;
};

/* Validacion de ingresar servicio */
/* Validacion de Nombre del servicio */
export const validateNamesService = (nameService) => {
  let result = {
    result: false,
    message: "",
  };
  if (nameService.length < 5 || nameService.length > 50) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 50 caracteres";
    return result;
  }

  if (isValidNameService(nameService)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de la categoria  */
export const validateCategories = (categories) => {
  let result = {
    result: false,
    message: "",
  };
  if (categories.length < 5 || categories.length > 50) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 50 caracteres";
    return result;
  }

  if (isValidCategories(categories)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de la descripcion  */
export const validateDescription = (description) => {
  let result = {
    result: false,
    message: "",
  };
  if (description.length < 5 || description.length > 300) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 300 caracteres";
    return result;
  }

  if (isValidDescription(description)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

export const validatePrice= (price) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(price)) {
   
  }
    if (price < 0) {
      result.result = false;
      result.message = "No puede tener un valor menor a  0";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  
};

/* Validacion de aprobar servicio */
/* Diagnostico , Incidentes y Partes*/
export const validateText = (texto) => {
  let result = {
    result: false,
    message: "",
  };
  if (texto.length < 5 || texto.length > 500) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 500 caracteres";
    return result;
  }

  if (isValidInce_Parts(texto)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Garantia */
export const validateWarranty = (texto) => {
  let result = {
    result: false,
    message: "",
  };
  if (texto.length < 5 || texto.length > 300) {
    result.result = false;
    result.message =
      "Debe contener mínimo 5 y máximo 300 caracteres";
    return result;
  }

  if (isValidInce_Parts(texto)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de solicitar una afiliación */

export const validateProf_Espec = (texto1) => {
  let result = {
    result: false,
    message: "",
  };
  if (texto1.length < 3 || texto1.length > 50) {
    result.result = false;
    result.message =
      "Debe contener mínimo 3 y máximo 50 caracteres";
    return result;
  }

  if (isValidProf_Espec(texto1)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

export const validateAtt_Local = (texto2) => {
  let result = {
    result: false,
    message: "",
  };
  if (texto2.length > 300) {
    result.result = false;
    result.message =
      "Debe contener máximo 300 caracteres";
    return result;
  }

  if (isValidAtt_Local(texto2)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

export const validateLocalName = (texto3) => {
  let result = {
    result: false,
    message: "",
  };
  if (texto3.length > 50) {
    result.result = false;
    result.message =
      "Debe contener máximo 50 caracteres";
    return result;
  }

  if (isValidLocal_Name(texto3)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

export const validateAcount = (phoneNumber) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(phoneNumber)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
    if (phoneNumber.length != 10) {
      result.result = false;
      result.message = "Debe ingresar 10 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
 
};



