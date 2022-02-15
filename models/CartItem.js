import PhoneProduct from "./PhoneProduct.js";

export default class CartItem extends PhoneProduct {
    constructor(id,namePhone, price, quantity) {
        super(namePhone, price);
        this.quantity = quantity;
        this.id = id;
    }
}