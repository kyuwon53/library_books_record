const defaults = {
author: '',
title: '',
year: 2017,
rating: null,
};

const book = {
  author: 'Joe Morgan',
  title: 'Simplifying JavaScript',
};

function addBookDefaults(book, defaults){
  const fields = Object.keys(defaults);
  const updates = {};
  for (let i = 0; i < fields.length; i++){
    const field = fields[i];
    updates[field] = book[field] || defaults[field];
  }
  return updates;
}
// || 의 경우, 둘 중 하나만 true면 true로 평가되므로 왼쪽 피연산자가 true이면 바로 true를 반환한다.
// && 의 경우 둘다 true여야만 true이므로, 왼쪽 피연산자가 false면 바로 false로 평가된다.


