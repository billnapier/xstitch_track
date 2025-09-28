import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BrowseProjects from './pages/BrowseProjects';
import InProgressProjects from './pages/InProgressProjects';
import AddProject from './pages/AddProject';
import ProjectDetails from './pages/ProjectDetails';
import { ProjectsProvider } from './hooks/useProjects';

function App() {
  return (
    <ProjectsProvider>
      <HashRouter>
        <div className="min-h-screen bg-slate-50 text-slate-800">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<BrowseProjects />} />
              <Route path="/in-progress" element={<InProgressProjects />} />
              <Route path="/add" element={<AddProject />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ProjectsProvider>
  );
}

export default App;
