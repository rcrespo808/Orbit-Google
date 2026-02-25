import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { TaskDetailPanel } from './TaskDetailPanel';
import { useOrbitStore } from '../../store/useStore';
import { Task } from '../../types';
import { AnimatePresence } from 'motion/react';

const COLUMNS: { id: Task['status']; label: string }[] = [
  { id: 'planning', label: 'Planning' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'completed', label: 'Completed' },
];

export const KanbanBoard = () => {
  const { tasks, updateTaskStatus } = useOrbitStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const overTask = tasks.find(t => t.id === overId);
      if (overTask && active.data.current?.task.status !== overTask.status) {
        updateTaskStatus(activeId, overTask.status);
      }
    }

    // Dropping a Task over a Column
    if (isActiveATask && isOverAColumn) {
      updateTaskStatus(activeId, overId as Task['status']);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-full overflow-x-auto pb-4 scrollbar-hide">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              tasks={tasks.filter((t) => t.status === col.id)}
              onCardClick={(id) => setSelectedTaskId(id)}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeTask ? (
            <KanbanCard task={activeTask} isOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>

      <AnimatePresence>
        {selectedTaskId && (
          <TaskDetailPanel 
            taskId={selectedTaskId} 
            onClose={() => setSelectedTaskId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
