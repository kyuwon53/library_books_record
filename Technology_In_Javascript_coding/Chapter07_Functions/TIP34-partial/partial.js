const building = {
  hours : '8 a.m. - 8 p.m.',
  address: 'Jayhawk Blvd',
};
const manager = {
  name: 'Augusto',
  phone: '555-555-5555',
};
const program = {
  name: 'Presenting Research',
  room: '415',
  hours: '3-6',
};
const exhibit = {
  name: 'Emerging Scholarship',
  contact: 'Dyan',
};

function mergeProgramInformation(building, manager){
  const { hours, address } = building;
  const { name, phone } = manager;
  const defaults = {
    hours,
    address,
    contact: name,
    phone,
  };

  return program => {
    return {...defaults, ...program };
  };
};

const programInfo = mergeProgramInformation(building, manager)(program);
// {
//   name: 'Presenting Research',
//   room: '415',
//   hours: '3-6',
//   address: 'Jayhawk Blvd',
//   phone: '555-555-5555',
// }
const exhibitInfo = mergeProgramInformation(building, manager)(exhibit);
// {
//   name: 'Emerging Scholarship',
//   contact: 'Dyan',  
//   hours : '8 a.m. - 8 p.m.',
//   address: 'Jayhawk Blvd',
//   phone: '555-555-5555',
// }
