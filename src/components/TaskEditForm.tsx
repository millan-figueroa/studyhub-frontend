import { useState } from "react";
import type { Status } from "../types";

interface TaskAddFormProps {
  updateTask: (
    id: string,
    name: string,
    description: string,
    status: Status
  ) => void;
  editName: string;
  editDescription: string;
  editId: string;
  editStatus: Status;
  closeEditForm: () => void;
}

export default function TaskEditForm({
  updateTask,
  editName,
  editDescription,
  editId,
  editStatus,
  closeEditForm,
}: TaskAddFormProps) {
  // store form fields locally
  const [name, setName] = useState(editName);
  const [description, setDescription] = useState(editDescription);
  const [status, setStatus] = useState<Status>(editStatus);

  // simple error state
  const [error, setError] = useState({ name: false, description: false });

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") {
      return setError((prev) => ({ ...prev, name: true }));
    }
    if (description === "") {
      return setError((prev) => ({ ...prev, description: true }));
    }

    updateTask(editId, name, description, status);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* name field */}
      <label htmlFor="project-name">project name:</label>
      <input
        type="text"
        name="project-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error.name && <p>invalid name</p>}

      {/* description field */}
      <label htmlFor="project-description">project description:</label>
      <input
        type="text"
        name="project-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error.description && <p>invalid description</p>}

      {/* status dropdown */}
      <label htmlFor="project-status">status:</label>
      <select
        name="project-status"
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
      >
        <option value="todo">to do</option>
        <option value="in-progress">in progress</option>
        <option value="done">done</option>
      </select>

      {/* submit + cancel */}
      <input type="submit" value="update task" />
      <input type="button" value="cancel" onClick={closeEditForm} />
    </form>
  );
}
