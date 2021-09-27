function saveBreed(breed) {
  localStorage.setItem('breed', breed)
}

function getSavedBreed() {
  return localStorage.getItem('breed');
}

function removeBreed() {
  return localStorage.removeItem('breed');
}

function applyBreedPreference(filters) {
  const breed = getSavedBreed();
  if (breed) {
    filters.set('breed',breed);
  }
  return filters;
}
