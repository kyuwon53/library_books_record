const filters = new Map()
  .set('색상', '검정색')
  .set('견종','래브라도레트리버');

function checkFilters(filters){
  for (const entry of filters){
    console.log(entry)
  }
}
// ["색상", "검정색"]
// ["견종", "래브라도레트리버"]

