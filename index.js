const express = require('express');
const app = express();

const port = 3000;
const exphbs = require('express-handlebars');


// enable article parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// enable handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// enable module routeProduct
const productRoutes = require('./routes/product.route');
// enable module routeSupplier
const supplierRoutes = require('./routes/supplier.route');
// enable module routeCustomer
const customerRoutes = require('./routes/customer.route');
// enable module routeCategory
const categoryRoutes = require('./routes/category.route');
// enable module routeReceipt
const receiptRoutes = require('./routes/receipt.route');


app.get('/', (req,res)=> {
    res.render('home');
});

// Get all Products
app.use('/', productRoutes);

// Get all Suppliers
app.use('/', supplierRoutes);


// Get all Customers
app.use('/', customerRoutes);

// Get all Categories
app.use('/', categoryRoutes);

// Get all Receipts
app.use('/', receiptRoutes);


app.listen(port, console.log(`The server is running on port ${port}...`));




