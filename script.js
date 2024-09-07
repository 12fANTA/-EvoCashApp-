document.addEventListener('DOMContentLoaded', function() {
    // Handle section switching
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sections.forEach(section => section.classList.remove('active'));
            const targetSection = document.querySelector(link.getAttribute('href'));
            targetSection.classList.add('active');
        });
    });

    // Initialize spending analytics chart
    const ctx = document.getElementById('spendingChart').getContext('2d');
    const spendingChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Others'],
            datasets: [{
                label: 'Spending Analytics',
                data: [300, 200, 150, 100, 50],
                backgroundColor: ['#FF4500', '#FF7F50', '#FFA07A', '#FFD700', '#FF6347'],
                borderColor: ['#FFFFFF'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });

    // Loan calculator logic
    const loanForm = document.getElementById('loanForm');
    loanForm.addEventListener('input', function() {
        const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
        const loanTerm = parseFloat(document.getElementById('loan-term').value) || 0;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;

        // Simple interest calculation
        const totalRepayment = loanAmount + (loanAmount * (interestRate / 100) * (loanTerm / 12));
        document.getElementById('total-repayment').value = totalRepayment.toFixed(2);
    });

    // Load recent transactions
    const viewTransactionsButton = document.getElementById('viewTransactions');
    const transactionList = document.getElementById('transactionList');

    if (viewTransactionsButton) {
        viewTransactionsButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/transactions');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                transactionList.innerHTML = data.transactions.map(transaction => `
                    <div>
                        <p>Date: ${transaction.date}</p>
                        <p>Amount: $${transaction.amount}</p>
                        <p>Recipient: ${transaction.recipient}</p>
                    </div>
                `).join('');
                transactionList.style.display = 'block';
            } catch (error) {
                console.error('Error loading transactions:', error);
                transactionList.innerHTML = '<p>Failed to load transactions.</p>';
            }
        });
    }
});