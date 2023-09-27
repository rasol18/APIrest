const boom = require('@hapi/boom');
//esto es un middleware dinamico//
function validatorHandler (schema, property) {
  //retorna un middleware de forma dinamica//
  return(req, res, next) => {

    const data = req[property];
    //abortEarly indica que verifique todos los errores y los envie todos //
    const {error} =  schema.validate(data, {abortEarly:false});
    //si hay un error en la validacion responde con un badRequest, sino envia los datos al siguiente paso//
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
