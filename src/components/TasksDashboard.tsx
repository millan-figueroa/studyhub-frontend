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
    <div>
      {/* header */}
      {tasks && (
        <div>
          <h1>tasks</h1>
          <button onClick={openAddForm}>add task</button>
        </div>
      )}

      {/* add form */}
      {showAddForm && (
        <TaskAddForm createTask={createTask} closeAddForm={closeAddForm} />
      )}

      {/* edit form */}
      {showEditForm && (
        <TaskEditForm
          updateTask={updateTask}
          editName={editName}
          editDescription={editDescription}
          editStatus={editStatus}
          editId={editId}
          closeEditForm={closeEditForm}
        />
      )}

      {/* error message */}
      {error && <div>{error}</div>}

      {/* empty message */}
      {tasks.length === 0 && <h2>no tasks</h2>}

      {/* list of tasks */}
      {tasks && (
        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
      )}
    </div>
  );
}
