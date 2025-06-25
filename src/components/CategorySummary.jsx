const CategorySummary = ({ expenses = [], categories = [] }) => {
  const formatDate = (dateString) => {
    try {
      const [day, month, year] = dateString.split('-');
      return `${day}-${month}-${year}`;
    } catch {
      return 'Invalid Date';
    }
  };

  const categoryTotals = categories.map(category => {
    const total = expenses
      .filter(expense => expense?.category === category)
      .reduce((sum, expense) => sum + (expense?.amount || 0), 0);
    
    return {
      category,
      total: parseFloat(total.toFixed(2))
    };
  }).filter(item => item.total > 0);

  const overallTotal = categoryTotals.reduce((sum, item) => sum + item.total, 0);
  const lastExpense = expenses[0] ? formatDate(expenses[0].date) : 'No expenses';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Spending Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-medium">Total Expenses</span>
          <span className="text-lg font-bold text-blue-600">
            ${overallTotal.toFixed(2)}
          </span>
        </div>
        
        <div className="text-sm text-gray-500">
          Last expense: {lastExpense}
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">By Category</h3>
          {categoryTotals.length > 0 ? (
            categoryTotals.map((item) => (
              <div key={item.category} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span>{item.category}</span>
                  <span>${item.total.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${overallTotal > 0 ? (item.total / overallTotal) * 100 : 0}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {overallTotal > 0 ? ((item.total / overallTotal) * 100).toFixed(1) : 0}%
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No expenses recorded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySummary;