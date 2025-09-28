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
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ImageIcon } from '../components/icons';

const AddProject: React.FC = () => {
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [designer, setDesigner] = useState('');
  const [fabric, setFabric] = useState('');
  const [flossBrand, setFlossBrand] = useState('DMC');
  
  const today = new Date().toISOString().split('T')[0];
  const [purchaseDate, setPurchaseDate] = useState(today);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };
        reader.onerror = () => {
            console.error("Failed to read file for preview");
            alert("Sorry, there was an error processing the image.");
        }
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designer) {
        alert("Please fill in all required fields.");
        return;
    }

    addProject({
      name,
      designer,
      fabric,
      flossBrand,
      purchaseDate,
      finishDate: null,
      inProgress: true,
    }, imageUrl);
    navigate('/');
  };
  
  const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="designer" className="block text-sm font-medium text-slate-700 mb-1">Designer</label>
          <input
            type="text"
            id="designer"
            value={designer}
            onChange={(e) => setDesigner(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="fabric" className="block text-sm font-medium text-slate-700 mb-1">Fabric (e.g., 14ct Aida, White)</label>
          <input
            type="text"
            id="fabric"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="flossBrand" className="block text-sm font-medium text-slate-700 mb-1">Floss Brand</label>
          <select
            id="flossBrand"
            value={flossBrand}
            onChange={(e) => setFlossBrand(e.target.value)}
            className={inputClasses}
          >
            <option>DMC</option>
            <option>Anchor</option>
            <option>Weeks Dye Works</option>
            <option>Classic Colorworks</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-slate-700 mb-1">Purchase Date</label>
          <input
            type="date"
            id="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className={inputClasses}
            required
          />
        </div>
         <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Starting Photo (Optional)
            </label>
            <div className="mt-1 flex items-center gap-4">
                <span className="h-24 w-24 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center text-slate-400">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Project preview" className="h-full w-full object-cover" />
                    ) : (
                        <ImageIcon />
                    )}
                </span>
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-slate-300 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span>Upload a photo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>
        </div>
        <div className="flex justify-end pt-4">
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add Project
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;