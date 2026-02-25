import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Kanban, 
  ListTodo, 
  Calendar, 
  Settings, 
  Users, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Hash,
  Briefcase
} from 'lucide-react';
import { useOrbitStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'kanban', label: 'Kanban', icon: Kanban },
  { id: 'list', label: 'List', icon: ListTodo },
  { id: 'timeline', label: 'Timeline', icon: Calendar },
];

export const Sidebar = () => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    projects, 
    currentProjectId, 
    setCurrentProject 
  } = useOrbitStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 260 }}
      className={cn(
        "h-screen border-r border-border bg-card flex flex-col transition-all duration-300 ease-in-out z-40",
        "fixed md:relative"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-bottom border-border">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Orbit</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-hide">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                "hover:bg-accent hover:text-accent-foreground",
                sidebarCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</span>
              <button className="p-1 hover:bg-accent rounded transition-colors">
                <Plus size={14} />
              </button>
            </div>
          )}
          
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setCurrentProject(project.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                  currentProjectId === project.id ? "bg-primary/10 text-primary" : "hover:bg-accent",
                  sidebarCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: project.color }} 
                />
                {!sidebarCollapsed && <span className="font-medium truncate">{project.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors",
          sidebarCollapsed ? "justify-center" : "justify-start"
        )}>
          <Users size={20} className="text-muted-foreground" />
          {!sidebarCollapsed && <span className="font-medium">Team</span>}
        </button>
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors",
          sidebarCollapsed ? "justify-center" : "justify-start"
        )}>
          <Settings size={20} className="text-muted-foreground" />
          {!sidebarCollapsed && <span className="font-medium">Settings</span>}
        </button>
      </div>
    </motion.aside>
  );
};
