const faker = require ('faker');
const boom = require('@hapi/boom');
class ProducsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  //genera productos y los envia al constructor products//
  async generate() {
    const limit = 100;
    for(let i=0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name : faker.commerce.productName(),
        price: parseInt (faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  //crea un nuevo producto//
  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      //concatena la informacion que recibimos del usuario para crear el producto//
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  //muestra los productos//
   find(){
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000 )
    })
  }

  findOne(id){
     const product = this.products.find(item => item.id === id);
     if(!product) {
      throw boom.notFound('producto no encontrado');
     }else if (product.isBlock) {
      throw boom.conflict('producto bloqueado');

     }else {
      return product;
     }
  }

  //actualiza los datos de un producto//
  async update(id, changes){
    //retorna la posicion donde esta el objeto//
    //si findIndex no encuentra el objeto devuelve -1//
    const index = this.products.findIndex(item => item.id === id);
    //si no se encuentra el objeto manda un error//
    if(index === -1) {
      //boom.notFound devuelve el error 404//
      throw boom.notFound('producto no encontrado');
    }else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes}
      return this.products[index];
    }
  }

  //elimina un producto//
  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('producto no encontrado');
    }else {
      //splice elimina un elemento a partir de la posicion index//
      this.products.splice(index,1);
      return {
        message : 'se ha eliminado el producto con id ' + id
      }
    }
  }
}

module.exports = ProducsService;
