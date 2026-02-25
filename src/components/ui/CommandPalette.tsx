import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { 
  Search, 
  Plus, 
  LayoutDashboard, 
  Kanban, 
  ListTodo, 
  Calendar, 
  Users, 
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useOrbitStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useOrbitStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <Command className="flex flex-col h-full">
              <div className="flex items-center border-b border-border px-4 py-3">
                <Search className="mr-3 text-muted-foreground" size={20} />
                <Command.Input 
                  placeholder="Type a command or search..." 
                  className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50"
                />
              </div>
              
              <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <Command.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm">
                    <Plus size={18} />
                    <span>Create New Task</span>
                    <kbd className="ml-auto text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border">N</kbd>
                  </Command.Item>
                  <Command.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm">
                    <Users size={18} />
                    <span>Invite Team Member</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-4">
                  <Command.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm">
                    <LayoutDashboard size={18} />
                    <span>Go to Overview</span>
                  </Command.Item>
                  <Command.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm">
                    <Kanban size={18} />
                    <span>Go to Kanban</span>
                  </Command.Item>
                  <Command.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm">
                    <Calendar size={18} />
                    <span>Go to Timeline</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Settings" className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-4">
                  <Command.Item 
                    onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                  </Command.Item>
                  <Command.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm">
                    <Settings size={18} />
                    <span>Open Settings</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
