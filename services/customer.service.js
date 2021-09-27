const Customer = require('../modules/customer.module');

class CustomerService {
    static instance = null;

    _customers = [];

    static getInstance() {
        if(CustomerService.instance) {
            return CustomerService.instance;
        }
        CustomerService.instance = new CustomerService();
        return CustomerService.instance;
    }

    getSingleProduct(id) {
        return  this._customers[id];
    }

    setCustomers(dataCustomer) {
        this._customers = dataCustomer;
    }

    getSize() {
        return this._customers.length;
    }

    getCustomers() {
        return this._customers;
    }

    createCustomer(id, identify, firstName, lastName, mail, address, phone, receipt) {
        const newCustomer = new Customer(id, identify, firstName, lastName, mail, address, phone, receipt);
        this._customers.push(newCustomer);
    }

    deleteCustomer(Number) {
        this._customers.splice(Number, 1);
    }

    updateCustomer(num, newCustomer) {
        const customer = this._customers.find((cus)=> {
            return cus.id === num;
        });
        Object.assign(customer, newCustomer);
    }
}

module.exports = CustomerService;