const defaults = {
  author: '',
  title: '',
  year: 2017,
  rating: null,
};

const book = {
  author: 'Joe Morgan',
  title: 'ES6 TIPs',
};

const bookWithDefaults = {...defaults, ...book};
// {author: "Joe Morgan", title: "ES6 TIPs", year: 2017, rating: null}
