const ExpenseList = ({ expenses, deleteExpense }) => {
  const formatDate = (dateString) => {
    try {
      const [day, month, year] = dateString.split('-');
      return `${day}-${month}-${year}`;
    } catch {
      return 'Invalid Date';
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No expenses found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expense List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Note</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{formatDate(expense.date)}</td>
                <td className="px-4 py-2">{expense.category}</td>
                <td className="px-4 py-2 font-medium">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-2 max-w-xs truncate">{expense.note || '-'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;