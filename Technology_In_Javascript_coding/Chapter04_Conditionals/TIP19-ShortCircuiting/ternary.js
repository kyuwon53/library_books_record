function getIconPath(icon){
  const path = icon.path ? icon.path : 'uploads/default.png';
  return 'https://assets.foo.com/${path}';
}
