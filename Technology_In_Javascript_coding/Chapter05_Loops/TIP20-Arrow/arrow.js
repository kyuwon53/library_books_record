const capitalize = name => {
  return name[0].toUpperCase() + name.slice(1);
};

const key = () => {
  return 'abc123';
}

const greet = (first, last) => {
  return `안녕하세요, ${capitalize(first)} ${capitalize(last)}님`;
}
