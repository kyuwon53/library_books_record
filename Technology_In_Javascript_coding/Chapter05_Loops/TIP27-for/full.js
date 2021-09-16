const unvaliable = [...firms].find(firm => {
  const [id] = firm;
  return !isAvailable(id);
});
if (unvaliable){
  return `${unvaliable[1]}는 사용할 수 없습니다.`;
}
return 'All firms are available';

const message = [...firms].reduce((availability, firm) => {
  const [id, name] = firm;
  if (!isAvailable(id)){
    return `${name}는 사용할 수 없습니다`;
  }
  return availability;
}, '모든 회사를 사용할 수 있습니다');

return message;
