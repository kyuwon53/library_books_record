function failUserPreferences() {
  const finder = new Promise((resolve, reject) => {
    reject({
      type: '접근 거부됨',
    });
  });
  return finder;
}

failUserPreferences()
  .then(preferences =>{
    // 이 부분은 실행되지 않습니다. 
    console.log(preferences.theme);
  })
  .catch(error => {
    console.error(`실패: ${error.type}`);
  });
  // 실패: 접근 거부됨 

  function getMusic(theme){
    if (theme === 'dusk') {
      return Promise.resolve({
        album: 'music for airports',
      });
    }
    return Promise.resolve({
      album: 'kind of blue',
    });
  }

getUserPreferences()
  .then(preference => {
    return getMusic(preference.theme);
  })
  .then(music => {
    console.log(music.album);
  });
// music for airports

getUserPreferences()
  .then(preference => getMusic(preference.theme))
  .then(music => {console.log(music.album); });
