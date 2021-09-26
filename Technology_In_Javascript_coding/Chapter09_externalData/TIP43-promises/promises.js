function getUserPreferences() {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: 'dusk',
    });
  });
  return preferences;
}

getUserPreferences()
  .then(preferences =>{
    console.log(preferences.theme);
  });
//'dusk'

