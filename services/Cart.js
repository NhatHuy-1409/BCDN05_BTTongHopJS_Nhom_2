export default class Cart{
    constructor(){
        this.cartArray = [];
    }
    deleteCart(id){
        this.cartArray.map((item,index) => { 
            if(item.id === id){
                this.cartArray.splice(index,1)
            }
         })
    }
    updateCart(id,newCartItem){
        this.cartArray.map((item,index) => { 
            if(item.id === id){
                this.cartArray[index] = newCartItem;
            }
         })
    }

}