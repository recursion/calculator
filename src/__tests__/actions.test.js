import inputAction from '../inputAction';

describe('Actions: ', () => {
  describe('(CE) Clear Entry', () => {
    test('It clears only the last entry', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const result = inputAction('CE', startingModel);
      expect(result.registerA).toBe(5);
      expect(result.buffer).toBe('0');
    });
  });
  describe('(AC) Clear All.', () => {
    test('It clears the entire model.', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const result = inputAction('AC', startingModel);
      expect(result.registerA).toBe(0);
      expect(result.registerB).toBe(0);
      expect(result.buffer).toBe('0');
      expect(result.actions).toEqual([]);
      expect(result.operation).toBe(null);
    });
  });
  describe('(=)  Equals', () => {
    test('it sets the buffer to the result of the operation.', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const result = inputAction('=', startingModel);
      expect(result.registerA).toBe(60);
      expect(result.buffer).toBe('60');
    });
    test('it adds the results to the actions list', () => {
      const startingModel = {
        buffer: '55',
        registerA: 5,
        registerB: 0,
        operation: '+',
        actions: ['5', '+'],
      };
      const result = inputAction('=', startingModel);
      expect(result.actions).toEqual(['5', '+', '55', '=', '60']);
    });
  });
  describe('(+)  Plus', () => {
    test('It adds 2 numbers.', () => {
      const startingModel = {
        buffer: '55',
        registerA: 55,
        registerB: 0,
        operation: '+',
        actions: ['55', '+'],
      };
      const result = inputAction('=', startingModel);
      expect(result.registerA).toBe(110);
      expect(result.buffer).toBe('110');
    });
  });
  describe('(/)  Divide.', () => {
    test('It divides 2 numbers.', () => {
      const startingModel = {
        buffer: '5',
        registerA: 100,
        registerB: 0,
        operation: '/',
        actions: ['100', '/'],
      };
      const result = inputAction('=', startingModel);
      expect(result.registerA).toBe(20);
      expect(result.buffer).toBe('20');
    });
    test('It sets the buffer to error on divide by 0.', () => {
      const startingModel = {
        buffer: '0',
        registerA: 100,
        registerB: 0,
        operation: '/',
        actions: ['100', '/'],
      };
      const result = inputAction('=', startingModel);
      expect(result.registerA).toBe(100);
      expect(result.buffer).toBe('Error');
    });
  });
  describe('(*)  Multiply.', () => {
    test('it  multiplies 2 numbers.', () => {
      const startingModel = {
        buffer: '5',
        registerA: 10,
        registerB: 0,
        operation: '*',
        actions: ['10', '*'],
      };
      const result = inputAction('=', startingModel);
      expect(result.registerA).toBe(50);
      expect(result.buffer).toBe('50');
    });
  });
  describe('(-)  Subtract', () => {
    test('it subtracts 2 numbers.', () => {
      const startingModel = {
        buffer: '5',
        registerA: 10,
        registerB: 0,
        operation: '-',
        actions: ['10', '-'],
      };
      const result = inputAction('=', startingModel);
      expect(result.registerA).toBe(5);
      expect(result.buffer).toBe('5');
    });
  });
});
