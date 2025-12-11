import { useState, useEffect } from "react";
import type { Module, Task } from "../types";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";

function ModuleDetailsPage() {
  // holds the module we fetch
  const [moduleData, setModuleData] = useState<Module | null>(null);
  // holds all tasks for this module
  const [tasks, setTasks] = useState<Task[]>([]);
  // loading + error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // form inputs for new task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { moduleId } = useParams();

  // gets module details + tasks when the page loads or when moduleId changes
  useEffect(() => {
    async function fetchModuleDetails() {
      try {
        setLoading(true); // waiting on backend
        const res = await apiClient.get(`/api/modules/${moduleId}`); // get module info
        console.log(res.data); // see what comes back
        setModuleData(res.data); // save module in state
      } catch (error: any) {
        console.log(error); // show error in console
        setError(error.message); // show error to user
      } finally {
        setLoading(false); // stop loading
      }
    }
    fetchModuleDetails();
  }, [moduleId]);

  // gets tasks for this module
  useEffect(() => {
    async function fetchModuleTasks() {
      try {
        const res = await apiClient.get(`/api/modules/${moduleId}/tasks`); // grab tasks for module
        console.log(res.data); // inspect response
        setTasks(res.data); // save tasks in state
      } catch (error) {
        console.error(error); // see what went wrong
      }
    }
    fetchModuleTasks();
  }, [moduleId]);

  // >>> CREATE TASK <<<
  async function createTask(e: any) {
    e.preventDefault(); // stop page reload

    try {
      // hit backend to make a new task
      const res = await apiClient.post(`/api/modules/${moduleId}/tasks`, {
        title: taskTitle,
        description: taskDescription,
      });

      // add new task to list
      setTasks((prev) => [...prev, res.data]);

      // clear form inputs
      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      console.error(error); // see what went wrong
    }
  }

  // >>> UPDATE TASK STATUS <<<
  async function updateTaskStatus(taskId: string, newStatus: string) {
    try {
      // call backend to update task status
      const res = await apiClient.put(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      // update tasks in state with new status
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: res.data.status } : task
        )
      );
    } catch (error) {
      console.error(error); // see what went wrong
    }
  }

  // >>> DELETE TASK <<<
  async function deleteTask(taskId: string) {
    try {
      // delete task in backend
      await apiClient.delete(`/api/tasks/${taskId}`);
      // remove it from state
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error); // see what went wrong
    }
  }

  // show loading if waiting on backend
  if (loading) return <div>loading...</div>;

  // show basic error message
  if (error) return <div>error loading module</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 px-4 py-10 text-slate-100">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* module header */}
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

        {/* tasks section */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-2xl font-semibold text-slate-300">tasks</h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 shadow-md"
              >
                <div className="font-semibold text-lg">{task.title}</div>
                <div className="text-slate-300 text-sm mb-3">
                  {task.description}
                </div>

                {/* status + delete row */}
                <div className="flex items-center gap-4">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                    className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="todo">to do</option>
                    <option value="in-progress">in progress</option>
                    <option value="done">done</option>
                  </select>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-4 py-1.5 rounded-full bg-red-500 text-slate-50 text-sm font-semibold hover:bg-red-400 transition"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* create task */}
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
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300">Description:</label>
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
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
