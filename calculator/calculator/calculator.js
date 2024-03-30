var operators = ['+', '-', '*', '/','^', 'sqrt'];
var lastChar = '';

//鍵盤
document.addEventListener('keydown', function(event) {
    var key = event.key;
    var cursorPosition = parseInt(display.dataset.cursorPosition || 0);
    if (key.match(/[0-9\/\*\-\+=]|Enter|Backspace|c|e/)) {
        display.style.backgroundImage = "none";
        if (key === 'Enter') {
            event.preventDefault();
            calculate();
            btn.click();
        } else if (key === 'Backspace') {
            deleteLastChar();
        }else if (key === 'c') {
            clearDisplay()
        }else if (document.activeElement === display && key !== 'Backspace') {
            return;
        }
        else {
            var currentValue = display.value;
            var newValue = currentValue.slice(0, cursorPosition) + key + currentValue.slice(cursorPosition);
            display.value = newValue;
            display.dataset.cursorPosition = cursorPosition + 1;
        }
    }
});
// document.getElementById("display").addEventListener("keydown", function(event) {
//     var allowedKeys = /[0-9\/\*\-\+=]|Enter|Backspace|c|e/;
//     var key = event.key;
//     if (!allowedKeys.test(key)) {
//         event.preventDefault();
//     }
// });
//Backspace
function deleteLastChar() {
    var display = document.getElementById('display');
    if (document.activeElement === display) {
        return;
    }
    var currentValue = display.value;
    document.getElementById("display").focus();
    display.value = currentValue.slice(0, -1);
    lastChar = currentValue.slice(-2, -1); 
}
var display = document.getElementById('display');

display.addEventListener('input', function() {
    display.style.backgroundImage = 'none'; 
});

function addToDisplay(value) {
    var display = document.getElementById('display');
    var allowedChars = /[0-9\+\-\*\/\(\)\.^]|π|√|e|/;
    var cursorPosition = display.selectionStart;
    var textToInsert = value; // 要插入的文字
    var currentValue = display.value;
    var newValue = currentValue.substring(0, cursorPosition) + textToInsert + currentValue.substring(cursorPosition);
    display.value = newValue;    
    var newCursorPos = cursorPosition + textToInsert.length;
    display.setSelectionRange(newCursorPos, newCursorPos); 
    document.getElementById("display").focus();
    if (!allowedChars.test(value)) {
        return;
    }
    if (display.value === '' && (value === '(' || value === 'π' || (value >= '0' && value <= '9')||value === 'e' && lastChar === 'e')) {
        display.value += value;
        lastChar = value;
        return;
    }
    if ((display.value === '' && value === '*') || (lastChar === '(' && value === '*') || (lastChar === 'π' && value === '*')|| (lastChar === 'e' && value === '*')) {
        return;
    }
    if (display.value === '' && (value === '/' || value === '*'|| value === '.'|| value === ')')) {
        return;
    }
    display.style.backgroundImage = 'none';
    lastChar = value;
    display.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
}

