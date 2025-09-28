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

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Project } from '../types';

interface ProjectsContextType {
  projects: Project[];
  addProject: (projectData: Omit<Project, 'id' | 'imageUrls'>, initialImageUrl?: string | null) => void;
  deleteProject: (id: number) => void;
  toggleProjectStatus: (id: number) => void;
  addImageToProject: (projectId: number, imageUrl: string) => void;
  loading: boolean;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('crossStitchProjects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error("Failed to load projects from localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
        if(!loading) {
            localStorage.setItem('crossStitchProjects', JSON.stringify(projects));
        }
    } catch (error) {
        console.error("Failed to save projects to localStorage", error);
    }
  }, [projects, loading]);

  const addProject = useCallback((projectData: Omit<Project, 'id' | 'imageUrls'>, initialImageUrl?: string | null) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now(),
      imageUrls: initialImageUrl ? [initialImageUrl] : [],
    };
    setProjects(prev => [newProject, ...prev]);
  }, []);

  const deleteProject = useCallback((id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleProjectStatus = useCallback((id: number) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === id 
          ? { 
              ...p, 
              inProgress: !p.inProgress,
              finishDate: p.inProgress ? new Date().toISOString().split('T')[0] : null
            } 
          : p
      )
    );
  }, []);

  const addImageToProject = useCallback((projectId: number, imageUrl: string) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === projectId
          ? { ...p, imageUrls: [...p.imageUrls, imageUrl] }
          : p
      )
    );
  }, []);

  // Fix: Replaced JSX with React.createElement to be valid in a .ts file, resolving multiple parsing errors.
  return React.createElement(ProjectsContext.Provider, { value: { projects, addProject, deleteProject, toggleProjectStatus, addImageToProject, loading } }, children);
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};