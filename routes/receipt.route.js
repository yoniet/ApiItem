const express = require('express');
const routeReceipt = express.Router();

// Require services for receipt
const service = require('../services/receipt.service');
const serviceReceipt = service.getInstance();

// This data for receipts
const tempReceipt = require('../data/receipts.json');
const aReceipt = JSON.stringify(tempReceipt);
const dataReceipt = JSON.parse(aReceipt);

// Module service for receipt
serviceReceipt.setReceipts(dataReceipt);

const fs = require('fs');
const path = require('path');

routeReceipt.use(express.json());
routeReceipt.use(express.urlencoded({ extended: false }));

// Function helper WriteJson
function writeJson() {
    var temp = JSON.stringify(serviceReceipt.getReceipts());
    fs.writeFile(
        path.join(__dirname, '..', '/data/receipts.json'), temp, err=>{
            if(err){
                console.log(err);
            }
        }
    );
}

// Get all Receipts
routeReceipt.get('/receipt', (req, res)=> {
    const receipt = serviceReceipt.getReceipts();
    res.render('allReceipts', {receipt});
});

// Get page for edit receipt
routeReceipt.get('/receipt/edit/:id', (req, res)=> {
    var receipt = dataReceipt.filter(receipt => receipt.id === req.params.id);
    res.render('editReceipt', {
        id: receipt[0].id,
        numberReceipt: receipt[0].numberReceipt,
        purchaseDate: receipt[0].purchaseDate,
        purchaseTime: receipt[0].purchaseTime,
        idCustomer: receipt[0].idCustomer,
        nameCustomer: receipt[0].nameCustomer
    });
    return receipt;
});

// Update receipt
routeReceipt.post('/receipt/edit/:id', (req, res)=> {
    let num = req.params.id;
    var {numberReceipt, purchaseDate, purchaseTime, idCustomer, nameCustomer } = req.body;
    const newReceipt = {
        numberReceipt,
        purchaseDate,
        purchaseTime,
        idCustomer,
        nameCustomer,
    };
    serviceReceipt.updateReceipt(num, newReceipt);
    writeJson();
    res.redirect('/receipt')
});

// Create new receipt
routeReceipt.get('/receipt/add', (req, res)=> {
    res.render('addReceipt');
});

routeReceipt.post('/receipt/add', (req, res)=> {
    let size = serviceReceipt.getSize() + 1
    let id = String(size);
    var {numberReceipt, purchaseDate, purchaseTime, idCustomer, nameCustomer} = req.body;
    serviceReceipt.createReceipt(id, numberReceipt, purchaseDate, purchaseTime, idCustomer, nameCustomer);
    writeJson();
    res.redirect('/receipt');
});

// Delete receipt
routeReceipt.post('/receipt/delete/:id', (req, res)=> {
    let Number = req.params.id;
    serviceReceipt.deleteReceipt(Number - 1);
    writeJson();
    res.redirect('/receipt');
});

module.exports = routeReceipt;