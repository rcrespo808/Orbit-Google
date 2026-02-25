import React, { useState } from 'react';
import { LayoutDashboard, Kanban, ListTodo, Calendar, Filter, Plus, ChevronDown } from 'lucide-react';
import { Overview } from './dashboard/Overview';
import { KanbanBoard } from './kanban/KanbanBoard';
import { Timeline } from './dashboard/Timeline';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'overview' | 'kanban' | 'list' | 'timeline';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'kanban', label: 'Kanban', icon: Kanban },
  { id: 'list', label: 'List', icon: ListTodo },
  { id: 'timeline', label: 'Timeline', icon: Calendar },
];

export const MainView = () => {
  const [activeTab, setActiveTab] = useState<Tab>('kanban');

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex bg-accent/50 p-1 rounded-xl w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative",
                activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-card shadow-sm rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                <img src={`https://picsum.photos/seed/${i}/100/100`} alt="User" />
              </div>
            ))}
            <button className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold">
              +8
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-xl text-sm font-semibold transition-all">
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'kanban' && <KanbanBoard />}
            {activeTab === 'timeline' && <Timeline />}
            {activeTab === 'list' && (
              <div className="flex items-center justify-center h-full text-muted-foreground italic">
                List view is coming soon...
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
