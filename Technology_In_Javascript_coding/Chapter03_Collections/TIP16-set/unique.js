function getColors(dogs){
  return dogs.map(dog => dog['색상']);
}
getColors(dogs);
// ['검정색' , '검정색', '갈색']

function getUnique(attributes){
  const unique = [];
  for (const attribute of attributes){
    if (!unique.includes(attribute)){
      unique.push(attribute);
    }
  }
  return unique;
}
const colors = getColors(dogs);
getUnique(colors);
// ['검정색', '갈색']
