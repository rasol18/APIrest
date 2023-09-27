const express = require ('express');
const routerApi = require ('./routes');
const {logErrors, errorHandler, boombErrorHandler} = require('./middlewares/error.handler');
const cors = require('cors');
//crea la app//
const app = express();
//indica el puerto del servidor//
const port = 3000;
//crea un middleware
app.use(express.json());
//cors funciona como un middleware y asi se llama//
//selecciona los lugares desde donde se puede ingresar a la app//
const whitelist = ['http//localhost:8080', 'http//localhost:3000', 'https//myApp.com'];
//asi se envian las configuraciones de cors//
const options = {
  origin: (origin, cb) => {
    if ( whitelist.includes(origin)) {
      cb(null, true)
    }else {
      cb(new Error (' no permitir'))
    }
  }
}
app.use(cors());

//cuando se entre al servidor, este respondera con un hola mundo//
app.get('/', (request, response) => {
   response.send('hello world')
});

app.get('/nueva-ruta', (request, response) => {
  response.send('hhola este es un nuevo endpoint')
});

//trae el modulo correspondiente//
routerApi(app);

//trae los middlewares//
//el orden es importante porque indica cual se ejecutara primero//
app.use(logErrors);
app.use(boombErrorHandler);
app.use(errorHandler);

//devuelve un producto especifico que esta dentro de una categoria especifica//
app.get('/categorias/:categoriaId/productos/:productoId',(request, response) => {
  const {categoriaId, productoId} = request.params;

  response.json({
    categoriaId,
    productoId,
  })
})

//recibe querys y devuelve su valor//
app.get('/users',(request, response) => {
  const {limit, offset} = request.query;

  if(limit && offset) {
    response.json({
      limit,
      offset
    })
  }else {
    response.send('no hay querys')
  }
})

//indica al servidor en que puerto debe escuchar peticiones//
app.listen(port, () => {
  console.log('esta corriendo en el puerto ' + port)
})
