import calculator, { model, inputNumber, inputAction } from '../calculator';

describe('calculator', () => {
  describe('inputNumber', () => {
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
  });

  describe('inputAction', () => {
    test('it does nothing if the registers and buffer are empty', () => {
      expect(inputAction('+', model)).toEqual(model);
    });
    describe('buffer is not 0, but both registers are', () => {
      test('it sets registerA to the value in the buffer', () => {
        const modelWithBuffer = inputNumber('5', model);
        const result = inputAction('+', modelWithBuffer);
        expect(result.registerA).toBe(5);
      });
    });
  });
});
