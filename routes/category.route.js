const express = require('express');
const routeCategory = express.Router();

// Require service for category
const service = require('../services/category.service');
const serviceCategory = service.getInstance();

// This data for category
const tempCategory = require('../data/categories.json');
const aCategory = JSON.stringify(tempCategory);
const dataCategory = JSON.parse(aCategory);

// Module service for category
serviceCategory.setCategories(dataCategory);

const fs = require('fs');
const path = require('path');

routeCategory.use(express.json());
routeCategory.use(express.urlencoded({ extended: false }));

// Function helper WriteJson
function writeJson() {
    var temp = JSON.stringify(serviceCategory.getCategories());
    fs.writeFile(
        path.join(__dirname, '..', '/data/categories.json'), temp, err=>{
            if(err){
                console.log(err);
            }
        }
    );
};

// Get all categories
routeCategory.get('/category', (req, res)=> {
    const category = serviceCategory.getCategories();
    res.render('allCategories', {category});
});

// Get page for edit category
routeCategory.get('/category/edit/:id', (req, res)=> {
    var category = dataCategory.filter(category => category.id === req.params.id);
    res.render('editCategory', {
        id: category[0].id,
        numberCategory: category[0].numberCategory,
        name: category[0].name
    });
});

// Update category
routeCategory.post('/category/edit/:id', (req, res)=> {
    let num = req.params.id;
    var {id, numberCategory, name} = req.body;
    const newCategory = {
        id,
        numberCategory,
        name
    };
    serviceCategory.updateCategory(num, newCategory);
    writeJson();
    res.redirect('/category')
});

// Create new category
routeCategory.get('/category/add', (req, res)=> {
    res.render('addCategory');
});

routeCategory.post('/category/add', (req, res)=> {
    let size = serviceCategory.getSize() + 1;
    let id = String(size);
    var {numberCategory, name} = req.body;
    serviceCategory.createCategory(id, numberCategory, name);
    writeJson();
    res.redirect('/category');
});

// Delete category
routeCategory.post('/category/delete/:id', (req, res)=> {
    let Number = req.params.id;
    serviceCategory.deleteCategory(Number - 1);
    writeJson();
    res.redirect('/category');
});


module.exports = routeCategory;