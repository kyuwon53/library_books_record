const firms = {
  '10': 'Ivie Group',
  '23': 'Soundscaping Source',
  '31': 'Big 6',
};

for (const id in firms){
  if (!isAvailable(parseInt(id, 10))){
    return `${firms[id]}는 사용할 수 없습니다`;
  }
}
return '모든 회사를 사용할 수 있습니다';

