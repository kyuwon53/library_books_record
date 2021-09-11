const prices = ['1.0', '2.15'];
const formattedPrices = prices.map(price => parseFloat(price));

const prices1 = ['1.0','흥정가능' ,'2.15'];
const formattedPrices = prices.map(price => parseFloat(price)).filter(price => price);
