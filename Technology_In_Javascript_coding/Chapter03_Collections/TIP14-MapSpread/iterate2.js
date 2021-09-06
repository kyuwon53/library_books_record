const filters = new Map()
  .set('색상', '검정색')
  .set('견종','래브라도레트리버');

function getAppliedFilters(filters){
  const applied = [];
  for (const [key, value] of filters){
    applied.push(`${key}:${value}`);
  }
  return `선택한 조건은 ${applied.join(', ')} 입니다.`;
}

