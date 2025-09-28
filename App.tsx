/*
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
