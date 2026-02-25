import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Command,
  User as UserIcon,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useOrbitStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const { theme, setTheme, searchQuery, setSearchQuery } = useOrbitStore();

  return (
    <nav className="h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text"
          placeholder="Search tasks, projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-accent/50 border border-transparent focus:border-primary/30 focus:bg-accent rounded-xl py-2 pl-10 pr-12 outline-none transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-medium text-muted-foreground">
          <Command size={10} /> K
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 hover:bg-accent rounded-full transition-colors relative"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 hover:bg-accent rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
        </button>

        <div className="h-8 w-[1px] bg-border mx-2" />

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-accent rounded-full transition-colors group">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
            <img src="https://picsum.photos/seed/me/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold leading-none">Alex Rivera</p>
            <p className="text-[10px] text-muted-foreground mt-1">Pro Plan</p>
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
};
