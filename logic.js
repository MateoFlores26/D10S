// DOM Elements
const valueEl = document.querySelector('.value'); // Selección del elemento que muestra el valor actual en la calculadora

const acEl = document.querySelector('.ac'); // Selección del elemento para borrar la operación actual en la calculadora
const squareEl = document.querySelector('.square'); // Nuevo elemento para la operación de elevar al cuadrado
const squareRootEl = document.querySelector('.square-root'); // Nuevo elemento para la operación de raíz cuadrada

const additionEl = document.querySelector('.addition'); // Selección del elemento para la operación de suma
const subtractionEl = document.querySelector('.subtraction'); // Selección del elemento para la operación de resta
const multiplicationEl = document.querySelector('.multiplication'); // Selección del elemento para la operación de multiplicación
const divisionEl = document.querySelector('.division'); // Selección del elemento para la operación de división
const equalEl = document.querySelector('.equal'); // Selección del elemento para obtener el resultado de la operación

const decimalEl = document.querySelector('.decimal'); // Selección del elemento para añadir un punto decimal
const number0El = document.querySelector('.number-0'); // Selección del elemento para el número 0
const number1El = document.querySelector('.number-1'); // Selección del elemento para el número 1
const number2El = document.querySelector('.number-2'); // Selección del elemento para el número 2
const number3El = document.querySelector('.number-3'); // Selección del elemento para el número 3
const number4El = document.querySelector('.number-4'); // Selección del elemento para el número 4
const number5El = document.querySelector('.number-5'); // Selección del elemento para el número 5
const number6El = document.querySelector('.number-6'); // Selección del elemento para el número 6
const number7El = document.querySelector('.number-7'); // Selección del elemento para el número 7
const number8El = document.querySelector('.number-8'); // Selección del elemento para el número 8
const number9El = document.querySelector('.number-9'); // Selección del elemento para el número 9
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El
]; // Array de elementos para los números

// variables
let valueStrInMemory = null; // Variable para almacenar el valor en memoria
let operatorInMemory = null; // Variable para almacenar el operador en memoria

// Functions
const getValueAsStr = () => valueEl.textContent.split(',').join(''); // Función para obtener el valor como cadena

const getValueAsNum = () => {
  return parseFloat(getValueAsStr()); // Función para obtener el valor como número
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    valueEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
}; // Función para establecer una cadena como valor

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
}; // Función para manejar el clic en un número

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
}; // Función para obtener el resultado de la operación como cadena

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
}; // Función para manejar el clic en un operador matemático

// Add Event Listeners to functions
acEl.addEventListener('click', () => {
  setStrAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
}); // Evento al hacer clic en AC (limpiar la calculadora)
squareEl.addEventListener('click', () => { // Evento al hacer clic en el botón para elevar al cuadrado
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum * currentValueNum;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});
squareRootEl.addEventListener('click', () => { // Evento al hacer clic en el botón para raíz cuadrada
  const currentValueNum = getValueAsNum();
  const newValueNum = Math.sqrt(currentValueNum);
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// Add event listeners to operators
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
}); // Evento al hacer clic en el botón de suma
subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
}); // Evento al hacer clic en el botón de resta
multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
}); // Evento al hacer clic en el botón de multiplicación
divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
}); // Evento al hacer clic en el botón de división
equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
}); // Evento al hacer clic en el botón de igual (=)

// Add Event Listeners to numbers and decimal
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
} // Eventos al hacer clic en los botones de los números y el decimal

decimalEl.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
}); // Evento al hacer clic en el botón decimal (punto)



