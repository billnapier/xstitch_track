import React from 'react';
import { Project } from '../types';
import { TrashIcon, CheckIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  onToggleStatus?: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, onToggleStatus }) => {
  const { id, name, designer, fabric, flossBrand, purchaseDate, finishDate, inProgress, imageUrls } = project;

  const displayImage = imageUrls[0] || `https://via.placeholder.com/600x400.png?text=No+Image`;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleStatus) {
      onToggleStatus(id);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
      <img src={displayImage} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-blue-800 mb-2">{name}</h3>
        <p className="text-sm text-slate-600 mb-4">by {designer}</p>

        <div className="space-y-2 text-sm text-slate-700 mb-4 flex-grow">
          {fabric && <p><strong>Fabric:</strong> {fabric}</p>}
          <p><strong>Floss:</strong> {flossBrand}</p>
          <p><strong>Purchased:</strong> {purchaseDate}</p>
          {finishDate && <p><strong>Finished:</strong> {finishDate}</p>}
        </div>

        <div className="flex items-center justify-between mt-auto">
            {inProgress ? (
                 <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">In Progress</span>
            ) : (
                <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Completed</span>
            )}
          
          <div className="flex items-center space-x-2">
            {onToggleStatus && inProgress && (
              <button
                onClick={handleToggleClick}
                className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                title="Mark as Complete"
              >
                <CheckIcon />
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              title="Delete Project"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;