const active = sailors.filter(sailor => sailor.active);
// {name: 'yi hong', active: true, email: 'yh@yhproductions.io'}
// {name: 'alex', active: true, email: ''}

const emails = active.map(member => member.email || `${member.name}@wiscsail.io`);
// ['yh@yhproductions.io', 'alex@wiscsail.io']

emails.forEach(sailor => sendEmail(sailor));
