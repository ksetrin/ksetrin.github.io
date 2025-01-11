import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTelegram, FaWhatsapp, FaSun, FaMoon } from 'react-icons/fa';
import { GB, RU } from 'country-flag-icons/react/3x2';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              {t('header.home')}
            </Link>
            <Link 
              to="/projects" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              {t('header.projects')}
            </Link>
            <Link 
              to="/articles" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              {t('header.articles')}
            </Link>
          </nav>

          {/* Social Links and Controls */}
          <div className="flex items-center space-x-6">
            {/* Social Links */}
            <a 
              href="https://github.com/ksetrin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href="https://t.me/ksetrin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <FaTelegram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/+79991234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label={t('header.themeToggle')}
            >
              {theme === 'dark' ? 
                <FaSun className="w-5 h-5" /> : 
                <FaMoon className="w-5 h-5" />
              }
            </button>

            {/* Language Switch */}
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label={t('header.languageSwitch')}
            >
              {i18n.language === 'en' ? 
                <RU className="w-5 h-5 rounded-sm" /> : 
                <GB className="w-5 h-5 rounded-sm" />
              }
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
