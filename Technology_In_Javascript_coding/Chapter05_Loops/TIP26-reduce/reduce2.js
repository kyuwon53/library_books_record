const dogs = [
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
    이름: '섀도',
    크기: '중형견',
    견종: '래브라도레트리버',
    색상: '갈색',
  },
]

const colors = dogs.reduce((colors, dog) => {
  return [...colors, dog['색상']];
}, []);

const filters = dogs.reduce((filters, item) => {
  filters.breed.add(item['견종']);
  filters.size.add(item['견종']);
  filters.colors.add(item['견종']);
  return filters;
},
{
  breed: new Set(),
  size: new Set(),
  color: new Set(),
});
