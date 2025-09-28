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

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ImageIcon, ArrowLeftIcon } from '../components/icons';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { projects, addImageToProject } = useProjects();
    const [isUploading, setIsUploading] = useState(false);

    const projectId = Number(id);
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-slate-700">Project not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Go back to all projects</Link>
            </div>
        );
    }
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    addImageToProject(projectId, reader.result as string);
                }
                setIsUploading(false);
            };
            reader.onerror = () => {
                console.error("Failed to read file");
                setIsUploading(false);
                alert("Sorry, there was an error uploading the image.");
            }
            reader.readAsDataURL(file);
        }
    };

    const { name, designer, fabric, flossBrand, purchaseDate, finishDate, inProgress, imageUrls } = project;

    return (
        <div className="space-y-8">
            <div>
                <Link to="/" className="flex items-center gap-2 text-blue-600 hover:underline mb-4">
                    <ArrowLeftIcon />
                    Back to All Projects
                </Link>
                <h1 className="text-4xl font-bold text-slate-800">{name}</h1>
                <p className="text-lg text-slate-500">by {designer}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                    <p><strong>Fabric:</strong> {fabric || 'Not specified'}</p>
                    <p><strong>Floss:</strong> {flossBrand}</p>
                    <p><strong>Purchased:</strong> {purchaseDate}</p>
                    <p><strong>Status:</strong> {inProgress 
                        ? <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">In Progress</span>
                        : <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Completed</span>
                    }</p>
                    {finishDate && <p><strong>Finished:</strong> {finishDate}</p>}
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-slate-800">Progress Gallery</h2>
                     <label className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2">
                        <ImageIcon />
                        <span>{isUploading ? 'Uploading...' : 'Add Photo'}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                    </label>
                </div>
                {imageUrls.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Progress photo ${index + 1}`} className="w-full h-auto object-cover rounded-md shadow-sm" />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                        <p className="text-slate-500">No photos have been added yet.</p>
                        <p className="text-sm text-slate-400">Upload your first progress picture!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;