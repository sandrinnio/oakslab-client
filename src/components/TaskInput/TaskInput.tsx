import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Phase, Task } from "../../interfaces";
import { createTaskMutation } from "../../gql";
import "./TaskInput.css";

type TaskInputProps = {
  phase: Phase;
  addTask: (task: Task) => void;
  refetch: () => void;
};

const TaskInput: React.FC<TaskInputProps> = ({ addTask, phase, refetch }) => {
  const [input, setInput] = useState("");
  const [createTask] = useMutation(createTaskMutation);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input) {
      const { data } = await createTask({
        variables: {
          record: {
            text: input,
            phaseId: phase.id,
          },
        },
      });
      addTask(data.createTask);
      refetch();
    }

    setInput("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={input}
        name="text"
        className="task-input"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="task-button">Add Task</button>
    </form>
  );
};

export default TaskInput;
