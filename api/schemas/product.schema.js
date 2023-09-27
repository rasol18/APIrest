const Joi = require('joi');

//indicamos que el valor sera un string y la validacion sera uuid//
const id= Joi.string().uuid();
//indica que el valor sera un string con un minimo de 3 valores y maximo de 15//
const name = Joi.string().min(3).max(15);
//indica que el valor sera un numero entero con un valor minimo de 10//
const price = Joi.number().integer().min(10);
//indica que el valor sera una url//
const image = Joi.string().uri();

//envia un objeto con todos los campos que queremos para crear el producto//
const createProductSchema = Joi.object({
  //.update() significa que el campo es obligatorio//
  name: name.required(),
  price: price.required(),
  image: image.required()
});

//envia un objeto con todos los campos que queremos para actualizar el producto//
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image

})

//envia un objeto con el id del producto que queremos ver//
const getProductSchema = Joi.object({
  id: id.required(),
})

module.exports = {createProductSchema, updateProductSchema, getProductSchema}

