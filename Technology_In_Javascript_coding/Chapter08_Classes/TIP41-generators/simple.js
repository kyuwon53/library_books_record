function* getCairoTrilogy(){
  yield '궁전 샛길';
  yield '욕망의 궁전';
  yield '설탕 거리';
}

const trilogy = getCairoTrilogy();
trilogy.next();
// {value: '궁전 샛길', done: false}
trilogy.next();
// {value: '욕망의 궁전', done: false}
trilogy.next();
// {value: '설탕 거리', done: false}
trilogy.next();
// {value: undefined, done: true}
