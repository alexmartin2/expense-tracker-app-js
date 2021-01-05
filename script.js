const overallBalance = document.getElementById('overall-balance');
const income = document.getElementById('income');
const expenses = document.getElementById('expenses');
const transactionList = document.getElementById('transaction-list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const form = document.getElementById('transaction-form');
const deleteBtn = document.getElementById('delete-btn');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function init() {
  transactionList.innerHTML = "";
  transactions.forEach(transaction => addTransactionToDOM(transaction));
  getTotal();
  getIncome();
  getExpenses();
}

init();

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function getTotal() {
  let total = 0;
  transactions.forEach(transaction => {
    total += transaction.amount;
  })
  if (total < 0) {
    overallBalance.innerText = "-$" + (Math.abs(total)).toFixed(2);
  } else {
    overallBalance.innerText = "$" + total.toFixed(2);
  }
}

function getIncome() {
  let incomeTotal = 0;
  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      incomeTotal += transaction.amount;
    }
  });
  income.innerText = "$" + incomeTotal.toFixed(2);
}

function getExpenses() {
  let expensesTotal = 0;
  transactions.forEach(transaction => {
    if (transaction.amount < 0) {
      expensesTotal += transaction.amount;
    }
  })
  expenses.innerText = "$" + (Math.abs(expensesTotal)).toFixed(2);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const transaction = {};
  if (textInput.value === "" || amountInput.value === "") {
    alert("Please fill in all fields!")
  } else {
    transaction.id = Math.floor(Math.random() * 100000000);
    transaction.text = textInput.value;
    transaction.amount = Number(amountInput.value);
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateLocalStorage();
    getTotal();
    getIncome();
    getExpenses();
    textInput.value = "";
    amountInput.value = "";
  }
});

transactionList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.parentElement.remove();
    transactions = transactions.filter(transaction => transaction.id != e.target.id);
    updateLocalStorage();
    getTotal();
    getIncome();
    getExpenses();
  }
});



function addTransactionToDOM(transaction) {
  const li = document.createElement("li");
  const sign = transaction.amount > 0 ? "plus" : "minus";
  li.innerHTML = `
    <div class="transaction-name-and-delete">
      <a href="#" class="delete-btn" id="${transaction.id}">X</a>
      <p id="transaction-name">${transaction.text}</p>
    </div>
    <div class="transaction-amount ${sign}" id="transaction-amount">$${Math.abs(transaction.amount)}</div>
  `
  transactionList.appendChild(li);
}




