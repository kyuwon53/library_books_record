const instruments = [];

function getInstrument(member){
  return member.instrument;
}

for (let i =0; i < band.length; i++){
  instruments.push(getInstrument(band[i]));
}
