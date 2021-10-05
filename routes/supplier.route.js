const express = require('express');
const routeSupplier = express.Router();

// Require services for supplier
const service = require('../services/supplier.service');
const serviceSupplier = service.getInstance();

// This data for supplier
const tempSupplier = require('../data/suppliers.json');
const aSupplier = JSON.stringify(tempSupplier);
const dataSupplier = JSON.parse(aSupplier);

// Module service for suppliers
serviceSupplier.setSuppliers(dataSupplier);

const fs = require('fs');
const path = require('path');
const { route } = require('./product.route');

// Function helper WriteJson
function writeJson() {
    var temp = JSON.stringify(serviceSupplier.getSuppliers());
    fs.writeFile(
        path.join(__dirname, '..', '/data/suppliers.json'), temp, err=>{
            if(err){
                console.log(err);
            }
        }
    );
}

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
    return supplier;
});

// Update supplier
routeSupplier.post('/supplier/edit/:id', (req ,res)=> {
    let num = req.params.id
    var {name, address, mail, phone} = req.body;
    const newSupplier = {
        name,
        address,
        mail,
        phone
    }
    serviceSupplier.updateSupplier(num, newSupplier);
    writeJson();
    res.redirect('/supplier');
})

// Create new supplier
routeSupplier.get('/supplier/add', (req, res)=> {
    res.render('addSupplier');
});

routeSupplier.post('/supplier/add', (req, res)=> {
    let size = serviceSupplier.getSize() + 1;
    let id = String(size);
    var {name, address, mail, phone} = req.body;
    serviceSupplier.createSupplier(id, name, address, mail, phone);
    writeJson()
    res.redirect('/supplier');
});

// Delete supplier
routeSupplier.post('/supplier/delete/:id', (req, res)=> {
    let number = req.params.id;
    serviceSupplier.deleteSupplier(number);
    writeJson();
    res.redirect('/supplier');
})
module.exports = routeSupplier;