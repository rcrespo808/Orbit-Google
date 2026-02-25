import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Calendar, 
  Flag, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  Paperclip,
  Trash2,
  Archive,
  Share2,
  Plus
} from 'lucide-react';
import { useOrbitStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Priority } from '../../types';

interface TaskDetailPanelProps {
  taskId: string;
  onClose: () => void;
}

const PRIORITY_OPTIONS: Priority[] = ['low', 'medium', 'high', 'urgent'];

export const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({ taskId, onClose }) => {
  const { tasks, users, updateTask } = useOrbitStore();
  const task = tasks.find(t => t.id === taskId);

  if (!task) return null;

  const assignees = users.filter(u => task.assignees.includes(u.id));

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Task Details</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground">
              <Share2 size={18} />
            </button>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground">
              <Archive size={18} />
            </button>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors text-destructive">
              <Trash2 size={18} />
            </button>
            <div className="w-[1px] h-6 bg-border mx-2" />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {/* Title & Description */}
          <div className="space-y-4">
            <input 
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task.id, { title: e.target.value })}
              className="text-2xl font-bold bg-transparent border-none outline-none w-full focus:ring-0 placeholder:text-muted-foreground/50"
              placeholder="Task title..."
            />
            <textarea 
              value={task.description}
              onChange={(e) => updateTask(task.id, { description: e.target.value })}
              className="text-sm text-muted-foreground bg-transparent border-none outline-none w-full resize-none min-h-[100px] focus:ring-0 placeholder:text-muted-foreground/30"
              placeholder="Add a description..."
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Flag size={12} /> Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {PRIORITY_OPTIONS.map(p => (
                  <button
                    key={p}
                    onClick={() => updateTask(task.id, { priority: p })}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                      task.priority === p 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-accent/50 border-transparent hover:border-border"
                    )}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Calendar size={12} /> Due Date
              </label>
              <input 
                type="date"
                value={task.dueDate}
                onChange={(e) => updateTask(task.id, { dueDate: e.target.value })}
                className="w-full bg-accent/50 border border-transparent hover:border-border rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary/30 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Users size={12} /> Assignees
              </label>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {assignees.map(user => (
                    <div key={user.id} className="w-8 h-8 rounded-full border-2 border-card overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <button className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CheckSquare size={12} /> Status
              </label>
              <select 
                value={task.status}
                onChange={(e) => updateTask(task.id, { status: e.target.value as any })}
                className="w-full bg-accent/50 border border-transparent hover:border-border rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary/30 transition-all appearance-none"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Subtasks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CheckSquare size={12} /> Subtasks
              </label>
              <span className="text-[10px] font-bold text-muted-foreground">
                {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {task.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-3 group">
                  <input 
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => {
                      const newSubtasks = task.subtasks.map(s => 
                        s.id === subtask.id ? { ...s, completed: !s.completed } : s
                      );
                      updateTask(task.id, { subtasks: newSubtasks });
                    }}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                  />
                  <span className={cn(
                    "text-sm flex-1 transition-all",
                    subtask.completed && "text-muted-foreground line-through"
                  )}>
                    {subtask.title}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded transition-all">
                    <X size={14} className="text-muted-foreground" />
                  </button>
                </div>
              ))}
              <button className="flex items-center gap-2 text-xs text-primary font-medium hover:underline pt-2">
                <Plus size={14} /> Add subtask
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-6">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MessageSquare size={12} /> Discussion
            </label>
            <div className="space-y-6">
              {task.comments.map(comment => {
                const user = users.find(u => u.id === comment.userId);
                return (
                  <div key={comment.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{user?.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* New Comment */}
            <div className="flex gap-4 pt-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Plus size={14} className="text-primary" />
              </div>
              <div className="flex-1 relative">
                <textarea 
                  placeholder="Add a comment..."
                  className="w-full bg-accent/50 border border-transparent focus:border-primary/30 rounded-xl p-3 text-sm outline-none transition-all resize-none min-h-[80px]"
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <button className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground">
                    <Paperclip size={16} />
                  </button>
                  <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
