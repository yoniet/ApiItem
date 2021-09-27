const Product = require('../modules/product.module');
// const product = require('../modules/product.module');

class ProductService {
    static instance = null;

    _products = [];

    static getInstance() {
        if(ProductService.instance) {
            return ProductService.instance;
        }
        ProductService.instance = new ProductService();
        return ProductService.instance;
    }

    setProducts(dataProducts) {
        this._products = dataProducts;
    }

    getSize() {
        return this._products.length;
    }

    getProducts() {
        return this._products;
    }

    getSingleProduct(id) {
        return  this._products[id];
    }

    createProduct(id, catalogNumber, nameItem, supplier, price, description, category, quantity) {
        const newProduct = new Product(id, catalogNumber, nameItem, supplier, price, description, category, quantity);
        this._products.push(newProduct);
    }

    deleteProduct(Number) {
        this._products.splice(Number, 1);
    }

    updateProduct(id, newProduct) {
        const product = this._products.find((pro)=> {
            return pro.id === id;
        });
        Object.assign(product, newProduct);
        // return pro;
    }
}

module.exports = ProductService;