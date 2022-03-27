export interface Task {
  id: string;
  text: string;
  isDone: boolean;
}

export interface Phase {
  id: string;
  title: string;
  allTasksCompleted: boolean;
  isDisabled: boolean;
  tasks: Task[];
}
