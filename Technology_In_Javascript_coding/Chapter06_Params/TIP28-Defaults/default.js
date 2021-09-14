function convertWeight(weight, ounces, roundTo){
  const total = weight + (ounces / 16);
  const conversion = total / 2.2;
  return roundToDecimalPlace(conversion, roundTo);
}
