flatpickr('.flatpickr', {
  wrap: true,
  dateFormat: 'd/m/Y',
  defaultDate: [new Date()],
});

const datePayment = document.querySelector('input[type="date"]'),
  button = document.querySelector('.button'),
  cashBtn = document.querySelector('.cash'),
  form = document.querySelector('form'),
  money = document.querySelector('.money'),
  period = document.querySelector('.period'),
  outputSum = document.querySelector('.output__sum'),
  outputYears = document.querySelector('.output__years'),
  monthPayment = document.querySelector('.monthly_payment'),
  percentOutput = document.querySelector('.percent__output'),
  calendar = document.querySelector('.calendar'),
  transferBtn = document.querySelector('.transfer'),
  responseOutput = document.querySelector('.response__output'),
  responseRepay = document.querySelector('.response__repay');

let percent = 4.95;
const today = new Date();
const finalDate = new Date(today);
finalDate.setMonth(today.getMonth() + 3);

money.addEventListener('input', () => {
  const getMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  }).format(money.value);
  outputSum.textContent = getMoney;

  responseOutput.textContent = getMoney;

  let value = money.value;
  value = (value * 100) / 20000;
  money.style.background = `-webkit-linear-gradient(left, #54d4a0 0%, #54d4a0 ${value}%,#f0f0f0 ${value}%, #f0f0f0 100%)`;

  showMonthPayment();
});

period.addEventListener('input', () => {
  if (period.value == 1) {
    outputYears.textContent = `${period.value} year`;
  } else {
    outputYears.textContent = `${period.value} years`;
  }

  let value = period.value;
  value = (value * 100) / 15;
  period.style.background = `-webkit-linear-gradient(left, #54d4a0 0%, #54d4a0 ${value}%,#f0f0f0 ${value}%, #f0f0f0 100%)`;

  showMonthPayment();
});

calendar.addEventListener('input', () => {
  countPercent();

  percentOutput.textContent = `${percent}%`;

  showMonthPayment();
});

cashBtn.addEventListener('input', () => {
  countPercent();
  if (cashBtn.checked) {
    percentOutput.textContent = `${percent}%`;
  }

  showMonthPayment();
});

transferBtn.addEventListener('input', () => {
  if (transferBtn.checked) {
    countPercent();
    percentOutput.textContent = `${percent}%`;
  }

  showMonthPayment();
});

function countMonthlyPayment() {
  let s = +money.value;
  let r = +percent / 100 / 12;
  let n = +period.value * 12;

  const result = s * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));

  console.log(result.toFixed(2));
  console.log(+money.value);
  console.log(+percent / 12);
  console.log(+period.value * 12);

  return result.toFixed(2);
}

function countPercent() {
  let newCalendarValue = calendar.value.split('/').reverse().join(',');
  console.log(newCalendarValue);
  let inputDapositeDate = new Date(newCalendarValue);
  console.log(inputDapositeDate);

  if (inputDapositeDate > finalDate) {
    percent = 6.8;
  } else {
    percent = 4.95;
  }

  if (cashBtn.checked) {
    percent = percent - 0.5;
  }
}

function showMonthPayment() {
  countPercent();

  countMonthlyPayment();

  monthPayment.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  }).format(countMonthlyPayment());

  //   responseOutput.textContent = countMonthlyPayment();

  let allSum = (countMonthlyPayment() * (+period.value * 12)).toFixed(2);

  responseRepay.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  }).format(allSum);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //   countPercent();

  //   countMonthlyPayment();

  //   monthPayment.textContent = countMonthlyPayment();

  //   responseOutput.textContent = countMonthlyPayment();

  //   let allSum = countMonthlyPayment() * (+period.value * 12);

  //   responseRepay.textContent = allSum.toFixed(2);
});
