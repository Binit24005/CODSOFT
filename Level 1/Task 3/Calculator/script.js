const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "clear") {
      currentInput = "";
      display.textContent = "0";
    } else if (action === "delete") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
    } else if (action === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.textContent = currentInput;
        resultDisplayed = true;
      } catch (error) {
        display.textContent = "Error";
        currentInput = "";
      }
    } else if (action === "percent") {
      try {
        currentInput = (eval(currentInput) / 100).toString();
        display.textContent = currentInput;
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else {
      if (resultDisplayed && !["+", "-", "*", "/"].includes(action)) {
        currentInput = action;
        resultDisplayed = false;
      } else {
        currentInput += action;
      }
      display.textContent = currentInput;
    }
  });
});
