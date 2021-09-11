const band = [{
    name: 'corbett',
    instrument: 'guitar',
  },
  {
    name: 'evan',
    instrument: 'guitar',
  },
  {
    name: 'sean',
    instrument: 'bass',
  },
  {
    name: 'brett',
    instrument: 'drums',
  },
];

function getInstrument(member){
  return member.instrument;
}

const instruments = band.map(getInstrument);

// ['guitar', 'guitar', 'bass', 'drums']

// 기명 함수를 화살표 함수를 사용해 익명 함수로 바꾸기 
const instrument = band.map(member => member.instrument);
