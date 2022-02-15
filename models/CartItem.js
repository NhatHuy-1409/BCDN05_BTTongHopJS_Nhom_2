import PhoneProduct from "./PhoneProduct.js";

export default class CartItem extends PhoneProduct {
    constructor(id, namePhone, price, img, quantity) {
        super(namePhone, price, img);
        this.quantity = quantity;
        this.id = id;
    }
}