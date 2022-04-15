const screen = document.querySelector(".tela");
const currentOperationELM = document.querySelector(".current-operation");
const calculator = document.querySelector(".calculator");

let previousOperation = null;
let mathCurrent = 0;
let buffer = "";

calculator.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const value = e.target.innerText;
    if (isNaN(Number(value)) && value !== ",") {
      handleSymbol(value);
    } else {
      if (buffer === "0") buffer = value;
      else {
        if (buffer.includes(".")) {
          buffer += value.replace(",", "");
        } else {
          buffer += value.replace(",", ".");
        }
      }
    }

    render();
  }
});

function handleSymbol(value) {
  const symbols = {
    "=": () => {
      if (previousOperation === null) return;
      flushOperation(Number(buffer));
      buffer = String(mathCurrent);
      previousOperation = null;
    },
    C: () => {
      deepClean();
    },
    CE: () => {
      buffer = "0";
    },
    "[x]": () => {
      if (buffer.length === 1) buffer = "0";
      else buffer = buffer.substring(0, buffer.length - 1);
    },
  };

  const mathSymbol = symbols[value];
  if (mathSymbol) mathSymbol();
  else handleMath(value);
}

function handleMath(value) {
  const intBuffer = Number(buffer);
  if (mathCurrent === 0) {
    mathCurrent = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperation = value;
  buffer = "0";
}

function flushOperation(buffer) {
  const mathSignals = {
    "+": () => {
      mathCurrent += buffer;
    },
    "-": () => {
      mathCurrent -= buffer;
    },
    x: () => {
      mathCurrent *= buffer;
    },
    "÷": () => {
      mathCurrent /= buffer;
    },
  };

  const doMath = mathSignals[previousOperation];
  if (doMath) doMath();
}

function deepClean() {
  buffer = "0";
  mathCurrent = 0;
  previousOperation = null;
  currentOperationELM.innerHTML = "";
}

function render() {
  const signals = ["+", "-", "x", "÷"];

  if (!isNaN(mathCurrent) && signals.includes(previousOperation)) {
    currentOperationELM.innerHTML = `${mathCurrent} ${previousOperation} ${buffer} =`;
  }

  screen.value = Number(buffer) || buffer.includes(".") ? buffer : 0;
}
