import { create } from 'zustand';
import { AppState, Task, Project, User } from '../types';

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Rivera', avatar: 'https://picsum.photos/seed/u1/100/100', role: 'Product Designer' },
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/u2/100/100', role: 'Frontend Engineer' },
  { id: 'u3', name: 'Marcus Tso', avatar: 'https://picsum.photos/seed/u3/100/100', role: 'Backend Lead' },
  { id: 'u4', name: 'Elena Rodriguez', avatar: 'https://picsum.photos/seed/u4/100/100', role: 'QA Specialist' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Orbit Dashboard', color: '#6366f1', icon: 'Layout' },
  { id: 'p2', name: 'Mobile App Redesign', color: '#ec4899', icon: 'Smartphone' },
  { id: 'p3', name: 'API Integration', color: '#10b981', icon: 'Zap' },
  { id: 'p4', name: 'Marketing Website', color: '#f59e0b', icon: 'Globe' },
  { id: 'p5', name: 'Security Audit', color: '#ef4444', icon: 'Shield' },
];

const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Implement drag-and-drop Kanban',
    description: 'Use @dnd-kit to create a smooth dragging experience for tasks and columns.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-03-01',
    assignees: ['u1', 'u2'],
    labels: ['Feature', 'UI/UX'],
    subtasks: [
      { id: 's1', title: 'Setup dnd-kit context', completed: true },
      { id: 's2', title: 'Create SortableItem component', completed: true },
      { id: 's3', title: 'Handle drop logic', completed: false },
    ],
    comments: [
      { id: 'c1', userId: 'u3', text: 'Looking good so far!', timestamp: '2026-02-24T10:00:00Z' },
    ],
  },
  {
    id: 't2',
    title: 'Design system updates',
    description: 'Update the color palette and typography for the new brand guidelines.',
    status: 'planning',
    priority: 'medium',
    dueDate: '2026-03-05',
    assignees: ['u1'],
    labels: ['Design'],
    subtasks: [],
    comments: [],
  },
  {
    id: 't3',
    title: 'Fix responsive layout issues',
    description: 'The sidebar overlaps content on smaller screens.',
    status: 'review',
    priority: 'urgent',
    dueDate: '2026-02-28',
    assignees: ['u2', 'u4'],
    labels: ['Bug'],
    subtasks: [],
    comments: [],
  },
  {
    id: 't4',
    title: 'User authentication flow',
    description: 'Implement OAuth2 login with Google and GitHub.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-02-20',
    assignees: ['u3'],
    labels: ['Security', 'Backend'],
    subtasks: [],
    comments: [],
  },
  {
    id: 't5',
    title: 'Performance optimization',
    description: 'Reduce bundle size and improve LCP scores.',
    status: 'planning',
    priority: 'low',
    dueDate: '2026-03-15',
    assignees: ['u2'],
    labels: ['Tech Debt'],
    subtasks: [],
    comments: [],
  },
];

interface OrbitStore extends AppState {
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentProject: (id: string) => void;
  setSearchQuery: (query: string) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  toggleTaskSelection: (taskId: string, multi?: boolean) => void;
  clearSelection: () => void;
  addTask: (task: Partial<Task>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const useOrbitStore = create<OrbitStore>((set) => ({
  projects: MOCK_PROJECTS,
  tasks: MOCK_TASKS,
  users: MOCK_USERS,
  currentProjectId: 'p1',
  sidebarCollapsed: false,
  theme: 'dark',
  searchQuery: '',
  selectedTaskIds: [],

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setTheme: (theme) => set({ theme }),
  setCurrentProject: (id) => set({ currentProjectId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
  })),

  toggleTaskSelection: (taskId, multi) => set((state) => {
    if (multi) {
      const isSelected = state.selectedTaskIds.includes(taskId);
      return {
        selectedTaskIds: isSelected 
          ? state.selectedTaskIds.filter(id => id !== taskId)
          : [...state.selectedTaskIds, taskId]
      };
    }
    return { selectedTaskIds: [taskId] };
  }),

  clearSelection: () => set({ selectedTaskIds: [] }),

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, {
      id: `t${state.tasks.length + 1}`,
      title: 'New Task',
      description: '',
      status: 'planning',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      assignees: [],
      labels: [],
      subtasks: [],
      comments: [],
      ...task
    } as Task]
  })),

  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
  })),
}));
