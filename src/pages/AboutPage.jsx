import React from 'react';
import { useTranslation } from 'react-i18next';
import usePageMetadata from '@/hooks/usePageMetadata';
import portrait from '@/assets/images/photo.jpeg';

const asArray = (value) => (Array.isArray(value) ? value : []);

const logoModules = import.meta.glob('../assets/images/companies/*', { eager: true, import: 'default' });
const logoFile = { mebix: 'mebix.png', bamboo: 'bamboo.jpeg', theredone: 'the-red-one.jpg' };
const logoFor = (key) => logoModules[`../assets/images/companies/${logoFile[key]}`];

const AboutPage = () => {
  const { t, i18n } = useTranslation();

  usePageMetadata({
    title: t('about.metaTitle'),
    description: t('about.metaDescription'),
    canonical: 'https://ksetrin.github.io/about/',
    lang: i18n.language
  });

  const skills = asArray(t('about.skills', { returnObjects: true }));
  const experience = asArray(t('about.experience', { returnObjects: true }));
  const stack = asArray(t('about.stack', { returnObjects: true }));

  return (
    <div className="container page">
      <div className="page-head">
        <p className="eyebrow">{t('about.eyebrow')}</p>
        <h1>{t('about.title')}</h1>
      </div>

      <section className="about-section">
        <div className="about-portrait">
          <img src={portrait} alt={t('about.title')} />
          <p className="about-lead">{t('about.lead')}</p>
        </div>
      </section>

      {skills.length > 0 && (
        <section className="about-section">
          <h2>{t('about.skillsTitle')}</h2>
          <ul className="about-skills">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {experience.length > 0 && (
        <section className="about-section">
          <h2>{t('about.experienceTitle')}</h2>
          <ul className="timeline">
            {experience.map((item) => (
              <li key={item.key}>
                <div className="timeline__when">{item.years}</div>
                {logoFor(item.key) && (
                  <img className="timeline__logo" src={logoFor(item.key)} alt={item.company} loading="lazy" />
                )}
                <div className="timeline__what">
                  <strong>{item.company}</strong>
                  <p>{item.description}</p>
                  <p className="tech">{item.tech}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {stack.length > 0 && (
        <section className="about-section">
          <h2>{t('about.stackTitle')}</h2>
          <div className="stack-groups">
            {stack.map((group) => (
              <div key={group.group}>
                <h3>{group.group}</h3>
                <p>{group.items}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
