import { apiClient } from "../clients/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Module } from "../types";

function ModulesPage() {
  // this will hold all the modules from the backend
  const [modules, setModules] = useState<Module[]>([]);
  // if something goes wrong save the error here
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // form inputs for adding a new module
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // edit state for updating a module inline
  const [editingId, setEditingId] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // this runs one time when the page loads grabs all modules
  useEffect(() => {
    async function fetchModules() {
      try {
        setLoading(true); // show loading while waiting for backend
        const res = await apiClient.get("/api/modules"); // call backend route
        console.log(res.data); // checking what comes back
        setModules(res.data); // save modules in state to show them
      } catch (error: any) {
        console.log(error); // see what went wrong
        setError(error.message); // show error to user
      } finally {
        setLoading(false); // turn loading off no matter what
      }
    }
    fetchModules();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setLoading(true); // waiting on backend
      const res = await apiClient.post("/api/modules", { name, description }); // create new module
      setModules((prev) => [...prev, res.data]); // add new module to list
    } catch (error: any) {
      console.error(error); // see what went wrong
      setError(error.message); // show error to user
    } finally {
      setLoading(false); // stop loading
      setName(""); // clear form
      setDescription(""); // clear form
    }
  }

  // >>>> UPDATE MODULE <<<<
  async function handleUpdateModule(e: any) {
    e.preventDefault();

    try {
      setLoading(true); // waiting on backend
      const res = await apiClient.put(`/api/modules/${editingId}`, {
        name: editName,
        description: editDescription,
      }); // update module

      // update module in state list
      setModules((prev) =>
        prev.map((m) =>
          m._id === editingId
            ? { ...m, name: res.data.name, description: res.data.description }
            : m
        )
      );

      // clear edit state
      setEditingId("");
      setEditName("");
      setEditDescription("");
    } catch (error: any) {
      console.error(error); // see what went wrong
      setError(error.message); // show error to user
    } finally {
      setLoading(false); // stop loading
    }
  }

  return (
    <div>
      <h1>Modules</h1>

      {/* form for creating a new module */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="module-name">Module Name:</label>
        <input
          type="text"
          name="module-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="module-description">Module Description:</label>
        <input
          type="text"
          name="module-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="submit" value="Create Module" />
      </form>

      {/* show errors if we have any */}
      {error && <div>{error}</div>}

      {/* list out all the modules */}
      <div>
        {modules &&
          modules.map((module) => (
            <div key={module._id}>
              {editingId === module._id ? (
                // edit mode
                <form onSubmit={handleUpdateModule}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button type="submit">save</button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId("");
                      setEditName("");
                      setEditDescription("");
                    }}
                  >
                    cancel
                  </button>
                </form>
              ) : (
                // view mode
                <>
                  <div>{module.name}</div>
                  <div>{module.description}</div>
                  <Link to={`/modules/${module._id}`}>See Module</Link>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(module._id);
                      setEditName(module.name);
                      setEditDescription(module.description);
                    }}
                  >
                    edit
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ModulesPage;
