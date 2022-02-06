import ProductServices from "../services/ProductServices.js";
import PhoneProducts from "../models/PhoneProduct.js";
import Validation from "../models/Validation.js";

let productServices = new ProductServices();
let validation = new Validation();

// Hiển thị table
let showTable = (arr) => {
    let content = "";
    let count = 0;
    for (let product of arr) {
        count++;
        let { name, price, screen, backCamera, frontCamera, img, desc, type, id } = product;
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
                <button onclick="deletePhone('${id}')" class="btn btn-dark">Xóa</button>
                <button onclick="watchPhone('${id}')" data-toggle="modal" data-target="#exampleModal" class="btn btn-danger">Xem</button>
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

document.getElementById("btnAdd").onclick = () => {
    let allFeedBack = document.querySelectorAll(".invalid-feedback");
    for (let feedback of allFeedBack) {
        feedback.style.display = "none";
    };
    document.getElementById("phoneID").disabled = true;
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAddPhone").style.display = "block";
    document.getElementById("exampleModalLabel").innerHTML = "Add Product";
    document.getElementById("phoneForm").reset();
}

let addPhone = () => {

    let namePhone = document.getElementById("phoneName").value;
    let price = document.getElementById("pricePhone").value;
    let screen = document.getElementById("screenPhone").value;
    let backCam = document.getElementById("backCam").value;
    let frontCam = document.getElementById("frontCam").value;
    let img = document.getElementById("imgPhone").value;
    let desc = document.getElementById("descPhone").value;
    let type = document.getElementById("typePhone").value;
    let isValid = checkValidation(namePhone, price, screen, backCam, frontCam, img, desc);
    if (isValid) {
        let phone = new PhoneProducts(namePhone, price, screen, backCam, frontCam, img, desc, type);
        productServices.addProduct(phone)
            .then(() => {
                getPhone();
                document.querySelector(".close").click();
                
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
document.querySelector("#btnAddPhone").addEventListener("click", addPhone);
let deletePhone = (id) => {
    productServices.deleteProduct(id)
        .then(() => {
            getPhone();;
        })
        .catch((error) => {
            console.log(error);
        });
}
window.deletePhone = deletePhone;

let watchPhone = (id) => {
    let allFeedBack = document.querySelectorAll(".invalid-feedback");
    for (let feedback of allFeedBack) {
        feedback.style.display = "none";
    };
    document.getElementById("phoneID").disabled = true;
    document.getElementById("btnUpdate").style.display = "block";
    document.getElementById("btnAddPhone").style.display = "none";
    document.getElementById("exampleModalLabel").innerHTML = "Update Product";
    productServices.watchProduct(id)
        .then((result) => {

            let { name, price, screen, backCamera, frontCamera, img, desc, type, id } = result.data;

            document.getElementById("phoneName").value = name;
            document.getElementById("pricePhone").value = price;
            document.getElementById("screenPhone").value = screen;
            document.getElementById("backCam").value = backCamera;
            document.getElementById("frontCam").value = frontCamera;
            document.getElementById("imgPhone").value = img;
            document.getElementById("descPhone").value = desc;
            document.getElementById("typePhone").value = type;
            document.getElementById("phoneID").value = id;

        })
        .catch((error) => {
            console.log(error);
        });
}
window.watchPhone = watchPhone;

let updatePhone = () => {
    let namePhone = document.getElementById("phoneName").value;
    let price = document.getElementById("pricePhone").value;
    let screen = document.getElementById("screenPhone").value;
    let backCam = document.getElementById("backCam").value;
    let frontCam = document.getElementById("frontCam").value;
    let img = document.getElementById("imgPhone").value;
    let desc = document.getElementById("descPhone").value;
    let type = document.getElementById("typePhone").value;
    let id = document.getElementById("phoneID").value;

    let isValid = checkValidation(namePhone, price, screen, backCam, frontCam, img, desc);
    if (isValid) {
        let phone = new PhoneProducts(namePhone, price, screen, backCam, frontCam, img, desc, type);
        productServices.updateProduct(id, phone)
            .then(() => {
                getPhone();
                document.querySelector(".close").click();
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
document.querySelector("#btnUpdate").addEventListener("click", updatePhone);

//Kiểm tra thông tin
let checkValidation = (namePhone, price, screen, backCam, frontCam, img, desc) => {
    var isValid = true;
    // phoneName: không được để trống, không ký tự đặc biệt (theo english)
    isValid &= validation.checkEmpty(namePhone, "invalidName", "Hãy nhập tên của bạn") && validation.checkName(namePhone, "invalidName", "Tên không chứa ký tự đặc biệt (ngoại trừ khoảng trắng)");
    //Price phone
    isValid &= validation.checkEmpty(price, "invalidPrice", "Hãy nhập giá phone ") && validation.checkNumber(price, "invalidPrice", "Vui lòng chỉ nhập số và kí tự $");
    //Screeen phone
    isValid &= validation.checkEmpty(screen, "invalidScreen", "Hãy nhập screen phone");
    //Back camera
    isValid &= validation.checkEmpty(backCam, "invalidBack", "Hãy nhập back camera");
    //Front camera 
    isValid &= validation.checkEmpty(frontCam, "invalidFront", "Hãy nhập front camera");

    //Hinh anh: không được để trống
    isValid &= validation.checkEmpty(img, "invalidImg", "Hãy nhập hình ảnh ");
    //Type Phone: phải chọn loại
    isValid &= validation.checkSelect("typePhone", "invalidType", "Bạn chưa chọn loại người dùng");
    //Mô tả: không được để trống, không vượt quá 60 ký tự
    isValid &= validation.checkEmpty(desc, "invalidDesc", "Hãy nhập mô tả của bạn") && validation.checkDesc(desc, "invalidDesc", "Bạn đã nhập quá 60 ký tự");
    return isValid;
}
window.checkValidation = checkValidation;
//Caí trên là sự kiện khi nhấn nút update 
//Sự kiện khi nhập vào input
document.getElementById("phoneName").onkeyup = () => {
    let namePhone = document.getElementById("phoneName").value;
    if (namePhone == "") {
        validation.checkEmpty(namePhone, "invalidName", "Hãy nhập tên của bạn");
    }
    else {
        validation.checkName(namePhone, "invalidName", "Tên không chứa ký tự đặc biệt (ngoại trừ khoảng trắng)")
    }
}
document.getElementById("typePhone").onclick = () => {
    validation.checkSelect("typePhone", "invalidType", "Bạn chưa chọn loại người dùng");
}
document.getElementById("pricePhone").onkeyup = () => {
    let price = document.getElementById("pricePhone").value;
    if (price == "") {
        validation.checkEmpty(price, "invalidPrice", "Hãy nhập giá phone");
    }else{
        validation.checkNumber(price, "invalidPrice", "Vui lòng chỉ nhập số và kí tự $");
    }
}
document.getElementById("screenPhone").onkeyup = () => {
    let screen = document.getElementById("screenPhone").value;
    validation.checkEmpty(screen, "invalidScreen", "Hãy nhập screen phone");
}
document.getElementById("backCam").onkeyup = () => {
    let backCam = document.getElementById("backCam").value;
    validation.checkEmpty(backCam, "invalidBack", "Hãy nhập back camera");
}
document.getElementById("frontCam").onkeyup = () => {
    let frontCam = document.getElementById("frontCam").value;
    validation.checkEmpty(frontCam, "invalidFront", "Hãy nhập front camera");
}
document.getElementById("imgPhone").onkeyup = () => {
    let img = document.getElementById("imgPhone").value;
    validation.checkEmpty(img, "invalidImg", "Hãy nhập hình ảnh ");
}
document.getElementById("descPhone").onkeyup = () => {
    let desc = document.getElementById("descPhone").value;
    if (desc == "") {
        validation.checkEmpty(desc, "invalidDesc", "Hãy nhập mô tả của bạn");
    }
    else {
        validation.checkDesc(desc, "invalidDesc", "Bạn đã nhập quá 60 ký tự");
    }
}


//Search
let searchProduct = () => {

    productServices.getProduct()
    .then((result) => {
        let typePhone = document.getElementById("selLoai").value
        let arrType = [];
        result.data.map(function(phone){
            if(phone.type == typePhone){
                arrType.push(phone);
            }else if(typePhone == ""){
                arrType = result.data;
                console.log(result.data);
            }
        });
        showTable(arrType);
    })
    .catch((error) => {
        console.log(error);
    });    

}
document.getElementById("selLoai").onclick = searchProduct;