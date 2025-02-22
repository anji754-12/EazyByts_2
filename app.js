// Initialize portfolio data
let portfolio = {};

// Handle trade form submission
document.getElementById('tradeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const symbol = document.getElementById('stockSymbol').value.toUpperCase();
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const type = document.getElementById('transactionType').value;

    // Validate inputs
    if (quantity <= 0 || price <= 0) {
        alert('Quantity and Price must be positive numbers!');
        return;
    }

    // Process trade
    if (type === 'BUY') {
        buyStock(symbol, quantity, price);
    } else {
        sellStock(symbol, quantity, price);
    }

    // Update the portfolio display
    updatePortfolio();

    // Clear form
    document.getElementById('tradeForm').reset();
});

// Function to buy stocks
function buyStock(symbol, quantity, price) {
    if (!portfolio[symbol]) {
        portfolio[symbol] = { quantity: 0, totalCost: 0 };
    }

    // Update the portfolio
    portfolio[symbol].quantity += quantity;
    portfolio[symbol].totalCost += quantity * price;
}

// Function to sell stocks
function sellStock(symbol, quantity, price) {
    if (!portfolio[symbol] || portfolio[symbol].quantity < quantity) {
        alert(`Insufficient shares of ${symbol} to sell!`);
        return;
    }

    // Update portfolio after selling
    portfolio[symbol].quantity -= quantity;
    portfolio[symbol].totalCost -= quantity * price;

    // Remove the stock if quantity becomes zero
    if (portfolio[symbol].quantity === 0) {
        delete portfolio[symbol];
    }
}

// Function to update portfolio display
function updatePortfolio() {
    const tableBody = document.querySelector('#portfolioTable tbody');
    tableBody.innerHTML = '';

    for (let symbol in portfolio) {
        const { quantity, totalCost } = portfolio[symbol];
        const avgPrice = (totalCost / quantity).toFixed(2);
        const totalValue = (quantity * avgPrice).toFixed(2);

        // Create a table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${symbol}</td>
            <td>${quantity}</td>
            <td>$${avgPrice}</td>
            <td>$${totalValue}</td>
        `;
        tableBody.appendChild(row);
    }
}