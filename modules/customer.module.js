class Customer {

    constructor(id, identify, firstName, lastName, mail, address, phone, receipt) {
        this.id = id;
        this.identify = identify;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.address = address;
        this.phone = phone;
        this.receipt = receipt;
    }
}

module.exports = Customer;