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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // edit state for updating a module inline
  const [editingId, setEditingId] = useState("");
  const [editTitle, setEditTitle] = useState("");
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
      const res = await apiClient.post("/api/modules", {
        title,
        description,
      }); // create new module
      setModules((prev) => [...prev, res.data]); // add new module to list
    } catch (error: any) {
      console.error(error); // see what went wrong
      setError(error.message); // show error to user
    } finally {
      setLoading(false); // stop loading
      setTitle(""); // clear form
      setDescription(""); // clear form
    }
  }

  // >>>> UPDATE MODULE <<<<
  async function handleUpdateModule(e: any) {
    e.preventDefault();

    try {
      setLoading(true); // waiting on backend
      const res = await apiClient.put(`/api/modules/${editingId}`, {
        title: editTitle,
        description: editDescription,
      }); // update module

      // update module in state list
      setModules((prev) =>
        prev.map((m) =>
          m._id === editingId
            ? {
                ...m,
                title: res.data.title,
                description: res.data.description,
              }
            : m
        )
      );

      // clear edit state
      setEditingId("");
      setEditTitle("");
      setEditDescription("");
    } catch (error: any) {
      console.error(error); // see what went wrong
      setError(error.message); // show error to user
    } finally {
      setLoading(false); // stop loading
    }
  }

  // >>>> DELETE MODULE <<<<
  async function deleteModule(id: string) {
    try {
      setLoading(true); // waiting on backend
      await apiClient.delete(`/api/modules/${id}`); // delete module in backend
      setModules((prev) => prev.filter((m) => m._id !== id)); // remove from state
    } catch (error: any) {
      console.error(error); // see what went wrong
      setError(error.message); // show error to user
    } finally {
      setLoading(false); // stop loading
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 px-4 py-8 text-slate-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-400">modules</h1>

        {/* form for creating a new module */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="module-name" className="text-sm text-slate-300">
              Module Name:
            </label>
            <input
              type="text"
              name="module-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="module-description"
              className="text-sm text-slate-300"
            >
              Module Description:
            </label>
            <input
              type="text"
              name="module-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          <input
            type="submit"
            value={loading ? "creating..." : "Create Module"}
            className="mt-2 inline-flex items-center justify-center px-5 py-2 rounded-full bg-orange-500 text-slate-900 font-semibold hover:bg-orange-400 cursor-pointer transition disabled:opacity-60"
            disabled={loading}
          />
        </form>

        {/* show errors if we have any */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-500/40 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* list out all the modules */}
        <div className="space-y-4">
          {modules &&
            modules.map((module) => (
              <div
                key={module._id}
                className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-md"
              >
                {editingId === module._id ? (
                  // edit mode
                  <form
                    onSubmit={handleUpdateModule}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-full bg-orange-500 text-slate-900 text-sm font-semibold hover:bg-orange-400 transition"
                      >
                        save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId("");
                          setEditTitle("");
                          setEditDescription("");
                        }}
                        className="px-4 py-1.5 rounded-full border border-slate-500 text-slate-100 text-sm hover:bg-slate-700 transition"
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // view mode
                  <>
                    <div className="font-semibold text-lg mb-1">
                      {module.title}
                    </div>
                    <div className="text-sm text-slate-300 mb-3">
                      {module.description}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/modules/${module._id}`}
                        className="px-4 py-1.5 rounded-full bg-slate-700 text-slate-100 text-sm hover:bg-slate-600 transition"
                      >
                        See Module
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(module._id);
                          setEditTitle(module.title);
                          setEditDescription(module.description);
                        }}
                        className="px-4 py-1.5 rounded-full border border-slate-500 text-slate-100 text-sm hover:bg-slate-700 transition"
                      >
                        edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteModule(module._id)}
                        className="px-4 py-1.5 rounded-full bg-red-500 text-slate-50 text-sm hover:bg-red-400 transition"
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
    </div>
  );
}

export default ModulesPage;
