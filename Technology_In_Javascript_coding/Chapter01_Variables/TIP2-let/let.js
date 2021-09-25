function getLowestPrice(item){
  let count = item.inventory;
  let price = item.price;
  if (item.salePrice){
    let count = item.saleInventory;
    if (count > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
