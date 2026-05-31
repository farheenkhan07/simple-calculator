// This holds everything the user has typed, e.g. "12+5"
let expression = '';

// Grab the two display elements from the HTML
const resultEl    = document.getElementById('result');
const expressionEl = document.getElementById('expression');

// Called when the user clicks a number or operator button
function input(value) {
  expression += value;                        // add the button's value to the expression
  expressionEl.textContent = expression;      // show the full expression at the top
  resultEl.textContent     = expression;      // mirror it on the main display while typing
}

// Called when the user clicks "="
function calculate() {
  if (expression === '') return;             // do nothing if there's nothing to calculate

  try {
    let result = eval(expression);           // evaluate the math expression, e.g. "12+5" → 17
    expressionEl.textContent = expression + ' =';  // show "12+5 =" at the top
    resultEl.textContent     = result;             // show the answer on the main display
    expression = String(result);                   // let the user continue from the result
  } catch (error) {
    resultEl.textContent = 'Error';          // show Error if the expression is invalid
    expression = '';                         // reset so the user can start over
  }
}

// Called when the user clicks "AC" (All Clear)
function clearAll() {
  expression               = '';
  expressionEl.textContent = '';
  resultEl.textContent     = '0';
}

// Called when the user clicks "⌫" (Backspace / Delete last character)
function deleteLast() {
  expression               = expression.slice(0, -1);   // remove the last character
  expressionEl.textContent = expression;
  resultEl.textContent     = expression || '0';          // show 0 when expression is empty
}

// Keyboard support — so the user can also type on their keyboard
document.addEventListener('keydown', function(e) {
  if (e.key >= '0' && e.key <= '9') input(e.key);   // number keys 0-9
  else if (e.key === '+') input('+');
  else if (e.key === '-') input('-');
  else if (e.key === '*') input('*');
  else if (e.key === '/') { e.preventDefault(); input('/'); }  // prevent browser's quick-find
  else if (e.key === '.') input('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape')    clearAll();
});
