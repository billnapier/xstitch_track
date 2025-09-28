import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';

const BrowseProjects: React.FC = () => {
  const { projects, deleteProject, loading } = useProjects();

  if (loading) {
    return <div className="text-center text-slate-500">Loading projects...</div>;
  }
  
  if (projects.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">No Projects Yet!</h2>
        <p className="text-slate-500 mb-6">It looks like your project journal is empty. Let's add your first one.</p>
        <Link 
          to="/add" 
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add a New Project
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <Link to={`/project/${project.id}`} key={project.id} className="block">
            <ProjectCard project={project} onDelete={deleteProject} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseProjects;
