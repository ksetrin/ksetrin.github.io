import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>{t('footer.copyright')}</span>
        <div className="social">
          <a href="https://github.com/ksetrin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://t.me/ksetrin" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegram size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ksetrin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
