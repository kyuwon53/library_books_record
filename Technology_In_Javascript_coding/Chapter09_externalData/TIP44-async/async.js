async function getTheme() {
  const {theme}  = await getUserPreferences();
  return theme;
}

getTheme()
  .then(theme => {
    console.log(theme);
  });

async function getArtistByPreference() {
  const { theme } = await getUserPreferences();
  const { album } = await getMusic(theme);
  const { artist } = await getArtist(album);
  return artist;
}

getArtistByPreference()
  .then(artist => {
    console.log(artist);
  });
