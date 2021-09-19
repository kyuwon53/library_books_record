function displayPhoto(photo){
  const{
    title,
    photographer = 'Anonymous',
    location: [latitude, longitude],
    src: url,
    ...other
  } = photo;
  const additional = Object.keys(other).map(key => `${key}: ${other[key]}`);
  return (`
  <img alt="${title} 사진 ${photographer} 촬영" src="${url}"  />
  <div>${title}</div>
  <div>${photographer}</div>
  <div>위도: ${location[0]} </div>
  <div>경도: ${location[1]} </div>
  <div>${additional.join(' <br/> ')}</div>
  `);
}
