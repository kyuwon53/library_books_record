const dogs =[
  {
    이름: '맥스',
    크기: '소형견',
    견종: '보스턴테리어',
    색상: '검정색',
  },
  {
    이름: '도니',
    크기: '대형견',
    견종: '래브라도레트리버',
    색상: '검정색',
  },
  {
    이름: '맥스',
    크기: '중형견',
    견종: '래브라도레트리버',
    색상: '갈색',
  },
];

let filters = {};

function addFilters(filters, key, value){
  filters[key] = value;
}
function deleteFilters(filters, key){
  delete filters[key];
}
function clearFilters(filters){
  filters = {};
  return filters;
}


