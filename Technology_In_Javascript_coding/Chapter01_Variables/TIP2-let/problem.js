function getLowestPrice(item){
  var count = item.inventory;
  var price = item.price;
  if (item.salePrice){
    var count = item.saleInventory;
    if (count > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
