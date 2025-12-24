const display = document.getElementById("display");
const historyList = document.getElementById("history");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

async function calculate() {
  if (!display.value) return;

  try {
    const res = await fetch("/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: display.value })
    });

    const data = await res.json();

    if (historyList) {
      addToHistory(display.value, data.result);
    }

    display.value = data.result;
  } catch (err) {
    display.value = "Error";
  }
}

// Keyboard support
const bodyy=document.body
bodyy.addEventListener("keydown", (e) => {
  const allowed = "0123456789+-*/.%";

  if (allowed.includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key === "Escape") {
    e.preventDefault();
    clearDisplay();
  }
});

// History
function addToHistory(exp, result) {
  const li = document.createElement("li");
  li.textContent = `${exp} = ${result}`;
  historyList.prepend(li);
}
