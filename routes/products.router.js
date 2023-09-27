const express = require ('express');

const ProducsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema,getProductSchema} = require('../schemas/product.schema');

//exporta todas las rutas de los productos hacia este archivo//
const router = express.Router();
//crea una instancia del servicio porque es una clase//
const service = new ProducsService();

//crea la app//
const app = express();
//indica el puerto del servidor//
const port = 3000;


router.get('/', async (request, response) => {
  //busca en el objeto productService la funcion find y muestra todos los productos//
  const products = await service.find();
  //muestra por defecto como maximo 10 productos por defecto o el size maximo que le pongamos en la query//
  const {size} = request.query;

  //respondemos en formato json//
  response.json(products)
});

//este endpoint siempre tiene que ir antes de los endpoint dinamicos sino toma a filter como un :id//
router.get('/filter',async (request, response) => {
  response.send('yo soy un filtro')
})

//muestra un producto en especifico que se ha pedido//
//al poner : significa que lo siguiente es un parametro no un endpoint//
router.get('/:id',
  //valida los datos y si no hay error corre la funcion asyncrona//
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
  try {
  //recibe el id del parametro que vamos a responder//
  const {id} = request.params;
  //busca en el objeto productService la funcion findOne y muestra un producto en especifico//
  const product = await service.findOne(id);
  response.json(product);
  //si el id del producto es 999 lo marca como un error 404//
  //los querys siempre se envian como string por eso en el if va '999'//
  //if(id === '999'){
  //  response.status(404).json({
  //    message: 'producto no encontrado'
  //  })}
  } catch (error) {
    //manda el error a ser ejecutado por los middlewares//
    next(error);
  }
} )

//crea un producto nuevo//
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (request,response) => {
  //devuelve todo el body del post//
  const body = request.body;
  //envia la informacion del nuevo producto al productService//
  const newProduct = await service.create(body);
  //esta es la respuesta cuando un pedido post funciona bien//
  //el .status envia el codigo de estado de respuesta que tendrá la peticion//
  response.status(201).json(newProduct)
})

//edita un atributo de un producto//
router.patch('/:id',
//el primer middleware valida el id y luego le pasa la informacion al segundo//
  validatorHandler(getProductSchema, 'params'),
  //el segundo valida que la informacion en el body cumpla los parametros //
  validatorHandler(updateProductSchema, 'body'),
  async (request,response, next) => {
  try {
  //devuelve todo el body del post//
  const body = request.body;
  //recibe el id del producto a modificar//
  const {id} = request.params;
  //envia la informacion a modificar del producto al productService//
  const product = await service.update(id, body);
  //esta es la respuesta cuando un pedido post funciona bien//
  response.json(product)
}catch(error){
  next(error);
}

})

//elimina un producto//
router.delete('/:id', async (request,response) => {
  //recibe el id del producto a modificar//
  const {id} = request.params;
  //envia el id del producto a eliminar al productService//
  const respuesta = await service.delete(id);
  //esta es la respuesta cuando un pedido post funciona bien//
  response.json(respuesta)
})

//exporta el modulo//
module.exports = router;
