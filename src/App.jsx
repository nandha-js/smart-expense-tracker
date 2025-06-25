import { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseChart from './components/ExpenseChart';
import CategorySummary from './components/CategorySummary';
import ErrorBoundary from './components/ErrorBoundary';

const categories = ['Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Others'];

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    sortBy: 'date-desc'
  });

  useEffect(() => {
    let result = [...expenses];
    
    if (filters.category) {
      result = result.filter(expense => expense.category === filters.category);
    }
    
    if (filters.startDate) {
      result = result.filter(expense => new Date(expense.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      result = result.filter(expense => new Date(expense.date) <= new Date(filters.endDate));
    }
    
    if (filters.minAmount) {
      result = result.filter(expense => Number(expense.amount) >= Number(filters.minAmount));
    }
    if (filters.maxAmount) {
      result = result.filter(expense => Number(expense.amount) <= Number(filters.maxAmount));
    }
    
    switch (filters.sortBy) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amount-asc':
        result.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount-desc':
        result.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }
    
    setFilteredExpenses(result);
  }, [expenses, filters]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Smart Expense Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <ExpenseForm categories={categories} addExpense={addExpense} />
          <CategorySummary expenses={expenses} categories={categories} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <ErrorBoundary>
            <ExpenseChart expenses={expenses} categories={categories} />
          </ErrorBoundary>
          <ExpenseFilter categories={categories} filters={filters} setFilters={setFilters} />
          <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default App;