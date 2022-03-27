import { useMutation } from "@apollo/client";
import { RiCloseCircleLine } from "react-icons/ri";
import { removeTaskMutation, updateTaskMutation } from "../../gql";
import { Task } from "../../interfaces";
import { Checkbox } from "../";
import "./TaskDisplay.css";

type TaskDisplayProps = {
  tasks: Task[];
  isDisabled?: boolean;
  deleteTask: (id: string) => void;
  completeTask: (task: Task) => void;
  refetch: () => void;
};

const TaskDisplay: React.FC<TaskDisplayProps> = ({
  tasks,
  deleteTask,
  completeTask,
  isDisabled,
  refetch,
}) => {
  const [updateTask] = useMutation(updateTaskMutation);
  const [removeTask] = useMutation(removeTaskMutation);

  const handleCompleteTask = async (task: Task) => {
    if (!isDisabled) {
      const { data } = await updateTask({
        variables: {
          record: {
            id: task.id,
            isDone: !task.isDone,
          },
        },
      });
      completeTask(data.updateTask);
      refetch();
    }
  };

  const handleRemoveTask = async (task: Task) => {
    if (!task.isDone) {
      await removeTask({ variables: { record: { id: task.id } } });
      deleteTask(task.id);
      refetch();
    }
  };

  return (
    <>
      {tasks?.map((task) => (
        <div key={task.id}>
          <div className={task.isDone ? "task-row complete" : "task-row"}>
            <div>
              <Checkbox
                isDisabled={isDisabled}
                onClick={() => handleCompleteTask(task)}
                isDone={task.isDone}
              />{" "}
              {task.text}
            </div>
            <div className="icon">
              <RiCloseCircleLine
                onClick={() => handleRemoveTask(task)}
                className={task.isDone ? "remove-task complete" : "remove-task"}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskDisplay;
