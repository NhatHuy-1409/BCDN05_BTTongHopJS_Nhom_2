// export default class ProductServices {
//     constructor() {
//     }
//     getProduct() {
//         return axios({
//             method: 'get',
//             url: 'https://61d266dcda87830017e59498.mockapi.io/phoneProducts',
//         });
//     }
//     addProduct(product) {
//         return axios({
//             method: 'post',
//             url: 'https://61d266dcda87830017e59498.mockapi.io/phoneProducts',
//             data: product,
//         });
//     }
//     deleteProduct(id) {
//         return axios({
//             method: 'delete',
//             url: `https://61d266dcda87830017e59498.mockapi.io/phoneProducts/${id}`,
//         });
//     }
//     watchProduct(id) {
//         return axios({
//             method: 'get',
//             url: `https://61d266dcda87830017e59498.mockapi.io/phoneProducts/${id}`,
//         });
//     }
//     updateProduct(id, product) {
//         return axios({
//             method: 'put',
//             url: `https://61d266dcda87830017e59498.mockapi.io/phoneProducts/${id}`,
//             data: product,
//         });
//     }
// }
//Use json_server
export default class ProductServices {
    constructor() {
    }
    getProduct() {
        return axios({
            method: 'get',
            url: 'http://localhost:3000/products',
        });
    }
    addProduct(product) {
        return axios({
            method: 'post',
            url: 'http://localhost:3000/products',
            data: product,
        });
    }
    deleteProduct(id) {
        return axios({
            method: 'delete',
            url: `http://localhost:3000/products/${id}`,
        });
    }
    watchProduct(id) {
        return axios({
            method: 'get',
            url: `http://localhost:3000/products/${id}`,
        });
    }
    updateProduct(id, product) {
        return axios({
            method: 'put',
            url: `http://localhost:3000/products/${id}`,
            data: product,
        });
    }
}