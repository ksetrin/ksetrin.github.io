import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ArticlesPage from "@/pages/ArticlesPage.jsx";
import ProjectsPage from "@/pages/ProjectsPage.jsx";
import MebixProject from "@/pages/projects/Mebix.jsx";
import TapcarProject from "@/pages/projects/TapCar.jsx";
import ZnajProject from "@/pages/projects/Znaj.jsx";
import CarMixProject from "@/pages/projects/CarMix.jsx";
import ChelyabinskgorgazProject from "@/pages/projects/Chelyabinskgorgaz.jsx";
import PrecoProject from "@/pages/projects/Preco.jsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/mebix" element={<MebixProject />} />
            <Route path="/projects/tapcar" element={<TapcarProject />} />
            <Route path="/projects/znaj" element={<ZnajProject />} />
            <Route path="/projects/carmix" element={<CarMixProject />} />
            <Route path="/projects/chelyabinskgorgaz" element={<ChelyabinskgorgazProject />} />
            <Route path="/projects/preco" element={<PrecoProject />} />
            <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
    );
};

export default AppRoutes;
