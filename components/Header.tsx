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
import { NavLink } from 'react-router-dom';
import { PlusIcon, ListIcon, ClockIcon } from './icons';

const Header: React.FC = () => {
  const activeLinkClass = 'bg-blue-600 text-white';
  const inactiveLinkClass = 'text-slate-100 hover:bg-blue-800 hover:text-white';

  return (
    <header className="bg-blue-700 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-wider">StitchTrack</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                <ListIcon />
                All Projects
              </NavLink>
              <NavLink
                to="/in-progress"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                <ClockIcon />
                In Progress
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                <PlusIcon />
                Add Project
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
