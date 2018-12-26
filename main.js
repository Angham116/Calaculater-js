

var input = document.getElementById('input');        // input and output
var number = document.querySelectorAll('.num');  // number 
var operator = document.querySelectorAll('.op');   // operator 
var result = document.getElementById('output');        // equal 
var clear = document.getElementById('clear');          // clear
var resultDisplayed = false;                           // the output is displayed


// add click event to num
  for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
      // if result is currently displayed and user pressed an operator keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {

      // if result is currently displayed and user pressed a number clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// add click event to operator button
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator replace it with the current op 
    if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {

      // if first key pressed is an opearator dont do anything
    } else {
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// click on equal
result.addEventListener("click", function() {

 
  var inputString = input.innerHTML;

  // forming an array of numbers
  var numbers = inputString.split(/\+|\-|\*|\//g);

  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  // console.log(inputString);
  // console.log(operators);
  // console.log(numbers);



  var divide = operators.indexOf("/");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("/");
  }

  var multiply = operators.indexOf("*");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("*");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {

    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; 
});

// clearing the input when press of clear button
clear.addEventListener("click", function() {
  input.innerHTML = "";
})