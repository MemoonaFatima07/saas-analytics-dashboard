'use client';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back, here is what is happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Revenue" value="$45,231" change="+12.5%" />
        <StatCard title="Active Users" value="2,345" change="+3.2%" />
        <StatCard title="Conversion Rate" value="4.8%" change="-0.4%" />
      </div>

      {/* Recent Activity Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <TableRow name="Memoona" status="Completed" amount="$120.00" />
              <TableRow name="Jia" status="Pending" amount="$850.00" />
              <TableRow name="Ali" status="Completed" amount="$45.00" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <div className="flex items-baseline justify-between mt-2">
        <h2 className="text-2xl font-bold dark:text-white">{value}</h2>
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function TableRow({ name, status, amount }: { name: string; status: string; amount: string }) {
  const isCompleted = status === "Completed";
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <td className="p-4 font-medium text-slate-900 dark:text-white">
        {name}
      </td>
      <td className="p-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isCompleted 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {isCompleted && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
          {status}
        </span>
      </td>
      <td className="p-4 text-slate-600 dark:text-slate-300 font-mono">
        {amount}
      </td>
    </tr>
  );
}