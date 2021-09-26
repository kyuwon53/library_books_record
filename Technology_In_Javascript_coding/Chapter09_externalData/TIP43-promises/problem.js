function getUserPreferences(cb){
  return setTimeout(() => {
    cb({
      theme: 'dusk',
    });
  }, 1000);
}

function log(value){
  return console.log(value);
}

log('starting');
// starting

getUserPreferences(preferences => {
  return log(preferences.theme.toUpperCase());
});

log('ending?');
// ending?

// DUSK
