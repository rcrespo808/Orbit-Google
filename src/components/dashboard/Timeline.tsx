import React from 'react';
import { motion } from 'motion/react';
import { useOrbitStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const MONTH = 'March 2026';

export const Timeline = () => {
  const { tasks, users } = useOrbitStore();

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">{MONTH}</h2>
          <div className="flex items-center bg-accent/50 rounded-lg p-1">
            <button className="p-1 hover:bg-card rounded transition-all"><ChevronLeft size={16} /></button>
            <button className="px-3 py-1 text-xs font-bold">Today</button>
            <button className="p-1 hover:bg-card rounded transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-bold bg-accent rounded-lg">Day</button>
          <button className="px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg">Week</button>
          <button className="px-3 py-1.5 text-xs font-bold bg-accent rounded-lg">Month</button>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="flex-1 overflow-x-auto border border-border rounded-3xl bg-card/50 backdrop-blur-sm scrollbar-hide">
        <div className="min-w-[1500px] h-full flex flex-col">
          {/* Days Header */}
          <div className="flex border-b border-border">
            <div className="w-64 border-r border-border p-4 shrink-0 font-bold text-xs uppercase tracking-widest text-muted-foreground">
              Tasks
            </div>
            <div className="flex-1 flex">
              {DAYS.map(day => (
                <div key={day} className="flex-1 min-w-[40px] border-r border-border/30 p-2 text-center">
                  <span className="text-[10px] font-bold text-muted-foreground block">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'][(day + 1) % 7]}
                  </span>
                  <span className={cn(
                    "text-xs font-bold mt-1 inline-block w-6 h-6 leading-6 rounded-full",
                    day === 15 ? "bg-primary text-primary-foreground" : ""
                  )}>
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="flex-1 overflow-y-auto">
            {tasks.map((task, idx) => {
              const startDay = (idx * 3) % 20 + 2;
              const duration = (idx * 2) % 5 + 3;
              
              return (
                <div key={task.id} className="flex border-b border-border/30 group hover:bg-accent/20 transition-all">
                  <div className="w-64 border-r border-border p-4 shrink-0 flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      task.status === 'completed' ? "bg-emerald-500" : "bg-primary"
                    )} />
                    <span className="text-sm font-medium truncate">{task.title}</span>
                  </div>
                  <div className="flex-1 flex relative h-16 items-center">
                    {/* Grid Lines */}
                    {DAYS.map(day => (
                      <div key={day} className="flex-1 min-w-[40px] h-full border-r border-border/10" />
                    ))}
                    
                    {/* Task Bar */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "absolute h-10 rounded-xl flex items-center px-3 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform",
                        task.status === 'completed' ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400" : "bg-primary/20 border border-primary/30 text-primary"
                      )}
                      style={{
                        left: `${(startDay - 1) * (100 / 30)}%`,
                        width: `${duration * (100 / 30)}%`
                      }}
                    >
                      <span className="text-[10px] font-bold truncate">{task.title}</span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
