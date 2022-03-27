import { loader } from "graphql.macro";

export const getPhasesTasksQuery = loader("./get-phases-tasks.query.gql");

export const createTaskMutation = loader("./create-task.mutation.gql");

export const updateTaskMutation = loader("./update-task.mutation.gql");

export const removeTaskMutation = loader("./remove-task.mutation.gql");
