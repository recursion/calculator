import model from '../model';
import inputNumber from '../inputNumber';

describe('inputNumber', () => {
  test('it throws an error if something other than a string is passed in', () => {
    const t = () => inputNumber(5, model);
    expect(t).toThrow(TypeError);
  });
  test('it throws an error if the string passed in is not a number', () => {
    const t = () => inputNumber('FU', model);
    expect(t).toThrow(TypeError);
  });
  test('it sets buffer to number when buffer is 0', () => {
    expect(inputNumber('5', model).buffer).toBe('5');
  });
  test('it doesnt overwrite existing buffer data, when it exists', () => {
    const calc = inputNumber('5', model);
    expect(inputNumber('5', calc).buffer).toBe('55');
  });
  test('it overwrites the buffer when the previous operation was =', () => {
    const startingModel = {
      buffer: '10',
      registerA: 10,
      registerB: 0,
      operation: '=',
      actions: ['5', '+', '5', '=', '10'],
    };
    expect(inputNumber('100', startingModel).buffer).toBe('100');
  });
  test('it resets the actions list when previous operation was =', () => {
    const startingModel = {
      buffer: '10',
      registerA: 10,
      registerB: 0,
      operation: '=',
      actions: ['5', '+', '5', '=', '10'],
    };
    expect(inputNumber('100', startingModel).actions).toEqual([]);
  });
  test('it resets the operation if previous operation was =', () => {
    const startingModel = {
      buffer: '10',
      registerA: 10,
      registerB: 0,
      operation: '=',
      actions: ['5', '+', '5', '=', '10'],
    };
    expect(inputNumber('100', startingModel).operation).toBe(null);
  });
});
