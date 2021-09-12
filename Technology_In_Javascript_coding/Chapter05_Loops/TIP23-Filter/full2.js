const instructors = [
  {
    name: '짐',
    libraries:['미디어교육정보 도서관'],
  },
  {
    name: '새라',
    libraries:['기념 도서관', '문헌정보학 도서관'],
  },
  {
    name: '엘리엇',
    libraries:['중앙 도서관'],
  },
];

let memorialInstructor;

for(let i = 0; i < instructors.length; i++){
  if (instructors[i].libraries.includes('기념 도서관')){
    memorialInstructor = instructors[i];
    break;
  }
}
