const comic = {
  first: 'Peter',
  last: 'Bagge',
  city: 'Seattle',
  state: 'Washington',
};

const getName = ({ first, last }) => `${first} ${last}`;
getName(comic);
// Peter Bagge

const getFullName = ({ first, last }) => ({ fullName: `${first} ${last}`});
getFullName(comic);
// { fullName: 'Peter Bagge' }

const getNameAndLocation = ({first, last, city, state }) => ({
  fullName: `${first} ${last}`,
  location: `${city}, ${state}`,
});
getNameAndLocation(comic);
// {
//   fullName: 'Peter Bagge',
//   location: 'Seattle, Washington'
// }

const discounter = discount => price => price * (1 - discount);

const tenPercentOff = discounter(0.1);
tenPercentOff(100);
// 90

discounter(0.1)(100);
// 90
