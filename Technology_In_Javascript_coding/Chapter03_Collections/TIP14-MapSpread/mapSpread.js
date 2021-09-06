function getAppliedFilters(filters){
  const applied = [...filters].map(([key, value])=>{
    return `${key}:${value}`;
  });
  return `선택한 조건은 ${applied.join(', ')} 입니다.`;
}

getAppliedFilters(filters);
// "선택한 조건은 색상:검정색, 견종:래브라도레트리버 입니다."
