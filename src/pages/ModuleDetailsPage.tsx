import { useState, useEffect } from "react";
import type { Module, Task } from "../types";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";

function ModuleDetailsPage() {
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("no-deadline");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("no-deadline");

  const { moduleId } = useParams();

  useEffect(() => {
    async function fetchModuleDetails() {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/modules/${moduleId}`);
        setModuleData(res.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchModuleDetails();
  }, [moduleId]);

  useEffect(() => {
    async function fetchModuleTasks() {
      try {
        const res = await apiClient.get(`/api/modules/${moduleId}/tasks`);
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchModuleTasks();
  }, [moduleId]);

  async function createTask(e: any) {
    e.preventDefault();
    try {
      const res = await apiClient.post(`/api/modules/${moduleId}/tasks`, {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
      });

      setTasks((prev) => [...prev, res.data]);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate("no-deadline");
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTaskStatus(taskId: string, newStatus: string) {
    try {
      const res = await apiClient.put(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: res.data.status } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(taskId: string) {
    try {
      await apiClient.delete(`/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  }

  function startEditing(task: Task) {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || "no-deadline");
  }

  async function submitTaskEdit(taskId: string) {
    try {
      const res = await apiClient.put(`/api/tasks/${taskId}`, {
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                title: res.data.title,
                description: res.data.description,
                dueDate: res.data.dueDate,
              }
            : task
        )
      );

      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <div>loading...</div>;
  if (error) return <div>error loading module</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 px-4 py-10 text-slate-100">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-slate-300">
            module details
          </h1>
          <div className="space-y-2">
            <div className="text-xl font-semibold">{moduleData?.title}</div>
            <div className="text-slate-300 text-sm">
              {moduleData?.description}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-2xl font-semibold text-slate-300">tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 shadow-md"
              >
                {editingTaskId === task._id ? (
                  <div className="space-y-3">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-slate-900 w-full border border-slate-600 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-slate-900 w-full border border-slate-600 rounded-lg px-3 py-2 text-sm"
                    />
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-slate-300">
                        Due Date:
                      </label>
                      <select
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-sm"
                      >
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="this-week">This Week</option>
                        <option value="next-week">Next Week</option>
                        <option value="no-deadline">No Deadline</option>
                      </select>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => submitTaskEdit(task._id)}
                        className="px-4 py-1.5 rounded-full bg-slate-500 text-white-900 font-semibold hover:bg-slate-400 transition"
                      >
                        save
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="px-4 py-1.5 rounded-full bg-orange-600 text-slate-100 text-sm hover:bg-slate-500 transition"
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-semibold text-lg">{task.title}</div>
                    <div className="text-slate-300 text-sm mb-3">
                      {task.description}
                    </div>
                    <div className="flex items-center gap-4">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(task._id, e.target.value)
                        }
                        className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="todo">to do</option>
                        <option value="in-progress">in progress</option>
                        <option value="done">done</option>
                      </select>

                      <button
                        onClick={() => startEditing(task)}
                        className="px-4 py-1.5 rounded-full bg-orange-500 text-slate-900 text-sm font-semibold hover:bg-orange-400 transition"
                      >
                        edit
                      </button>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="px-4 py-1.5 rounded-full bg-slate-500 text-slate-50 text-sm font-semibold hover:bg-grey-400 transition"
                      >
                        delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-slate-300 mb-4">
            create task
          </h2>

          <form onSubmit={createTask} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300">Title:</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300">Description:</label>
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300">Due Date:</label>
              <select
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-sm"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
                <option value="next-week">Next Week</option>
                <option value="no-deadline">No Deadline</option>
              </select>
            </div>

            <input
              type="submit"
              value="Add Task"
              className="mt-2 inline-flex items-center justify-center px-5 py-2 rounded-full bg-orange-500 text-slate-900 font-semibold hover:bg-orange-400 cursor-pointer transition"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetailsPage;
