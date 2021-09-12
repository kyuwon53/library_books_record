const scores = [30, 82, 70, 45];
function getNumberOfPassingScores(scores){
  const passing = scores.filter(score => score > 59);
  // [82, 70]
  return passing.length;
}
// 2

function getPerfectScores(scores){
  const perfect = scores.filter(score => score === 100);
  // []
  return perfect.length;
}
// 0

const daves = team.filter(member => member.match(/Dav/));
