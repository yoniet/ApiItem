class Product {
    constructor(id, catalogNumber, nameItem, supplier, price, description, category, quantity) {
        this.id = id;
        this.catalogNumber = catalogNumber;
        this.nameItem = nameItem;
        this.supplier = supplier;
        this.price = price;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
    }
}

module.exports = Product;