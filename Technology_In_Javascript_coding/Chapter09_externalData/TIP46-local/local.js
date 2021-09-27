function saveBreed(breed) {
  localStorage.setItem('breed', breed)
}

function getSavedBreed() {
  return localStorage.getItem('breed');
}

function removeBreed() {
  return localStorage.removeItem('breed');
}
