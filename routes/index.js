const productsRouter = require ('./products.router');
const categoriesRouter = require ('./categories.router');
const usersRouter = require ('./users.router');
const express = require ('express');


function routerApi (app) {
  //crea una ruta maestra//
  const router = express.Router();
  app.use('/api/V1', router)

  //crea la ruta de products//
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/prousersducts', usersRouter)
}

module.exports = routerApi;
