import { apiClient } from "../clients/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Module } from "../types";

function ProjectsPage() {
  // this will hold all the modules from the backend
  const [projects, setProjects] = useState<Module[]>([]);
  // if something goes wrong save the error here
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // form inputs for adding a new module
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // this runs one time when the page loads so i can grab all my modules
    async function fetchProjects() {
      try {
        setLoading(true); // show loading while i wait for backend
        const res = await apiClient.get("/api/projects"); // call my backend route
        console.log(res.data); // just checking what comes back
        setProjects(res.data); // save modules in state so i can show them
      } catch (error: any) {
        console.log(error); // see what went wrong
        setError(error.message); // show error to user
      } finally {
        setLoading(false); // turn loading off no matter what
      }
    }

    fetchProjects();
  }, []);

  // placeholder for now, we will add the real create function later
  async function handleSubmit(e: any) {
    e.preventDefault();
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
        {projects &&
          projects.map((project) => (
            <div key={project._id}>
              <div>{project.name}</div>
              <div>{project.description}</div>
              {/* link to the details page for this module */}
              <Link to={`/modules/${project._id}`}>See Module</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
