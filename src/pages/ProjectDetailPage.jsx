import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { FaApple, FaGooglePlay, FaExternalLinkAlt } from 'react-icons/fa';
import { projectByKey } from '@/projects';
import usePageMetadata from '@/hooks/usePageMetadata';

const asArray = (value) => (Array.isArray(value) ? value : []);

const Points = ({ items }) => (
  <ul className="proj-points">
    {asArray(items).map((item, index) => (
      <li key={index}>
        {item.title && <strong>{item.title}</strong>}
        {item.description && <p>{item.description}</p>}
        {asArray(item.details).length > 0 && (
          <ul className="details">
            {item.details.map((detail, di) => (
              <li key={di}>{detail}</li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const Section = ({ data, children }) => {
  if (!data) return null;
  return (
    <section className="proj-section">
      {data.title && <h2>{data.title}</h2>}
      {data.description && <p>{data.description}</p>}
      {children}
    </section>
  );
};

const ProjectDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { key } = useParams();
  const [zoom, setZoom] = useState(null);

  const project = projectByKey[key];
  const content = project ? t(project.key, { returnObjects: true }) : null;
  const data = content && typeof content === 'object' ? content : null;

  usePageMetadata({
    title: data?.hero?.title || project?.title || t('projects.title'),
    description: data?.hero?.tagline || data?.hero?.description || t('projects.metaDescription'),
    canonical: project ? `https://ksetrin.github.io/projects/${project.key}/` : 'https://ksetrin.github.io/projects/',
    type: 'article',
    lang: i18n.language
  });

  if (!project || !data) {
    return (
      <div className="container page">
        <p className="empty">{t('projects.notFound')}</p>
        <p><Link to="/projects" className="article__back">← {t('projects.back')}</Link></p>
      </div>
    );
  }

  const hero = data.hero || {};
  const overviewMeta = Object.entries(data.overview || {}).filter(
    ([k, v]) => !['title', 'description'].includes(k) && typeof v === 'string'
  );
  const impactList = asArray(data.impact?.achievements || data.impact?.metrics || data.impact?.recognition);

  return (
    <div className="container page">
      <Link to="/projects" className="article__back">← {t('projects.back')}</Link>

      <div className="project-hero">
        {hero.subtitle && <p className="eyebrow">{hero.subtitle}</p>}
        <h1>{hero.title || project.title}</h1>
        {(hero.tagline || hero.description) && (
          <p className="project-hero__tagline">{hero.tagline || hero.description}</p>
        )}
        {asArray(hero.technologies).length > 0 && (
          <div className="tags">
            {hero.technologies.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}
        <div className="project-hero__links">
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

      <Section data={data.overview}>
        {overviewMeta.length > 0 && (
          <ul className="proj-meta">
            {overviewMeta.map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        )}
      </Section>

      <Section data={data.challenge}>
        <Points items={data.challenge?.problems} />
      </Section>

      <Section data={data.solution}>
        <Points items={data.solution?.features} />
      </Section>

      <Section data={data.technical}>
        {data.technical && Object.entries(data.technical).map(([k, sectionData]) => {
          if (['title', 'description', 'technologies'].includes(k)) return null;
          return (
            <div key={k} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{sectionData.title}</h3>
              <ul className="details" style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {asArray(sectionData.items).map((item, i) => <li key={i}>{typeof item === 'string' ? item : Object.values(item).join(' — ')}</li>)}
              </ul>
            </div>
          );
        })}
        {asArray(data.technical?.technologies).length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {data.technical.technologies.map((tech, i) => (
                <div key={i} style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{tech.category}</h4>
                  <ul className="details" style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    {asArray(tech.items).map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section data={data.results}>
        {asArray(data.results?.metrics).length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {data.results.metrics.map((m, i) => (
              <div key={i} style={{ textAlign: 'center', backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>{m.value}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.2rem' }}>{m.label}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{m.period || m.description}</div>
              </div>
            ))}
          </div>
        )}
        <Points items={data.results?.studies} />
      </Section>

      <Section data={data.methodology}>
        <Points items={data.methodology?.criteria || data.methodology?.items} />
      </Section>

      <Section data={data.userExperience}>
        <Points items={data.userExperience?.stakeholders || data.userExperience?.items} />
      </Section>

      <Section data={data.impact}>
        {impactList.length > 0 && (
          <ul className="proj-meta">
            {impactList.map((item, index) => (
              <li key={index}>{typeof item === 'string' ? item : Object.values(item).join(' — ')}</li>
            ))}
          </ul>
        )}
      </Section>

      {(project.video || project.screens.length > 0) && (
        <section className="proj-section">
          <h2>{t('projects.screenshots')}</h2>

          {project.video && (
            <div className="proj-video" style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--surface)' }}>
              <video
                controls
                muted
                loop
                playsInline
                poster={project.videoPoster}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            </div>
          )}

          {project.screens.length > 0 && (
            <div className="screens">
              {project.screens.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} — ${index + 1}`}
                  loading="lazy"
                  onClick={() => setZoom(src)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="presentation">
          <img src={zoom} alt={project.title} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
