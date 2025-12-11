import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ModulesPage from "./pages/ModulesPage"; // this is my modules dashboard
import Navbar from "./components/Navbar";
import ModuleDetailsPage from "./pages/ModuleDetailsPage"; // single module page
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    // wrapper for the whole app layout
    <BrowserRouter>
      <Navbar />

      {/* all my routes go in here so user can switch pages without reloading */}
      <Routes>
        {/* homepage (can update later if i want something else here) */}
        <Route path="/" element={<HomePage />} />

        {/* modules dashboard (list of all modules user created) */}
        <Route path="/modules" element={<ModulesPage />} />

        {/* module details page with tasks inside it */}
        <Route path="/modules/:moduleId" element={<ModuleDetailsPage />} />

        {/* login/register screen */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
