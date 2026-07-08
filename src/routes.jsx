import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogPage from '@/pages/BlogPage';
import AboutPage from '@/pages/AboutPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ArticleViewer from '@/pages/ArticleViewer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:key" element={<ProjectDetailPage />} />
      <Route path="/articles/:slug/*" element={<ArticleViewer />} />
    </Routes>
  );
};

export default AppRoutes;
