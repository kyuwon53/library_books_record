function addClick(items){
  for (let i = 0; i < items.length; i++){
    items[i].onClick = function (){
        return i;
    };
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
