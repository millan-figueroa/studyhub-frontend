import { useState } from "react";
import type { Module } from "../types";

function ModuleDetailsPage() {
  // holds the module we fetch
  const [moduleData, setModuleData] = useState<Module | null>(null);
  // loading + error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
