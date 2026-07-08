import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  const nextLang = i18n.language === 'en' ? 'RU' : 'EN';

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">{t('header.brand')}</Link>
        <nav className="site-nav">
          <NavLink to="/" end>{t('header.blog')}</NavLink>
          <NavLink to="/projects">{t('header.projects')}</NavLink>
          <NavLink to="/about">{t('header.about')}</NavLink>
          <button type="button" className="lang-toggle" onClick={toggleLanguage} aria-label={t('header.languageSwitch')}>
            {nextLang}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
