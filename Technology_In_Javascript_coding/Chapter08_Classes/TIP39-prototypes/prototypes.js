function Coupon(price, expiration){
  this.price = price;
  this.expiration = expiration || '2주';
}
const coupon = new Coupon(5, '2개월');
coupon.price;
// 5

Coupon.prototype.getExpirationMessage = function (){
  return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
};
coupon.getExpirationMessage();
// 이 쿠폰은 2개월 후에 만료됩니다.
