function getArguments(){
  return arguments;
}
getArguments('Bloomsday', 'June 16');
// {'0': 'Bloomsday', '1': 'June 16' }
function validateCharacterCount(max){
  const items = Array.prototype.slice.call(arguments, 1);
  return items.every(item => item.length < max );
}