function calculate() {
    var display = document.getElementById('display');
    var expression = display.value;
    if (expression.lastIndexOf('(') > expression.lastIndexOf(')')) {
        expression += ')';
    }
    if (expression.indexOf('(') === -1) {
        expression = expression.replace(/\)/g, '');
    }
    if (expression.charAt(0) === '*') {
        expression = expression.slice(1);
    }

    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/√/g, 'Math.sqrt');
    expression = expression.replace(/π/g, '3.14');
    expression = expression.replace(/e/g, '2.718');

    try {
        if (expression.trim() === '') {
            return;
        }
        var result = eval(expression);
        if (result === undefined) {
            display.value = 'Error';
        } else {
            if (result % 1 !== 0) {
                result = parseFloat(result.toFixed(3));
            }
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
    if (display.value === 'Error') {
        display.value = '';
    }
    display.placeholder = ""
    display.style.backgroundImage = "none";
}

//C
function clearDisplay() {
    document.getElementById('display').value = '';
    display.style.backgroundImage = "none";
}
//次方
function customPower() {
    var display = document.getElementById('display');
    var currentValue = display.value;
    var powerIndex = currentValue.indexOf('^');
    document.getElementById("display").focus();
    if (currentValue.indexOf('^') === -1 && currentValue !== "") {
        var powerIndex = currentValue.indexOf('^');
        display.value += "^";
        if (powerIndex !== -1) { 
            var base = currentValue.substring(0, powerIndex); 
            var exponent = currentValue.substring(powerIndex + 1); 
            if (!isNaN(base) && !isNaN(exponent)) { 
                var result = Math.pow(parseFloat(base), parseFloat(exponent)); 
                display.value = result;
            }
        }
    }
}
//根號
function squareRoot() {
    var display = document.getElementById('display');
    var currentValue = display.value;
    document.getElementById("display").focus();
    if (currentValue !== "" && !isNaN(currentValue[currentValue.length - 1])) {
        display.value += "*√(";
    } 
    else {
        display.value += "√(";
    }
}
function pi() {
    var display = document.getElementById('display');
    var currentValue = display.value;
    document.getElementById("display").focus();
    if (currentValue !== "" && !isNaN(currentValue[currentValue.length - 1])) {
        display.value += "*π";
    } 
    else {
        display.value += "π";
    }
}
function lparentheses() {
    var display = document.getElementById('display');
    var currentValue = display.value;
    document.getElementById("display").focus();
    if (currentValue !== "" && !isNaN(currentValue[currentValue.length - 1])) {
        display.value += "*(";
    } 
    else {
        display.value += "(";
    }
}
function Euler() {
    var display = document.getElementById('display');
    var currentValue = display.value;
    document.getElementById("display").focus();
    if (currentValue !== "" && !isNaN(currentValue[currentValue.length - 1])) {
        display.value += "*e^-";
    } 
    else {
        display.value += "e^-";
    }
}

var display=document.getElementById("display");
var btn=document.getElementById("btn");
var sum=document.getElementById("sum");
var clearDisplayEnabled = true;

btn.addEventListener("click", function() {
    sum.innerHTML = sum.innerHTML + `
    <div class="pcontent">
        <p>${display.value}</p>
    </div>
    `;
    if (clearDisplayEnabled) {
        display.value = "";
    }
});

// 保留切換按鈕
toggle.addEventListener("click", function() {
    clearDisplayEnabled = !clearDisplayEnabled;
    if (clearDisplayEnabled) {
        switchBtn.textContent = "Disable Clear";
    } else {
        switchBtn.textContent = "Enable Clear";
    }
});

var bun = document.getElementById("bun");
bun.addEventListener("click", function() {
    var sum = document.getElementById("sum");
    sum.innerHTML = "";
});

var I = document.getElementById("I");
I.addEventListener("click", function() {
    display.value = "  /";
    display.style.backgroundImage = "url('p/I.png')";
    display.style.backgroundSize = "40px";
    display.style.backgroundRepeat = "no-repeat";
    display.style.backgroundPosition = "left 0px  center ";
});



function changeColor(button) {
  var buttons = document.querySelectorAll('.sub-menu input[type="button"]');
  buttons.forEach(function(btn) {
    if (btn === button) {
      btn.style.backgroundColor = '#d8f4f6'; 
    } else {
      btn.style.backgroundColor = ''; 
    }
  });
}


const subMenus = document.querySelectorAll('.menu .sub-menu');

subMenus.forEach(subMenu => {
  subMenu.parentElement.querySelector('a').addEventListener('click', () => {
    if (subMenu.classList.contains('active')) {
      subMenu.classList.remove('active');
    } else {
      subMenu.classList.add('active');
    }
  });
});
document.querySelectorAll('.sub-menu input[type="button"]').forEach(function(button) {
  button.addEventListener('click', function() {
    changeColor(this); 
  });
});


