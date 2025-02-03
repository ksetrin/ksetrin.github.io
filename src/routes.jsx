import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ArticlesPage from './pages/ArticlesPage';
import MebixProject from './pages/projects/Mebix';
import TapcarProject from './pages/projects/TapCar';
import ZnajProject from './pages/projects/Znaj';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/mebix" element={<MebixProject />} />
            <Route path="/projects/tapcar" element={<TapcarProject />} />
            <Route path="/projects/znaj" element={<ZnajProject />} />
            <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
    );
};

export default AppRoutes;
