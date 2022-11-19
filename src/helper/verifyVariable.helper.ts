export const verificarVariable = (valor: string): boolean => {
  let response = false;

  if (valor) {
    if (valor !== '') {
      response = true;
    }
  }

  return response;
};
