import ProductServices from "../services/ProductServices.js";
import PhoneProducts from "../models/PhoneProduct.js";

let productServices = new ProductServices();

// Hiển thị table
let showTable = (arr) => {
    let content = "";
    let count = 0;
    for (let product of arr) {
        count++;
        let { name, price, screen, backCamera, frontCamera, img, desc, type } = product;
        content += `
        <tr>
            <td>${count}</td>
            <td>${name}</td>
            <td>
                <img src="${img}" alt="">
            </td>
            <td>${price}</td>
            <td>${screen}</td>
            <td>${backCamera}</td>
            <td>${frontCamera}</td>
            <td>${desc}</td>
            <td>${type}</td>
            <td>
                <button onclick="" class="btn btn-dark">Xóa</button>
                <button onclick="" data-toggle="modal" data-target="#exampleModal" class="btn btn-danger">Xem</button>
            </td>

        </tr>
        `;
    }
    document.getElementById("tableProduct").innerHTML = content;
}
let getPhone = () => {
    productServices.getProduct()
        .then((result) => {
            showTable(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
}
getPhone();

let addPhone = () => {
    let namePhone = document.getElementById("").value;
    let price = document.getElementById("").value;
    let screen = document.getElementById("").value;
    let backCam = document.getElementById("").value;
    let frontCam = document.getElementById("").value;
    let img = document.getElementById("").value;
    let desc = document.getElementById("").value;
    let type = document.getElementById("").value;

    let phone = new PhoneProducts(namePhone,price,screen,backCam,frontCam,img,desc,type) ;
    productServices.addProduct()
        .then((result) => {
            showTable(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

let deletePhone = (id) => {
    productServices.deleteProduct()
    .then((result) => {
        showTable(result.data);
    })
    .catch((error) => {
        console.log(error);
    });
}