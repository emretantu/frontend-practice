'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function(mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov} EUR</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

const calcBalance = function (movements) {
  return movements.reduce((acc, mov) => acc + mov, 0);
}

const displayBalance = function (movements) {
  labelBalance.textContent = `${calcBalance(movements)} EUR`;
}

const calcIncome = function (movements) {
  return movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
}

const calcOut = function (movements) {
  return -movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
}

const calcInterest = function (account) {
  return account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);
}

const displaySummary = function (account) {
  labelSumIn.textContent = `${calcIncome(account.movements)} EUR`;
  labelSumOut.textContent = `${calcOut(account.movements)} EUR`;
  labelSumInterest.textContent = `${calcInterest(account)} EUR`;
}

const updateUI = function () {
  displayMovements(currentAccount.movements);
  displayBalance(currentAccount.movements);
  displaySummary(currentAccount);
}

const hideUI = function () {
  containerApp.style.opacity = "0";
}

const createUsernames = function (accounts) {
  accounts.forEach(function(acc) {
    acc.username = acc.owner
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0))
    .join("");
  });
}
createUsernames(accounts)

// Login
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = "1";
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI();
  }
});

// Transfer Money
btnTransfer.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  if (calcBalance(currentAccount.movements) >= amount && amount > 0) {
    const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
    if (receiverAccount !== currentAccount && receiverAccount !== undefined) {
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
      alert("Money transferred.");
      inputTransferTo.value = inputTransferAmount.value = "";
      updateUI();
    }
  }
});

// Request Loan
btnLoan.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  console.log(amount)
  if (currentAccount.movements.some(mov => mov > amount * 0.1)) {
    currentAccount.movements.push(amount);
    alert("Loan request accepted!");
    updateUI();
    inputLoanAmount.value = "";
    inputLoanAmount.blur();
  }
});

const deleteUser = function (account) {
  accounts.splice(accounts.findIndex((acc) => account === acc), 1);
}

// Close Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    deleteUser(currentAccount);
    hideUI();
  }
});

// Sorting Movement Rows
btnSort.addEventListener("click", function () {
  const orderedMovements = currentAccount.movements.map(mov => mov).sort((a,b) => a-b);
  let isSorted = Array.from(document.querySelectorAll(".movements__value"))
    .map(val => Number(val.innerText.split(" ")[0]))
    .every((val, i, arr) => {
      if (val >= arr[i+1]) {
        console.log(val, arr[i+1], "hey1", val >= arr[i+1]);
        return true;
      } else if (i + 1 >= arr.length) {
        console.log(val, arr[i+1], "hey2", i + 1 > arr.length);
        return true;
      }
      console.log(val, arr[i+1], "hey3");
      return false;
    });
  
  if (isSorted) {
    displayMovements(currentAccount.movements);
  } else {
    displayMovements(orderedMovements);
  }
  
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
