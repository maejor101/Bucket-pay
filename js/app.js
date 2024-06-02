let walletBalance = 0;
let contributions = [];

function addFunds() {
  const amountInput = document.getElementById('amount');
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0) {
    walletBalance += amount;
    contributions.push(amount);
    updateBalance();
    updateContributionsChart();
    amountInput.value = '';
  }
}

function splitBill() {
  const billAmountInput = document.getElementById('billAmount');
  const numPeopleInput = document.getElementById('numPeople');
  const billAmount = parseFloat(billAmountInput.value);
  const numPeople = parseInt(numPeopleInput.value);

  if (!isNaN(billAmount) && billAmount > 0 && !isNaN(numPeople) && numPeople > 0) {
    const share = billAmount / numPeople;
    walletBalance -= billAmount;
    for (let i = 0; i < numPeople; i++) {
      contributions.push(-share);
    }
    updateBalance();
    updateContributionsChart();
    billAmountInput.value = '';
    numPeopleInput.value = '';
  }
}

function updateBalance() {
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = `$${walletBalance.toFixed(2)}`;
}

function updateContributionsChart() {
  const ctx = document.getElementById('contributionsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: contributions.map((_, index) => `Contribution ${index + 1}`),
      datasets: [{
        label: 'Contributions',
        data: contributions,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
