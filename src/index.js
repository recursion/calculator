import inputNumber from './inputNumber';
import inputAction from './inputAction';
import { clone } from './actions';
import model from './model';


const updateDisplay = (calc) => {
  const main = document.querySelector('#display-main-text');
  const actions = document.querySelector('#display-sub-text');
  main.textContent = calc.buffer;
  if (calc.actions.length) {
    actions.textContent = calc.actions.join('');
  } else {
    actions.textContent = '0';
  }
};

// setup our local model
let myCalc = clone(model);

const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const clicked = btn.textContent;
    if (!Number.isNaN(parseInt(clicked, 10))) {
      myCalc = inputNumber(clicked, myCalc);
    } else {
      myCalc = inputAction(clicked, myCalc);
    }
    console.log(myCalc);
    updateDisplay(myCalc);
  });
});
