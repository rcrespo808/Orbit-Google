import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Priority } from '../../types';
import { 
  Calendar, 
  MessageSquare, 
  CheckSquare, 
  MoreVertical,
  Flag
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useOrbitStore } from '../../store/useStore';

interface KanbanCardProps {
  task: Task;
  isOverlay?: boolean;
  onClick?: () => void;
}

const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'bg-blue-500/10 text-blue-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  high: 'bg-orange-500/10 text-orange-500',
  urgent: 'bg-red-500/10 text-red-500',
};

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, isOverlay, onClick }) => {
  const { users } = useOrbitStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const assignees = users.filter(u => task.assignees.includes(u.id));
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  if (isDragging && !isOverlay) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="h-32 bg-accent/20 border-2 border-dashed border-primary/30 rounded-xl opacity-50" 
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        "group bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing",
        isOverlay && "shadow-2xl border-primary/50 rotate-3 scale-105"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
          PRIORITY_COLORS[task.priority]
        )}>
          {task.priority}
        </div>
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded transition-all">
          <MoreVertical size={14} className="text-muted-foreground" />
        </button>
      </div>

      {/* Title & Description */}
      <h4 className="font-semibold text-sm mb-1 line-clamp-2">{task.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{task.description}</p>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {task.labels.map(label => (
            <span key={label} className="px-1.5 py-0.5 bg-accent rounded text-[9px] font-medium text-muted-foreground">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
        <div className="flex items-center gap-3 text-muted-foreground">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-[10px]">
              <Calendar size={12} />
              <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
          {task.subtasks.length > 0 && (
            <div className="flex items-center gap-1 text-[10px]">
              <CheckSquare size={12} />
              <span>{completedSubtasks}/{task.subtasks.length}</span>
            </div>
          )}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-[10px]">
              <MessageSquare size={12} />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>

        {/* Assignees */}
        <div className="flex -space-x-2">
          {assignees.map((user, i) => (
            <div 
              key={user.id} 
              className="w-6 h-6 rounded-full border-2 border-card overflow-hidden"
              title={user.name}
            >
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
