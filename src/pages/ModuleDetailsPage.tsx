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

  // show loading if waiting on backend
  if (loading) return <div>loading...</div>;

  // show basic error message
  if (error) return <div>error loading module</div>;

  return (
    <div>
      <h1>Module Details</h1>

      <div>
        {/* name and description from the module */}
        <div>{moduleData?.name}</div>
        <div>{moduleData?.description}</div>
      </div>

      <h2>Tasks</h2>
      {/* list all tasks for this module */}
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
          </div>
        ))}
      </div>

      <h2>Create Task</h2>
      <form onSubmit={createTask}>
        <label>Title:</label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
}

export default ModuleDetailsPage;
