export default class PhoneProduct{
    constructor(namePhone,price,img,backCam,frontCam,screen,desc,type){
        this.name = namePhone;
        this.price = price;
        this.img = img;
        this.screen = screen;
        this.backCamera = backCam;
        this.frontCamera = frontCam;
        this.desc = desc;
        this.type = type;
    }
}