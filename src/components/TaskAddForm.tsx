import { useState } from "react";
import type { Status } from "../types";

interface TaskAddFormProps {
  createTask: (name: string, description: string, status: Status) => void;
  closeAddForm: () => void;
}

export default function TaskAddForm({
  createTask,
  closeAddForm,
}: TaskAddFormProps) {
  // local state for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("todo" as Status);

  // track simple input errors
  const [error, setError] = useState({ name: false, description: false });

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") {
      return setError((prev) => ({ ...prev, name: true }));
    }
    if (description === "") {
      return setError((prev) => ({ ...prev, description: true }));
    }

    createTask(name, description, status);
  };

  // reset and close the form
  const handleCloseAddForm = () => {
    setName("");
    setDescription("");
    closeAddForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-name">task name:</label>
      <input
        type="text"
        name="task-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error.name && <p>invalid name</p>}

      <label htmlFor="task-description">task description:</label>
      <input
        type="text"
        name="task-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error.description && <p>invalid description</p>}

      <label htmlFor="task-status">task status:</label>
      <select
        name="task-status"
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
      >
        <option value="todo">to do</option>
        <option value="in-progress">in progress</option>
        <option value="done">done</option>
      </select>

      <input type="submit" value="create task" />

      <input type="button" value="cancel" onClick={handleCloseAddForm} />
    </form>
  );
}
