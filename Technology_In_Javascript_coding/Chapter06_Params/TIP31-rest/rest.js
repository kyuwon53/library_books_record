function getArguments(...args){
  return args;
}
getArguments('Bloomsday', 'June 16');
// ['Bloomsday', 'June 16']

function validateCharacterCount(max, ...items){
  return items.every(item => item.length < max );
}

validateCharacterCount(10, 'wvoquie');
// true
validateCharacterCount(10, ...['wvoquie']);
// true
const tags = ['Hobbs', 'Eagles'];
validateCharacterCount(10, ...tags);
// true
validateCharacterCount(10, 'Hobbs', 'Eagles');
// true

['Spirited Away', 'Princess Mononoke'].map((film, ...other) => {
  console.log(other);
  return film.toLowerCase();
});
// [0, ['Spirited Away', 'Princess Mononoke']]
// [1, ['Spirited Away', 'Princess Mononoke']]

function applyChanges(...args){
  updateAccount(...args);
  closeModal();
}

const queue = ['stop', 'collaborate', 'listen'];
const [first, ...remaining] = queue;
first;
// 'stop'
remaining;
// ['collaborate', 'listen'];

