const developers = [
  {
    name: 'Jeff',
    language: 'php',
  },
  {
    name: 'Ashley',
    language: 'python',
  },
  {
    name: 'Sara',
    language: 'python',
  },
  {
    name: 'Joe',
    language: 'javascript',
  },
];

const aggregated = developers.reduce((specialities, developer) =>{
  const count = specialities[developer.language] || 0;
  return{
    ...specialities,
    [developer.language]: count + 1,
  };
}, {});
