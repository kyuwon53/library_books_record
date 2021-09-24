class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }
  getPriceText(){
    return `$ ${this.price}`;
  }
  get expirationMessage(){
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
const coupon = new Coupon(5);
coupon.price = 10;
coupon.priceText();
// '$10'
coupon.messageText;
// '이 쿠폰은 2주 후에 만료됩니다.'
coupon.messageText;
