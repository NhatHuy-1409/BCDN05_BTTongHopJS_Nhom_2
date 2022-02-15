
import ProductServices from "../services/ProductServices.js";
import PhoneProducts from "../models/PhoneProduct.js";
import CartItem from "../models/CartItem.js";
import Cart from "../services/Cart.js";

let productServices = new ProductServices();
let cart = new Cart();

//Set Local storage
let setLocalStorage = (arr) => {
    localStorage.setItem("Product", JSON.stringify(arr))
}

//Hiển thị sản phẩm
let showProduct = (arrProduct) => {
    let content = "";
    for (let product of arrProduct) {
        let { name, price, screen, backCamera, frontCamera, img, desc, type, id } = product;
        content += `
        <div class="product__item col-4">
        <div class="product__content">
            <a class="product__content--name" href="#">${name}</a>
            <div class="product__content--star">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <div class="product__content--img">
                <img src="${img}" alt="">
            </div>
            <div class="product__content--info">
                <div class="product__content--price">
                    Price:<span> ${price}</span>
                </div>
                <div class="product__content--screen">
                    Screen:<span> ${screen}</span>
                </div>
                <div class="product__content--backcam">
                    Back camera:<span> ${backCamera}</span>
                </div>
                <div class="product__content--frontcam">
                    Front camera:<span> ${frontCamera}</span>
                </div>
                <div class="product__content--desc">
                    Describe:<span> ${desc}</span>
                </div>
            </div>

            <div class="product__content--bottom row cart${id}">
                <div class="col-8">
                <button class="btnAddCart " onclick="addCart('${id}')">Add to cart</button>
                </div>
                
                <div class="col-2"><button class=""><i class="fa fa-heart"></i></button></div>
                <div class="col-2"><button class=""><i class="fa fa-compress-arrows-alt"></i></button></div>
            </div>
        </div>
    </div>
        `;
    }
    document.querySelector(".product__list").innerHTML = content;
}
let getProducts = () => {
    productServices.getProduct()
        .then((result) => {
            showProduct(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
}
getProducts();
//Tìm kiếm sản phẩm
let searchProducts = () => {
    productServices.getProduct()
        .then((result) => {
            let typeProducts = document.querySelector("#selLoai").value;
            let newArrProduct = [];
            if (typeProducts === "") {
                newArrProduct = result.data;
            } else {
                result.data.map((product) => {
                    if (product.type == typeProducts) {
                        newArrProduct.push(product);
                    }
                })
            }
            showProduct(newArrProduct);
        })
        .catch((error) => {
            console.log(error);
        });
}
document.getElementById("selLoai").onclick = searchProducts;
//Thêm sản phẩm vào giỏ hàng
let addCart = (id) => {
    productServices.watchProduct(id)
        .then((result) => {
            let cartArr = cart.cartArray;
            if (cartArr.some((item) => item.id === id)) {
                alert("Sản phẩm này đã được thêm vào giỏ hàng");
            } else {
                let cartItem = new CartItem(id, result.data.name, result.data.price, result.data.img, 1);
                cartArr.push(cartItem);
            }
            renderCart(cartArr);
            setLocalStorage(cartArr);
        })
        .catch((error) => {
            console.log(error);
        });

}
window.addCart = addCart;
//Xuất sản phẩm được chọn vào giỏ hàng
let renderCart = (arrCart) => {
    let content = "";
    let contentPay = "Bạn chưa chọn sản phẩm nào";
    let numProduct = "";
    let totalMoney = 0;
    let sumQuantity = 0;

    for (let item of arrCart) {
        console.log(item);
        let { id, name, price, img, quantity } = item;
        let numPrice = price.replace(/[^0-9]/g, '');
        totalMoney += numPrice * quantity;
        sumQuantity += Number(quantity);
        content += `
        <tr>
            <td class="card-product__img">
                <a href="#">
                    <img src="${img}"
                        alt="">
                </a>
            </td>
            <td class="card-product__info">
                <a href="#" class="card__info--name">${name}</a>
                <div class="card__info--quantity">
                    <button class="btn quantityDown" onclick="changeQuantity('down','${id}')">-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="btn quantityUp" onclick="changeQuantity('up','${id}')">+</button>
                </div>
                <p class="card__info--price">${price}</p>
            </td>
            <td class="card-product__close" onclick="deleteCart('${id}')">
                <i class="fa fa-times"></i>
            </td>
        </tr>
        `;
        contentPay = `
        <tr>
            <td class="text__left">Sub-Total:</td>
            <td class="text__right">${totalMoney} $</td>
        </tr>
        <tr>
            <td class="text__left">VAT (20%) :</td>
            <td class="text__right">${totalMoney * 0.2} $</td>
        </tr>
        <tr class="totalMoney">
            <td class="text__left">Total :</td>
            <td class="text__right">${totalMoney + totalMoney * 0.2} $</td>
        </tr>
        `;
        numProduct = `${sumQuantity}`;

    }
    document.querySelector(".cart-product-tbody").innerHTML = content;
    document.querySelector(".card-pay tbody").innerHTML = contentPay;
    document.querySelector(".count").innerHTML = numProduct;
}
//Thay đổi số lượng giỏ hàng
let changeQuantity = (action, id) => {
    let cartArr = cart.cartArray;
    cartArr.map((item) => {
        let newQuantity = item.quantity;
        if (item.id === id) {
            if (action === "up") {
                newQuantity += 1;
            } else if (action === "down" && newQuantity > 0) {
                newQuantity--;
            }
            //Lưu vào giá trị mới vào mảng
            let newCart = new CartItem(item.id, item.name, item.price,item.img, newQuantity);
            cart.updateCart(id, newCart);
            setLocalStorage(cartArr);
            renderCart(cartArr);
        }
    });
}
window.changeQuantity = changeQuantity;
//Xóa giỏ hàng
let deleteCart = (id) => {
    let cartArr = cart.cartArray;
    cart.deleteCart(id);
    renderCart(cartArr);
    setLocalStorage(cartArr);
}
window.deleteCart = deleteCart;
//Get Local storage
let getLocalStorage = () => {
    if (localStorage.getItem("Product") != null) {
        let cartArr = JSON.parse(localStorage.getItem("Product"));
        cart.cartArray = cartArr;
        renderCart(cartArr);
    }
}
getLocalStorage();
//Thanh toán
let payment = () => {
    let cartArr = [];
    cart.cartArray = cartArr;
    renderCart(cartArr);
    setLocalStorage(cartArr);
    document.querySelector(".close").click();
}
window.payment = payment;







