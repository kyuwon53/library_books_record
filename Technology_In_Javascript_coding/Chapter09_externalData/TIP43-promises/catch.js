function getArtist(album){
  return Promise.resolve({
    artist: 'Brian Eno',
  });
}

function failMusic(theme){
  return Promise.reject({
    type: '네트워크 오류',
  });
}

getUserPreferences()
  .then(preference => failMusic(preference.theme))
  .then(music => getArtist(music.album))
  .catch(e => {
    console.log(e);
  });

