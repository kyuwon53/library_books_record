const librarian = instructors.find(instructors => {
  return instructors.libraries.includes('기념 도서관');
});

const findBylibrary = library => instructors => {
  return instructors.libraries.includes(library);
};
const librarian = instructors.find(findBylibrary('미디어교육정보 도서관'));

// {
//   name: 'Jim',
//   libraries: ['미디어교육정보 도서관'],
// }

