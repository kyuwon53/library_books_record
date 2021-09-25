function greet(name){
  return `Hi, ${name}`;
}
greet('Leo');
// 'Hi, Leo';

function yell(name){
  return `HI, ${name.toUpperCase()}!`;
}
greet('Pankaj');
// 'HI, PANKAJ!';

function leapYearConverter(age){
  return `윤년에 태어났다면 ${Math.floor(age / 4)} 살이야.`;
}
leapYearConverter(34);
// "윤년에 태어났다면 8살이야."

function generateLink(image, width){
  return `https://${getProvider()}/${image}?width=${parseInt(width,10)}`;
}
