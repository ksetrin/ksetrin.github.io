import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ArticlesPage from './pages/ArticlesPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </I18nextProvider>
  );
};

export default App;
