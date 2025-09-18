const calculations = [];

function calculate() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const op = document.getElementById("operator").value;
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    result = "Error: Not a number";
  } else {
    switch(op) {
      case "+": result = num1 + num2; break;
      case "-": result = num1 - num2; break;
      case "*": result = num1 * num2; break;
      case "/": result = num2 !== 0 ? num1 / num2 : "Error: divide by 0"; break;
      case "%": result = num2 !== 0 ? num1 % num2 : "Error: divide by 0"; break;
      default: result = "Error: invalid operator";
    }
  }

  // Save the calculation
  calculations.push({ num1, num2, op, result });

  // Add to results table
  const table = document.getElementById("resultsTable");
  const row = table.insertRow();
  row.insertCell(0).innerText = num1;
  row.insertCell(1).innerText = op;
  row.insertCell(2).innerText = num2;
  row.insertCell(3).innerText = result;

  // Update summary
  updateSummary();
}

function updateSummary() {
  const numericResults = calculations
    .map(c => c.result)
    .filter(r => typeof r === "number");

  const summaryTable = document.getElementById("summaryTable");

  // Remove old row if exists
  if (summaryTable.rows.length > 1) {
    summaryTable.deleteRow(1);
  }

  if (numericResults.length > 0) {
    const min = Math.min(...numericResults);
    const max = Math.max(...numericResults);
    const total = numericResults.reduce((a, b) => a + b, 0);
    const avg = total / numericResults.length;

    const row = summaryTable.insertRow();
    row.insertCell(0).innerText = min;
    row.insertCell(1).innerText = max;
    row.insertCell(2).innerText = avg.toFixed(2);
    row.insertCell(3).innerText = total;
  }
}

function clearFields() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("operator").value = "+";
}
