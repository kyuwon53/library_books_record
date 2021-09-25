function getLowestPriceDeclareation(item){
  const count = item.inventory;
  let price = item.price;
  if (!count){
    return 0;
  }
  // ...
  let price = item.saleInventory ? item.salePrice : item.wholesalePrice;
  return price;
}
