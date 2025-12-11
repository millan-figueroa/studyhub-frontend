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
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4 max-w-md"
    >
      {/* task name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="task-name" className="text-sm text-slate-300">
          task name:
        </label>
        <input
          type="text"
          name="task-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        />
        {error.name && (
          <p className="text-xs text-red-400 mt-1">invalid name</p>
        )}
      </div>

      {/* task description */}
      <div className="flex flex-col gap-1">
        <label htmlFor="task-description" className="text-sm text-slate-300">
          task description:
        </label>
        <input
          type="text"
          name="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        />
        {error.description && (
          <p className="text-xs text-red-400 mt-1">invalid description</p>
        )}
      </div>

      {/* task status */}
      <div className="flex flex-col gap-1">
        <label htmlFor="task-status" className="text-sm text-slate-300">
          task status:
        </label>
        <select
          name="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        >
          <option value="todo">to do</option>
          <option value="in-progress">in progress</option>
          <option value="done">done</option>
        </select>
      </div>

      {/* buttons */}
      <div className="flex gap-3 pt-2">
        <input
          type="submit"
          value="create task"
          className="px-5 py-2 rounded-full bg-orange-500 text-slate-900 font-semibold 
                   hover:bg-orange-400 cursor-pointer transition"
        />

        <input
          type="button"
          value="cancel"
          onClick={handleCloseAddForm}
          className="px-5 py-2 rounded-full border border-slate-600 text-slate-200 
                   hover:bg-slate-700 transition cursor-pointer"
        />
      </div>
    </form>
  );
}
