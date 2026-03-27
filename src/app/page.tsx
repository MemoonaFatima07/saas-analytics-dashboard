'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data for the chart
const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 3200 },
  { name: 'Jun', total: 2800 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-lg">Welcome back, here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value="$45,231" change="+12.5%" />
        <StatCard title="Active Users" value="2,345" change="+3.2%" />
        <StatCard title="Conversion Rate" value="4.8%" change="-0.4%" />
      </div>

      {/* Revenue Chart Section */}
      <RevenueChart />

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground font-medium">
                  <th className="py-4 px-2">Customer</th>
                  <th className="py-4 px-2">Status</th>
                  <th className="py-4 px-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <TableRow name="Memoona" status="Completed" amount="$120.00" />
                <TableRow name="Jia" status="Pending" amount="$850.00" />
                <TableRow name="Ali" status="Completed" amount="$45.00" />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Chart Component
function RevenueChart() {
  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
      </CardHeader>
      {/* Added min-h-[300px] and removed the width=100% height=100% props to use default behavior */}
      <div className="w-full mt-4 min-h-75">
        <ResponsiveContainer width="99%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#2563eb' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
// Stats Card Component
function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  const isPositive = change.startsWith('+');
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs font-semibold mt-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {change} <span className="text-muted-foreground font-normal ml-1">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}

// Table Row Component with Color Badges
function TableRow({ name, status, amount }: { name: string; status: string; amount: string }) {
  const isCompleted = status === "Completed";
  return (
    <tr className="hover:bg-accent/50 transition-colors">
      <td className="py-4 px-2 font-medium">{name}</td>
      <td className="py-4 px-2">
        <Badge 
          className={isCompleted 
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400" 
            : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
          }
        >
          {status}
        </Badge>
      </td>
      <td className="py-4 px-2 font-mono text-muted-foreground">{amount}</td>
    </tr>
  );
}