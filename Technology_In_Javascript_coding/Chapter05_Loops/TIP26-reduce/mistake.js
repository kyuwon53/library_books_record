const colors = dogs.reduce((colors, dog) => {
  if (colors.includes(dog['색상'])){
    return colors;
  }
  [...colors, dog['색상']];
}, []);
