function capitalize(name){
  return name[0].toUpperCase() + name.slice(1);
}

function key(){
  return 'abc123';
}

function greet(first, last){
  return `안녕하세요, ${capitalize(first)} ${capitalize(last)}님`;
}
