import { useState, useEffect } from "react";
import type { Module } from "../types";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";

function ModuleDetailsPage() {
  // holds the module we fetch
  const [moduleData, setModuleData] = useState<Module | null>(null);
  // loading + error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    async function fetchModuleTasks() {
      try {
        // later we will set loading + error for tasks (separate state)
        const res = await apiClient.get(`/api/modules/${moduleId}/tasks`); // grab tasks for module
        console.log(res.data); // inspect response
        // save tasks in state (we'll add tasks state soon)
      } catch (error) {
        console.error(error); // see what went wrong
        // later we will set task error state
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
    </div>
  );
}

export default ModuleDetailsPage;
