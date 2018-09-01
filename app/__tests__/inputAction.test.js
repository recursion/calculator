import { model } from '../calculator';
import inputAction from '../inputAction';
import inputNumber from '../inputNumber';

describe('inputAction', () => {
  test('it does nothing if the registers and buffer are empty', () => {
    // TODO: It should actually allow a (-)
    // since we may want to indicate a negative number
    expect(inputAction('+', model)).toEqual(model);
  });
  test('it throws an error if something other than a string is passed in.', () => {
    const t = () => inputAction(5, model);
    const tt = () => inputAction({}, model);
    const ttt = () => inputAction([], model);
    expect(ttt).toThrow(TypeError);
    expect(tt).toThrow(TypeError);
    expect(t).toThrow(TypeError);
  });
  test('it throws an error if something other than one of the accepted strings is used.', () => {
    const t = () => inputAction('FU', model);
    expect(t).toThrow(TypeError);
  });
  describe('both registers are 0', () => {
    test('it sets registerA to the value in the buffer', () => {
      const modelWithBuffer = inputNumber('5', model);
      const result = inputAction('+', modelWithBuffer);
      expect(result.registerA).toBe(5);
    });
    test('it clears the buffer.', () => {
      const modelWithBuffer = inputNumber('5', model);
      const result = inputAction('+', modelWithBuffer);
      expect(result.buffer).toBe('0');
    });
    test('it adds the buffer and the action to list of actions', () => {
      const modelWithBuffer = inputNumber('5', model);
      const result = inputAction('+', modelWithBuffer);
      expect(result.actions).toEqual(['5', '+']);
    });
    test('it sets the operation to this action if something other than AC, CE, or =', () => {
      const modelWithBuffer = inputNumber('5', model);
      const result = inputAction('+', modelWithBuffer);
      expect(result.operation).toEqual('+');
    });
  });
  describe('registerA is not 0, but registerB is.', () => {
    test('it resets the buffer', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const action = inputAction('+', startingModel);
      expect(action.buffer).toBe('0');
    });
    describe('action is not =, AC, CE', () => {
      test('it calls the previously set operation on registerA and registerB, and sets the result to registerA', () => {
        const startingModel = {
          buffer: '55',
          registerA: 5,
          registerB: 0,
          operation: '+',
          actions: ['5', '+'],
        };
        const action = inputAction('*', startingModel);
        expect(action.registerA).toBe(60);
      });
    });
    test('it adds the buffer and the action to list of actions', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const final = inputAction('+', startingModel);
      expect(final.actions).toEqual(['5', '+', '55', '+']);
      expect(final.registerA).toBe(60);
    });
    test('it processes multiple sequences of numbers and actions', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const n = inputAction('+', startingModel);
      expect(n.registerA).toBe(60);
      const n1 = inputNumber('10', n);
      const n2 = inputAction('-', n1);
      expect(n2.registerA).toBe(70);
      expect(n2.actions).toEqual(['5', '+', '55', '+', '10', '-']);
      const n3 = inputNumber('60', n2);
      const n4 = inputAction('*', n3);
      expect(n4.registerA).toBe(10);
      expect(n4.actions).toEqual(['5', '+', '55', '+', '10', '-', '60', '*']);
    });
  });
});
