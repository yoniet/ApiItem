const Supplier = require('../modules/supplier.module');

class SupplierService {
    static instance = null;

    _suppliers = [];

    static getInstance() {
        if(SupplierService.instance) {
            return SupplierService.instance;
        }
        SupplierService.instance = new SupplierService();
        return SupplierService.instance;
    }

    getSuppliers() {
        return this._suppliers;
    }

    createSupplier(id, name, address, mail, phone) {
        const newSupplier = new Supplier(id, name, address, mail, phone);
        this._suppliers.push(newSupplier);
    }

    deleteSupplier(id) {
        let indexInArray = 0;
        this._suppliers.find((supp, index)=> {
            indexInArray = index;
            return supp.id === id;
        });
        this._suppliers.splice(indexInArray, 1);
    }

    updateSupplier(id, newSupplier) {
        const supplier = this._suppliers.find((supp)=> {
            return supp.id === id;
        });
        Object.assign(supp, newSupplier);
    }
}

module.exports = SupplierService;