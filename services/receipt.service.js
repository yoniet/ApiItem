const Receipt = require('../modules/receipt.module');

class ReceiptService {
    static instance = null;

    _receipts = [];

    static getInstance() {
        if(ReceiptService.instance) {
            return ReceiptService.instance;
        }
        ReceiptService.instance = new ReceiptService();
        return ReceiptService.instance;
    }

    getSingleReceipt(id) {
        return  this._receipts[id];
    }

    setReceipts(dataReceipts) {
        this._receipts = dataReceipts;
    }

    getSize() {
        return this._receipts.length;
    }

    getReceipts() {
        return this._receipts;
    }

    createReceipt(id, numberReceipt, purchaseDate, purchaseTime, idCustomer, nameCustomer) {
        const newReceipt = new Receipt(id, numberReceipt, purchaseDate, purchaseTime, idCustomer, nameCustomer);
        this._receipts.push(newReceipt);
    }

    deleteReceipt(Number) {
        this._receipts.splice(Number, 1);
    }

    updateReceipt(num, newReceipt) {
        const receipt = this._receipts.find((rece)=> {
            return rece.id === num;
        });
        Object.assign(receipt, newReceipt);
    }
}

module.exports = ReceiptService;