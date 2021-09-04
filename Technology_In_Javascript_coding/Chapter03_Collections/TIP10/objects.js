function getBill(item){
  return {
    name: item.name,
    due: twoWeekFromNow(),
    total: calculateTotal(item.price),
  };
}
const bill = getBill({
  name: '객실 청소',
  price: 30
});

function displayBill(bill){
  return `${bill.name} 비용은 ${bill.total} 달러이며 납부일은 ${bill.due}입니다.`;
}

