import { clone } from './actions';
/**
 *  inputNumber takes a number as a string and a calculator model
 * @param {string} n number -- the number to add to the buffer
 * @param {model} m model -- the existing  data model
 * @returns {model}
 */
const inputNumber = (n, m) => {
  // validate input
  if (Number.isNaN(parseInt(n, 10)) || typeof n !== 'string') {
    throw new TypeError('First argument must be a number in string format.');
  }

  // make sure we dont mutate the model we were passed
  const calcModel = clone(m);

  // update the buffer
  if (calcModel.buffer === '0' || calcModel.operation === '=') {
    // Overwrite buffer when its at 0 or previous operation was =
    calcModel.buffer = n;

    // extra operation if previous operation was =
    if (calcModel.operation === '=') {
      calcModel.actions = [];
      calcModel.operation = null;
    }
  } else {
    calcModel.buffer += n;
  }

  return calcModel;
};
export default inputNumber;
