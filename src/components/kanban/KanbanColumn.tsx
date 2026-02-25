import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { Task } from '../../types';
import { MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KanbanColumnProps {
  id: string;
  label: string;
  tasks: Task[];
  onCardClick: (id: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, label, tasks, onCardClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: 'Column',
    },
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "flex flex-col w-80 min-w-[20rem] bg-accent/30 rounded-2xl border border-border/50 transition-colors",
        isOver && "bg-accent/50 border-primary/30"
      )}
    >
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{label}</h3>
          <span className="bg-accent px-2 py-0.5 rounded-full text-[10px] font-bold text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
            <Plus size={16} />
          </button>
          <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-hide min-h-[150px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard 
              key={task.id} 
              task={task} 
              onClick={() => onCardClick(task.id)}
            />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && !isOver && (
          <div className="h-32 border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center text-muted-foreground text-xs italic">
            No tasks here
          </div>
        )}
      </div>
    </div>
  );
};
