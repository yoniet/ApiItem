const express = require('express');
const routeSupplier = express.Router();

// This data for supplier
const tempSupplier = require('../data/suppliers.json');
const aSupplier = JSON.stringify(tempSupplier);
const dataSupplier = JSON.parse(aSupplier);

// Get all Suppliers
routeSupplier.get('/supplier', (req, res)=> {
    res.render('allSupplier', {dataSupplier});
});

// Get page for edit supplier
routeSupplier.get('/supplier/edit/:id', (req, res)=> {
    var supplier = dataSupplier.filter(supplier => supplier.id === req.params.id);
    res.render('editSupplier', {
        id: supplier[0].id,
        name: supplier[0].name,
        address: supplier[0].address,
        mail: supplier[0].mail,
        phone: supplier[0].phone
    });
});

module.exports = routeSupplier;