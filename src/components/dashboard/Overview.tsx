import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const TEAM_DATA = [
  { name: 'Alex', tasks: 12, color: '#6366f1' },
  { name: 'Sarah', tasks: 19, color: '#ec4899' },
  { name: 'Marcus', tasks: 15, color: '#10b981' },
  { name: 'Elena', tasks: 8, color: '#f59e0b' },
];

const STATS = [
  { label: 'Total Tasks', value: '42', trend: '+12%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Active Projects', value: '5', trend: '+2', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Team Members', value: '12', trend: '0', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { label: 'Overdue', value: '3', trend: '-1', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

export const Overview = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-accent hover:bg-accent/80 rounded-xl text-sm font-semibold transition-all">
            Export Data
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            New Widget
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                stat.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card border border-border p-8 rounded-3xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Project Velocity</h3>
              <p className="text-xs text-muted-foreground">Task completion rate over time</p>
            </div>
            <select className="bg-accent/50 border-none rounded-lg px-3 py-1.5 text-xs font-semibold outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Team Workload */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border p-8 rounded-3xl shadow-sm"
        >
          <h3 className="text-lg font-bold mb-1">Team Workload</h3>
          <p className="text-xs text-muted-foreground mb-8">Current active tasks per member</p>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TEAM_DATA} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 600 }}
                  width={60}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="tasks" radius={[0, 4, 4, 0]} barSize={20}>
                  {TEAM_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-4">
            {TEAM_DATA.map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: member.color }} />
                  <span className="text-xs font-medium">{member.name}</span>
                </div>
                <span className="text-xs font-bold">{member.tasks} tasks</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold mb-6">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-accent/30 rounded-2xl group hover:bg-accent/50 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-card flex flex-col items-center justify-center border border-border group-hover:border-primary/30 transition-all">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Mar</span>
                  <span className="text-sm font-bold leading-none">{i + 10}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">Project Milestone {i}</h4>
                  <p className="text-xs text-muted-foreground">Orbit Dashboard Redesign</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-card bg-slate-200" />
                  <div className="w-6 h-6 rounded-full border-2 border-card bg-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">Get unlimited projects, advanced analytics, and priority support.</p>
            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Upgrade Now
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
          <TrendingUp className="absolute right-10 top-10 text-primary/10 w-32 h-32 -rotate-12 group-hover:scale-110 transition-all" />
        </div>
      </div>
    </div>
  );
};
