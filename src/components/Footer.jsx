import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center backdrop-blur-xs">
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;
