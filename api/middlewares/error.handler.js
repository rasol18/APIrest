//muestra errores en el log//
function logErrors (err, req, res, next) {
  console.log('log Errors');
  console.log(err);
  //al tener un (err) significa que es un middleware de tipo error//
  next(err);
}

//crea un standar de formado cada vez que hay un error//
//no usa next porque esta es el que va a resolver el problema al final//
function errorHandler (err, req, res, next) {
  console.log('Error Handlers');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boombErrorHandler (err, req, res, next) {
  //cada vez que un error es generado por la libreria boom le crea un atributo isBoom//
  if(err.isBoom) {
    //obtiene toda la informacion del error//
    const {output} = err;
    //.statusCode devuelve el codigo de error y el .payload el error//
    res.status(output.statusCode).json(output.payload)
  }else {
    next(err);
  }
}

module.exports = {logErrors, errorHandler, boombErrorHandler}
