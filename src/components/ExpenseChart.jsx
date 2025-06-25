import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ExpenseChart = ({ expenses, categories }) => {
  // Prepare category data
  const categoryData = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: category,
      value: parseFloat(total.toFixed(2))
    };
  }).filter(item => item.value > 0);

  // Prepare monthly data
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 5);
  const monthRange = eachMonthOfInterval({
    start: startOfMonth(sixMonthsAgo),
    end: endOfMonth(now)
  });

  const monthlyData = monthRange.map(month => {
    const monthKey = format(month, 'yyyy-MM');
    const monthExpenses = expenses.filter(expense => 
      format(parseISO(expense.date), 'yyyy-MM') === monthKey
    );

    const monthData = {
      name: format(month, 'MMM yy'),
      total: 0
    };

    categories.forEach(category => {
      monthData[category] = 0;
    });

    monthExpenses.forEach(expense => {
      monthData.total += expense.amount;
      monthData[expense.category] += expense.amount;
    });

    monthData.total = parseFloat(monthData.total.toFixed(2));
    categories.forEach(category => {
      monthData[category] = parseFloat(monthData[category].toFixed(2));
    });

    return monthData;
  });

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No expenses to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-6">Spending Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">By Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Last 6 Months</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Legend />
                {categories.map((category, index) => (
                  <Bar 
                    key={category} 
                    dataKey={category} 
                    stackId="a" 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;