import lodash, { fromParis } from 'lodash';

export function mapToObject(map) {
  return fromParis([...map]);
}

export function objectToMap(object) {
  const pairs = lodash.toPairs(object);
  return new Map(pairs);
}
