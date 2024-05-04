document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderCryptoTable(data))
    .catch(error => console.error('Error fetching data:', error));
}

function renderCryptoTable(data) {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';
  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${crypto.name}</td>
      <td>${crypto.symbol}</td>
      <td>${crypto.current_price}</td>
      <td>${crypto.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.getElementById('searchButton').addEventListener('click', search);
document.getElementById('sortByMarketCap').addEventListener('click', sortByMarketCap);
document.getElementById('sortByPercentageChange').addEventListener('click', sortByPercentageChange);

function search() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const tableRows = document.querySelectorAll('#cryptoTableBody tr');
  tableRows.forEach(row => {
    const name = row.querySelector('td:first-child').innerText.toLowerCase();
    const symbol = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
    if (name.includes(searchText) || symbol.includes(searchText)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function sortByMarketCap() {
  const tableBody = document.getElementById('cryptoTableBody');
  const rows = Array.from(tableBody.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const aMarketCap = parseFloat(a.querySelector('td:nth-child(3)').innerText);
    const bMarketCap = parseFloat(b.querySelector('td:nth-child(3)').innerText);
    return bMarketCap - aMarketCap;
  });
  rows.forEach(row => tableBody.appendChild(row));
}

function sortByPercentageChange() {
  const tableBody = document.getElementById('cryptoTableBody');
  const rows = Array.from(tableBody.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const aPercentageChange = parseFloat(a.querySelector('td:nth-child(4)').innerText);
    const bPercentageChange = parseFloat(b.querySelector('td:nth-child(4)').innerText);
    return bPercentageChange - aPercentageChange;
  });
  rows.forEach(row => tableBody.appendChild(row));
}