function validateCharacterCount(max, items){
  return items.every(item => item.length < max);
}

validateCharacterCount(10, ['Hobbs', 'Eagles']);
// true

validateCharacterCount(10, 'wvoquune');
// TypeError: items.every is not a function
// 타입 오류: items.every는 함수가 아닙니다.
