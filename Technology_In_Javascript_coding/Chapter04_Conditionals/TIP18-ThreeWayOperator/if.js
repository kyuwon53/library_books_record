if (title === '과장'){
  const permissions = ['근로시간', '수당'];
} else {
  const permissions = ['근로시간'];
}
permissions;
// ReferenceError : permissions is not defined

let permissions;
if (title == '과장'){
  permissions = ['근로시간','수당'];
} else{
  permissions = ['근로시간'];
}
