import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import { tools } from '@/tools/registry';
import usePageMetadata from '@/hooks/usePageMetadata';

const ToolsPage = () => {
  const { t, i18n } = useTranslation();

  usePageMetadata({
    title: t('tools.metaTitle'),
    description: t('tools.metaDescription'),
    canonical: 'https://ksetrin.github.io/tools/',
    lang: i18n.language
  });

  return (
    <div className="container page">
      <div className="page-head">
        <h1>{t('tools.title')}</h1>
        <p>{t('tools.subtitle')}</p>
      </div>

      <ul className="tool-list">
        {tools.map((tool) => (
          <li key={tool.key} className="tool">
            <h2 className="tool__title">
              <Link to={tool.path}>{t(`tools.items.${tool.key}.title`)}</Link>
              <span className="tool__status">{t(`tools.statuses.${tool.status}`)}</span>
            </h2>
            <p className="tool__desc">{t(`tools.items.${tool.key}.description`)}</p>
            <div className="tool__meta">
              {tool.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
              <Link to={tool.path}>
                {t('tools.open')} <FaArrowRight size={12} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsPage;
