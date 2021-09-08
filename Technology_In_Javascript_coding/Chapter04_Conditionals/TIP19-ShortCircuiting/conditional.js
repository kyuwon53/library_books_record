function getFirstImage(userConfig){
  let img = 'default.png';
  if (userConfig.images){
    img = userConfig.images[0];
  }
  return img;
}

const userConfig = {
  images: []
}
const img = getFirstImage(userConfig);
// undefined


function getImage(userConfig){
  let img = 'default.png';
  if (userConfig.images){
    if(userConfig.images.length){
      img = userConfig.images[0];
    }
  }
  return img;
}
