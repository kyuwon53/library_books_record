const validator = {
  message: '는 유효하지 않습니다.',
  setInvalidMessage(...fields){
    return fields.map(function (field){
      return `${field}${this.message}`;
    });
  },
};

