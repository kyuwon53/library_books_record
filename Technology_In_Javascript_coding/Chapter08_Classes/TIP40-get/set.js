class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }

  set halfPrice(price){
    this.price = price / 2;
  }
}

const coupon = new Coupon(5);
coupon.price;
// 5
coupon.halfPrice = 20;
coupon.price;
// 10
coupon.halfPrice;
// undefined
