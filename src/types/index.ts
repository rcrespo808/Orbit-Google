export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  priority: Priority;
  dueDate: string;
  assignees: string[]; // User IDs
  labels: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
  comments: { id: string; userId: string; text: string; timestamp: string }[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface AppState {
  projects: Project[];
  tasks: Task[];
  users: User[];
  currentProjectId: string;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedTaskIds: string[];
}
