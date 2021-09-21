const name = {
  first: 'Lemmy',
  last: 'kilmister',
};

function getName({ first, last }){
  return `${first} ${last}`;
}

const discounter = discount => {
  return price => {
    return price * (1 - discount);
  };
};
const tenPercentOff = discounter(0.1);
tenPercentOff(100);
// 90
