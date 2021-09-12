const team = [
  'Michelle B',
  'Dave L',
  'Dave C',
  'Courtney B',
  'Davina M',
];

'Dave'.match(/Dav/);
//['Dav', index:0, input: 'Dave']
'Michelle'.match(/Dav/);
// null

const deves = [];
for(let t = 0; i < team.length; i++){
  if(team[i].match(/Dav/)){
    daves.push(team[i]);
  }
}
