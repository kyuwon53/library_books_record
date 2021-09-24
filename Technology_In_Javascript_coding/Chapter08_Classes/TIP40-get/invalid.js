class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || 'Two Weeks';
  }
  get price(){
    return this.price;
  }

  set price(){
    this.price = `$ ${price}`;
  }
}
const coupon = new Coupon(5);
// RangeError: Maximum call stack size exceeded
// 범위 오류: 호출 스택의 최대치를 초과함
