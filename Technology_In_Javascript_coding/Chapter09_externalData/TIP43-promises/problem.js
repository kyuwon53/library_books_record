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

function getMusic(theme, cb){
  return setTimeout(() => {
    if (theme === 'dusk'){
      return cb({
        album: 'music for airports',
      });
    }
    return cb({
      album: 'kind of blue',
    });
  }, 1000);
}

getUserPreferences(preferences => {
  return getMusic(preferences.theme, music => {
    console.log(music.album);
  });
});

