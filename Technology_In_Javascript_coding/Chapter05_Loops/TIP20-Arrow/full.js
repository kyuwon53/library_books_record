function capitalize(name){
  return name[0].toUpperCase() + name.slice(1);
}

function key(){
  return 'abc123';
}

function greet(first, last){
  return `안녕하세요, ${capitalize(first)} ${capitalize(last)}님`;
}

function formatUser(name){
  return `${capitalize(name)}님이 로그인했습니다.`;
}

function appllyCustomGreeting(name, callback){
  return callback(capitalize(name));
}

appllyCustomGreeting('mark', function (name){
  return `안녕, ${name}! `;
});
