// import flatpickr from 'flatpickr';
// const flatpickr = requires('flatpickr');
// flatpickr('.flatpickr', { wrap: true });

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
  calendar = document.querySelector('.date'),
  transferBtn = document.querySelector('.transfer'),
  responseOutput = document.querySelector('.response__output'),
  responseRepay = document.querySelector('.response__repay');

let percent = 4.95;
const today = new Date();
const finalDate = new Date(today);
finalDate.setMonth(today.getMonth() + 3);

money.addEventListener('input', () => {
  const getMoney = new Intl.NumberFormat().format(money.value);
  outputSum.textContent = `£${getMoney}.00`;

  let value = money.value;
  value = (value * 100) / 20000;
  money.style.background = `-webkit-linear-gradient(left, #54d4a0 0%, #54d4a0 ${value}%,#f0f0f0 ${value}%, #f0f0f0 100%)`;
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
});

calendar.addEventListener('input', () => {
  countPercent();

  percentOutput.textContent = `${percent}%`;
});

cashBtn.addEventListener('input', () => {
  countPercent();
  if (cashBtn.checked) {
    percentOutput.textContent = `${percent}%`;
  }
});

transferBtn.addEventListener('input', () => {
  if (transferBtn.checked) {
    countPercent();
    percentOutput.textContent = `${percent}%`;
  }
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
  let inputDapositeDate = new Date(datePayment.value);

  if (inputDapositeDate > finalDate) {
    percent = 6.8;
  } else {
    percent = 4.95;
  }

  if (cashBtn.checked) {
    percent = percent - 0.5;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  countPercent();

  countMonthlyPayment();

  monthPayment.textContent = countMonthlyPayment();

  responseOutput.textContent = countMonthlyPayment();

  let allSum = countMonthlyPayment() * (+period.value * 12);

  responseRepay.textContent = allSum.toFixed(2);
});
