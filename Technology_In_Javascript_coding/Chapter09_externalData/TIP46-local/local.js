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

function savePreferences(filters) {
  const filterString = JSON.stringify([...filters]);
  localStorage.setItem('preferences', filterString);
}

function retrievePreferences() {
  const preferences = JSON.parse(localStorage.getItem('preferences'));
  return new Map(preferences);
}

function clearPreferences() {
  localStorage.clear();
}

