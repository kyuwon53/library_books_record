function convertWeight(weight, ounces){
  const oz = ounces ? ounces / 16 : 0;
  const total = weight + oz;
  return total / 2.2 ;
}
