async function getTheme() {
  const {theme}  = await getUserPreferences();
  return theme;
}

getTheme()
  .then(theme => {
    console.log(theme);
  });
  