class ExpenseManager {
    constructor() {
        this.expenses = this.loadExpenses();
        this.total = this.calculateTotal();
        this.categoryTotals = this.calculateCategoryTotals();
    }

    addExpense(name, amount, category) {
        if (name !== '' && !isNaN(amount) && amount > 0 && category !== '') {
            const expense = { name, amount, category };
            this.expenses.push(expense);
            this.total += amount;

            if (!this.categoryTotals[category]) {
                this.categoryTotals[category] = 0;
            }
            this.categoryTotals[category] += amount;

            this.saveExpenses();
            this.displayExpenses();
        } else {
            alert('Please enter valid name, amount, and category');
        }
    }

    calculateTotal() {
        return this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }

    calculateCategoryTotals() {
        const totals = {};
        this.expenses.forEach(expense => {
            if (!totals[expense.category]) {
                totals[expense.category] = 0;
            }
            totals[expense.category] += expense.amount;
        });
        return totals;
    }

    loadExpenses() {
        const storedExpenses = localStorage.getItem('expenses');
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    }

    saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    displayExpenses() {
        const expensesList = document.getElementById('expensesList');
        expensesList.innerHTML = '';

        this.expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.textContent = `${expense.name} (${expense.category}): $${expense.amount.toFixed(2)}`;
            expensesList.appendChild(expenseItem);
        });

        document.getElementById('totalExpenses').textContent = `Total: $${this.total.toFixed(2)}`;

        const categoryTotalsDiv = document.getElementById('categoryTotals');
        categoryTotalsDiv.innerHTML = '<h3>Category Totals:</h3>';
        for (const category in this.categoryTotals) {
            const categoryTotal = document.createElement('div');
            categoryTotal.textContent = `${category}: $${this.categoryTotals[category].toFixed(2)}`;
            categoryTotalsDiv.appendChild(categoryTotal);
        }
    }
}

const expenseManager = new ExpenseManager();

function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    expenseManager.addExpense(name, amount, category);
}
