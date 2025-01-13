import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ArticlesPage from './pages/ArticlesPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
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
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
