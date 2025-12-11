import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import TaskAddForm from "./TaskAddForm";
import type { Status, Tasks, TasksDashboardProps } from "../types";
import TaskList from "./TaskList";
import TaskEditForm from "./TaskEditForm";

export default function TasksDashboard({ projectId }: TasksDashboardProps) {
  // local states for tasks and loading
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form states
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState<Status>("todo");
  const [editDescription, setEditDescription] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // load tasks from backend
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        setTasks(res.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  // create a new task
  const createTask = async (
    name: string,
    description: string,
    status: "todo" | "in-progress" | "done"
  ) => {
    try {
      setLoading(true);
      const res = await apiClient.post(`api/projects/${projectId}/tasks`, {
        name,
        description,
        status,
      });
      setTasks((prev) => [...prev, res.data]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // update an existing task
  const updateTask = async (
    id: string,
    name: string,
    description: string,
    status: Status
  ) => {
    try {
      setLoading(true);
      await apiClient.put(`/api/tasks/${id}`, {
        name,
        description,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, name, description, status } : task
        )
      );

      setShowEditForm(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // delete a task
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // open edit form with selected values
  const editTask = (
    id: string,
    name: string,
    description: string,
    status: Status
  ) => {
    setEditName(name);
    setEditDescription(description);
    setEditId(id);
    setEditStatus(status);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  // close edit form and clear values
  const closeEditForm = () => {
    setEditName("");
    setEditDescription("");
    setEditId("");
    setShowEditForm(false);
  };

  // open add task form
  const openAddForm = () => {
    closeEditForm();
    setShowAddForm(true);
  };

  // close add task form
  const closeAddForm = () => {
    setShowAddForm(false);
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* header */}
      {tasks && (
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-slate-100">tasks</h1>
          <button
            onClick={openAddForm}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500 text-slate-900 text-sm font-semibold hover:bg-orange-400 transition"
          >
            add task
          </button>
        </div>
      )}

      {/* add form */}
      {showAddForm && (
        <div className="mb-4">
          <TaskAddForm createTask={createTask} closeAddForm={closeAddForm} />
        </div>
      )}

      {/* edit form */}
      {showEditForm && (
        <div className="mb-4">
          <TaskEditForm
            updateTask={updateTask}
            editName={editName}
            editDescription={editDescription}
            editStatus={editStatus}
            editId={editId}
            closeEditForm={closeEditForm}
          />
        </div>
      )}

      {/* error message */}
      {error && (
        <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-500/40 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      {/* empty message */}
      {tasks.length === 0 && (
        <h2 className="text-sm text-slate-400 italic">no tasks yet</h2>
      )}

      {/* list of tasks */}
      {tasks && tasks.length > 0 && (
        <div className="mt-2">
          <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
        </div>
      )}
    </div>
  );
}
