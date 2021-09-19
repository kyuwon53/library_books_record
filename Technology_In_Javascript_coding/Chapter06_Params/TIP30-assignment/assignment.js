const landscape = {
  title: 'Landscape',
  photographer: 'Nathan',
  location: [32.7122222, -103.1405556],
};

const region = {
  city: 'Hobbs',
  county: 'Lea',
  state: {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
};

function getCityAndState({ location }){
  const { city, state } = determineCityAndState(location);
  return{
    city,
    state: state.abbreviation,
  };
  // {
  //   city: 'Hobbs',
  //   state: 'NM'
  // }
}

function setRegion({ location, ...details }){
  const { city, state } = determineCityAndState(location);
  return{
    city,
    state: state.abbreviation,
    ...details,
  };
}
