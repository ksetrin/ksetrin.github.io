import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-color', '#121212');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--link-color', '#bb86fc');
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#000000');
      root.style.setProperty('--link-color', '#1a73e8');
    }
  }, [theme]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center backdrop-blur-xs" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <nav className="flex space-x-4">
        <Link to="/" className="hover:underline" style={{ color: 'var(--link-color)' }}>{t('header.home')}</Link>
        <Link to="/projects" className="hover:underline" style={{ color: 'var(--link-color)' }}>{t('header.projects')}</Link>
        <Link to="/articles" className="hover:underline" style={{ color: 'var(--link-color)' }}>{t('header.articles')}</Link>
      </nav>
      <div className="flex space-x-4">
        <button onClick={toggleTheme}>{t('header.themeToggle')}</button>
        <button onClick={toggleLanguage}>{t('header.languageSwitch')}</button>
      </div>
    </header>
  );
};

export default Header;
