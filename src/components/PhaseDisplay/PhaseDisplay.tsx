import { useState } from "react";
import { Phase, Task } from "../../interfaces";
import { TaskDisplay, TaskInput } from "../";

type PhaseDisplayProps = {
  phase: Phase;
  index: number;
  refetch: () => void;
};

const PhaseDisplay: React.FC<PhaseDisplayProps> = ({
  phase,
  refetch,
  index,
}) => {
  const [tasks, setTasks] = useState<Task[]>(phase.tasks);

  const addTask = (task: Task) => {
    const newTask = [...tasks, task];
    setTasks(newTask);
  };

  const completeTask = (updated: Task) => {
    const updatedTask = tasks?.map((taskItem) => {
      if (taskItem.id === updated.id) {
        taskItem = updated;
      }
      return taskItem;
    });
    setTasks(updatedTask);
  };

  const removeTask = (id: string) => {
    const removed = [...tasks].filter((taskItem) => taskItem.id !== id);
    setTasks(removed);
  };

  return (
    <>
      <h2>
        {++index}. {phase.title}
        {phase.allTasksCompleted && " ✔"}
      </h2>
      <TaskDisplay
        refetch={refetch}
        isDisabled={phase.isDisabled}
        tasks={tasks}
        deleteTask={removeTask}
        completeTask={completeTask}
      />
      <TaskInput refetch={refetch} addTask={addTask} phase={phase} />
    </>
  );
};

export default PhaseDisplay;
