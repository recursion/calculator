// deep clone an object
const clone = c => JSON.parse(JSON.stringify(c));
export { clone };

export function divide(m) {
  const c = clone(m);
  c.registerA /= c.registerB;
  return c;
}

export function multiply(m) {
  const c = clone(m);
  c.registerA *= c.registerB;
  return c;
}

export function subtract(m) {
  const c = clone(m);
  c.registerA -= c.registerB;
  return c;
}

/**
 *
 * @param {calculatorModel} m
 * @returns {calculatorModel}
 */
export function add(m) {
  const c = clone(m);
  c.registerA += c.registerB;
  return c;
}

export function clearAll(calc) {
  const c = clone(calc);
  c.buffer = '0';
  c.registerA = 0;
  c.registerB = 0;
  c.actions = [];
  c.operation = null;
  return c;
}

export function clearEntry(calc) {
  const c = clone(calc);
  c.buffer = '0';
  return c;
}

export function equals(calc) {
  return calc;
}

const actions = {
  '/': divide,
  '*': multiply,
  '-': subtract,
  '+': add,
  '=': equals,
  AC: clearAll,
  CE: clearEntry,
};
export default actions;
