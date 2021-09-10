const capitalize = name => {
  return name[0].toUpperCase() + name.slice(1);
};

const key = () => {
  return 'abc123';
}

const greet = (first, last) => {
  return `안녕하세요, ${capitalize(first)} ${capitalize(last)}님`;
}

const formatUser = name => {
  return `${capitalize(name)}님이 로그인했습니다.`;
}
