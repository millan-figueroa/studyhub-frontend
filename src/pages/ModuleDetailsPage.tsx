import { useState, useEffect } from "react";
import type { Module, Task } from "../types";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";

function ModuleDetailsPage() {
  // holds the module we fetch
  const [moduleData, setModuleData] = useState<Module | null>(null);
  // holds all tasks for this module
  const [tasks, setTasks] = useState<Task[]>([]);
  // loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { moduleId } = useParams();

  // gets module details when page loads or moduleId changes
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
    </div>
  );
}

export default ModuleDetailsPage;
