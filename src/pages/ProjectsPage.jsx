import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { projects } from '@/projects';
import usePageMetadata from '@/hooks/usePageMetadata';

const ProjectsPage = () => {
  const { t, i18n } = useTranslation();

  usePageMetadata({
    title: t('projects.metaTitle'),
    description: t('projects.metaDescription'),
    canonical: 'https://ksetrin.github.io/projects/',
    lang: i18n.language
  });

  return (
    <div className="container page">
      <div className="page-head">
        <p className="eyebrow">{t('projects.eyebrow')}</p>
        <h1>{t('projects.title')}</h1>
        <p>{t('projects.subtitle')}</p>
      </div>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.key} className="project">
            {project.preview && (
              <img className="project__thumb" src={project.preview} alt={project.title} loading="lazy" />
            )}
            <div className="project__body">
              <h2 className="project__title">
                <Link to={`/projects/${project.key}`}>{project.title}</Link>
                <span className="project__domain">{t(`projects.domains.${project.domain}`)}</span>
              </h2>
              <p className="project__desc">{t(`projects.cards.${project.key}.description`)}</p>
              <div className="project__links">
                <span className="tag">{project.tech}</span>
                <Link to={`/projects/${project.key}`}>
                  {t('projects.viewProject')} <FaArrowRight size={12} />
                </Link>
                {project.links.website && (
                  <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt size={13} /> {t('projects.links.website')}
                  </a>
                )}
                {project.links.appStore && (
                  <a href={project.links.appStore} target="_blank" rel="noopener noreferrer">
                    <FaApple size={14} /> App Store
                  </a>
                )}
                {project.links.googlePlay && (
                  <a href={project.links.googlePlay} target="_blank" rel="noopener noreferrer">
                    <FaGooglePlay size={13} /> Google Play
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
