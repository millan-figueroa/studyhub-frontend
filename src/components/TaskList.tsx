import type { Status, Tasks } from "../types";
import { useState } from "react";

interface TaskListProp {
  tasks: Tasks[];
  editTask: (
    id: string,
    name: string,
    description: string,
    status: Status
  ) => void;
  deleteTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  editTask,
  deleteTask,
}: TaskListProp) {
  // local state to handle delete confirmation
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // run delete when confirmed
  const handleDelete = (id: string) => {
    deleteTask(id);
    setConfirm(false);
  };

  // open confirmation box for one task only
  const openConfirmBox = (id: string) => {
    setDeleteId(id);
    setConfirm(true);
  };

  // close confirm box
  const closeConfirmBox = () => {
    setDeleteId("");
    setConfirm(false);
  };

  return (
    <div>
      {tasks &&
        tasks.map((task) => (
          <div key={task._id}>
            {/* basic task info */}
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <p>status: {task.status}</p>

            {/* edit button */}
            <button
              type="button"
              onClick={() =>
                editTask(task._id, task.name, task.description, task.status)
              }
            >
              edit
            </button>

            {/* delete button or confirm box */}
            {!confirm || task._id !== deleteId ? (
              <button type="button" onClick={() => openConfirmBox(task._id)}>
                delete
              </button>
            ) : (
              <div>
                <p>are you sure?</p>
                <button onClick={() => handleDelete(task._id)}>yes</button>
                <button onClick={closeConfirmBox}>no</button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
