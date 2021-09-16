const firms = new Map()
  .set(10, 'Ivie Group')
  .set(23, 'Soundscaping Source')
  .set(31, 'Big 6');


  for(const firm of firms){
    const [id, name] = firm;
    if (!isAvaliable(id)){
      return `${name}는 사용할 수 없습니다`;
    }
  }
  return '모든 회사를 사용할 수 있습니다';
