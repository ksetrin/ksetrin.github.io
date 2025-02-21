import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTelegram, FaLinkedin, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { GB, RU } from 'country-flag-icons/react/3x2';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <nav className="hidden md:flex space-x-8">
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

            <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                  href="https://github.com/ksetrin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                  href="https://t.me/ksetrin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <FaTelegram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                  href="https://www.linkedin.com/in/ksetrin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>

              <button
                  onClick={toggleTheme}
                  className="p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label={t('header.themeToggle')}
              >
                {theme === 'dark' ?
                    <FaSun className="w-4 h-4 sm:w-5 sm:h-5" /> :
                    <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" />
                }
              </button>

              <button
                  onClick={toggleLanguage}
                  className="p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label={t('header.languageSwitch')}
              >
                {i18n.language === 'en' ?
                    <RU className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm" /> :
                    <GB className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm" />
                }
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
            <>
              <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={closeMenu}
              ></div>
              <div className="absolute top-16 left-0 right-0 z-50 md:hidden shadow-xl">
                <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <nav className="flex flex-col space-y-1 py-4">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all mx-2 rounded-lg"
                    >
                      {t('header.home')}
                    </Link>
                    <Link
                        to="/projects"
                        onClick={closeMenu}
                        className="px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all mx-2 rounded-lg"
                    >
                      {t('header.projects')}
                    </Link>
                    <Link
                        to="/articles"
                        onClick={closeMenu}
                        className="px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all mx-2 rounded-lg"
                    >
                      {t('header.articles')}
                    </Link>
                  </nav>
                </div>
              </div>
            </>
        )}
      </header>
  );
};

export default Header;
