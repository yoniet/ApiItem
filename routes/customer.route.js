const express = require('express');
const routeCustomer = express.Router();

// Require services for customer
const service = require('../services/customer.service');
const serviceCustomer = service.getInstance();

// This data for customer
const tempCustomer = require('../data/customer.json');
const aCustomer = JSON.stringify(tempCustomer);
const dataCustomer = JSON.parse(aCustomer);

const fs = require('fs');
const path = require('path');

routeCustomer.use(express.json());
routeCustomer.use(express.urlencoded({ extended: false }));

// Module service for customer
serviceCustomer.setCustomers(dataCustomer);

// Function helper WriteJson
function writeJson() {
    var temp = JSON.stringify(serviceCustomer.getCustomers());
    fs.writeFile(
        path.join(__dirname, '..', '/data/customer.json'), temp, err=>{
            if(err){
                console.log(err);
            }
        }
    );
};

// Get all Customers
routeCustomer.get('/customer', (req, res)=> {
    const customers = serviceCustomer.getCustomers();
    res.render('allCustomer', {customers});
});

// Get page for edit customer
routeCustomer.get('/customer/edit/:id', (req, res)=> {
    var customer = dataCustomer.filter(customer => customer.id === req.params.id);
    res.render('editCustomer', {
        id: customer[0].id,
        identify: customer[0].identify,
        firstName: customer[0].firstName,
        lastName: customer[0].lastName,
        mail: customer[0].mail,
        address: customer[0].address,
        phone: customer[0].phone,
        receipt: customer[0].receipt
    });
    return customer;
});

// Update product
routeCustomer.post('/customer/edit/:id', (req, res)=> {
    let num = req.params.id;
    var {id, identify, firstName, lastName, mail, address, phone, receipt} = req.body;
    const newCustomer = {
        id,
        identify,
        firstName,
        lastName,
        mail,
        address,
        phone,
        receipt 
    };
    serviceCustomer.updateCustomer(num, newCustomer);
    writeJson();
    res.redirect('/customer')
});

// Create new Customer
routeCustomer.get('/customer/add', (req, res)=> {
    res.render('addCustomer');
});

routeCustomer.post('/customer/add', (req, res)=> {
    let size = serviceCustomer.getSize() + 1;
    let id = String(size);
    var {identify, firstName, lastName, mail, address, phone, receipt} = req.body;
    serviceCustomer.createCustomer(id, identify, firstName, lastName, mail, address, phone, receipt);
    writeJson();
    res.redirect('/customer');
});

// Delete customer
routeCustomer.post('/customer/delete/:id', (req, res)=> {
    let Number = req.params.id;
    serviceCustomer.deleteCustomer(Number - 1);
    writeJson();
    res.redirect('/customer');
});


module.exports = routeCustomer;