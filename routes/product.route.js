const express = require('express');
const routeProduct = express.Router();

// Require services for products
const service = require('../services/product.service');
const serviceProducts = service.getInstance();

// This data for Products
const tempProduct = require('../data/products.json');
const aProduct = JSON.stringify(tempProduct);
const dataProduct = JSON.parse(aProduct);

// Module service for product
serviceProducts.setProducts(dataProduct);

// This data for supplier
const tempSupplier = require('../data/suppliers.json');
const aSupplier = JSON.stringify(tempSupplier);
const dataSupplier = JSON.parse(aSupplier);

// This data for categories
const tempCategory = require('../data/categories.json');
const aCategory = JSON.stringify(tempCategory);
const dataCategory = JSON.parse(aCategory);

const fs = require('fs');
const path = require('path');

routeProduct.use(express.json());
routeProduct.use(express.urlencoded({ extended: false }));

// Function helper WriteJson
function writeJson() {
    var temp = JSON.stringify(serviceProducts.getProducts());
    fs.writeFile(
        path.join(__dirname, '..', '/data/products.json'), temp, err=>{
            if(err){
                console.log(err);
            }
        }
    );
};

// Get all products
routeProduct.get('/product', (req,res)=> {
    const products = serviceProducts.getProducts();
    res.render('allItem', {products});
});

// Get page for edit product
routeProduct.get('/product/edit/:id', (req, res)=> {
    var product = dataProduct.filter(product => product.id === req.params.id);
    res.render('editItem',{
        id: product[0].id,
        catalogNumber: product[0].catalogNumber,
        nameItem: product[0].nameItem,
        supplier: product[0].supplier,
        price: product[0].price,
        description: product[0].description,
        category: product[0].category,
        quantity: product[0].quantity,
        dataCategory,
        dataSupplier
    });
    return product;
});

// Update product
routeProduct.post('/product/edit/:id', (req, res)=> {
    let num = req.params.id;
    var {id, catalogNumber, nameItem, supplier, category, price, description, quantity} = req.body;
    const newProduct = {
        id,
        catalogNumber,
        nameItem,
        supplier,
        category,
        price,
        description,
        quantity 
    };
    serviceProducts.updateProduct(num, newProduct);
    writeJson();
    res.redirect('/product')
});

// Create new product
routeProduct.get('/product/add', (req, res)=> {
    res.render('addItem', {dataSupplier, dataCategory});
});

routeProduct.post('/product/add', (req, res)=> {
    let size = serviceProducts.getSize() + 1;
    let id = String(size);
    var {catalogNumber, nameItem, supplier, price, description, category, quantity} = req.body;
    serviceProducts.createProduct(id, catalogNumber, nameItem, supplier, price, description, category, quantity);
    writeJson();
    res.redirect('/product');
});

// Delete product
routeProduct.post('/product/delete/:id', (req, res)=> {
    let Number = req.params.id;
    serviceProducts.deleteProduct(Number - 1);
    writeJson();
    res.redirect('/product');
});


module.exports = routeProduct;

