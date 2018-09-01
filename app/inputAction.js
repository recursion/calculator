import actions, {
  clone,
  clearEntry,
  clearAll,
} from './actions';
/**
 * takes a string action and a calculator model and returns a model
 * performs any calculations on the registers and buffer that may be needed
 * @param {string} action
 * @param {model} m
 * @returns {model}
 */
const inputAction = (action, m) => {
  // validate input
  if (typeof action !== 'string') {
    throw new TypeError('Action must be a string.');
  }
  if (!(action in actions)) {
    throw new TypeError('Action must be one of: /, +, -, *, CE, or AC symbols.');
  }

  // clone model so there is no mutation of arg
  const calcModel = clone(m);

  if (action === 'AC') {
    return clearAll(calcModel);
  }

  if (action === 'CE') {
    return clearEntry(calcModel);
  }

  // if buffer and registers are empty
  if (calcModel.buffer === '0' && calcModel.registerA === 0) {
    return calcModel;
  }

  // if registerA is empty
  if (calcModel.registerA === 0) {
    calcModel.registerA = parseInt(calcModel.buffer, 10);
    calcModel.actions.push(calcModel.buffer, action);
    calcModel.operation = action;
    calcModel.buffer = '0';
    return calcModel;
  }

  // if registerA is not empty
  if (calcModel.registerA !== 0) {
    // set registerB to buffer
    calcModel.registerB = parseInt(calcModel.buffer, 10);

    // add buffer and action to actions list
    calcModel.actions.push(calcModel.buffer, action);

    // check for divide by 0 error
    if (calcModel.operation === '/' && calcModel.registerB === 0) {
      calcModel.buffer = 'Error';
      return calcModel;
    }

    // perform the calculation
    const nextCalcModel = actions[calcModel.operation](calcModel);

    // if current operation is = then????
    if (action === '=') {
      nextCalcModel.buffer = nextCalcModel.registerA.toString();
      nextCalcModel.actions.push(nextCalcModel.registerA.toString());
    } else {
      nextCalcModel.buffer = '0';
    }

    // reset registerB
    nextCalcModel.registerB = 0;

    // set operation to current action
    nextCalcModel.operation = action;

    return nextCalcModel;
  }

  return calcModel;
};
export default inputAction;
