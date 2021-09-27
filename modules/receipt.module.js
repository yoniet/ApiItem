class Receipt {

    constructor(id, numberReceipt, purchaseDate, purchaseTime, idCustomer, nameCustomer) {
        this.id = id
        this.numberReceipt = numberReceipt;
        this.purchaseDate = purchaseDate;
        this.purchaseTime = purchaseTime;
        this.idCustomer = idCustomer;
        this.nameCustomer = nameCustomer;
    }
}

module.exports = Receipt;