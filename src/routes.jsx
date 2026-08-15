import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BlogPage from '@/pages/BlogPage';
import AboutPage from '@/pages/AboutPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ArticleViewer from '@/pages/ArticleViewer';
import ToolsPage from '@/pages/ToolsPage';
import CareerApp from '@/tools/career/CareerApp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:key" element={<ProjectDetailPage />} />
      <Route path="/articles/:slug/*" element={<ArticleViewer />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/tools/career" element={<CareerApp />} />
      <Route path="/tools/career/:section" element={<CareerApp />} />
      {/* Короткий адрес из ТЗ (§51) ведёт в раздел Tools, а не дублирует приложение. */}
      <Route path="/career" element={<Navigate to="/tools/career" replace />} />
      <Route path="/career/:section" element={<Navigate to="/tools/career" replace />} />
    </Routes>
  );
};

export default AppRoutes;
