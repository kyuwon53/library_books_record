const defaultEmployee = {
  name: {
    first: '',
    last: '',
  },
  years: 0,
};

const employee = {
  ...defaultEmployee,
  name: {...defaultEmployee.name,
  },
};

