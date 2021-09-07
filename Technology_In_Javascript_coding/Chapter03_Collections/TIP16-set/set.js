function getUniqueColors(dogs){
  const unique = new Set();
  for (const dog of dogs){
    unique.add(dog.색상);
  }
  return [...unique];
}
