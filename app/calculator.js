const DEBUG = false;

const calculator = {
  buffer: '0',
  operation: null,
  actions: [],
  registerA: 0,
  registerB: 0
};

const actions = {
  '/': divide,
  '*': multiply,
  '-': subtract,
  '+': add,
  '=': equals,
  'AC': clearAll,
  'CE': clearEntry
};

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (DEBUG) console.log(calculator);
    
    const clicked = btn.textContent;
    
    // if a clear action was clicked
    if (clicked === 'AC' || clicked === 'CE'){
      actions[clicked]();
      return;
    }
    
    // if any other type of action was clicked
    if (actions[clicked]) {
      // if nothing in the buffer and registerA do nothing
      if (calculator.registerA === 0 && calculator.buffer === '0'){
        return;
      } 
      
      // if we have an operation set 
      if (calculator.operation){
        calculator.registerB = parseInt(calculator.buffer);
        calculator.actions.push(calculator.registerB.toString(), clicked);
        actions[calculator.operation]();
        calculator.operation = null;
        if (clicked === '='){
          // output current result
          calculator.buffer = calculator.registerA;
          calculator.actions.push(calculator.registerA.toString());
        }
        updateDisplay();
        calculator.buffer = '0';
      } else if (calculator.registerA !== 0){
        // convert buffer to number
        calculator.operation = clicked;
        if (calculator.actions.length){
          calculator.actions.push(clicked);
        } else {
          calculator.actions.push(calculator.buffer, clicked);
        }
        updateDisplay();
        
      // nothing in registerA 
      // convert buffer to registerA
      } else {
        calculator.registerA = parseInt(calculator.buffer);
        calculator.operation = clicked;
        calculator.actions.push(calculator.buffer, calculator.operation);
        calculator.buffer = '0';
        updateDisplay();
      }
      
    // number clicked
    // update the buffer
    } else {
      if (calculator.buffer === '0') {
        calculator.buffer = clicked;
      } else {
        calculator.buffer += clicked;
      }
      updateDisplay();
    }
  });
});

function divide() {
  calculator.registerA = calculator.registerA / calculator.registerB;
  calculator.registerB = 0;
}

function multiply() {
  calculator.registerA = calculator.registerA * calculator.registerB;
  calculator.registerB = 0;
}

function subtract(){
  calculator.registerA = calculator.registerA - calculator.registerB;
  calculator.registerB = 0;
}

function add(){
  calculator.registerA = calculator.registerA + calculator.registerB;
  calculator.registerB = 0;
}

function equals(){
  const main = document.querySelector('#display-main-text');
  main.textContent = calculator.registerB;
}

function clearAll() {
  calculator.buffer = '0';
  calculator.registerA = 0;
  calculator.registerB = 0;
  calculator.actions = [];
  calculator.operation = null;
  updateDisplay();
}

function clearEntry(){
  calculator.buffer = '0';
  updateDisplay();
}

function updateDisplay() {
  const main = document.querySelector('#display-main-text');
  const actions = document.querySelector('#display-sub-text');
  main.textContent = calculator.buffer;
  if (calculator.actions.length) {
    actions.textContent = calculator.actions.join('');
  } else {
    actions.textContent = '0';
  }
}