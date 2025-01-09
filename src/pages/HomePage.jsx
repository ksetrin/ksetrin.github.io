import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <section className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <img
          src="src/assets/images/photo.jpeg"
          alt="Konstantin's Portrait"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold">{t('homepage.introduction.title')}</h1>
          <p className="mt-2 text-lg">{t('homepage.introduction.description')}</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{t('homepage.skills.title')}</h2>
        <ul className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {['React', 'React Native', 'JavaScript/TypeScript', 'Git', 'REST API', 'Node.js'].map(skill => (
            <li key={skill} className="bg-gray-200 p-2 rounded">{skill}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{t('homepage.experience.title')}</h2>
        <ul className="mt-2 space-y-2">
          {[
            { role: 'Senior Developer', company: 'TechCorp', years: '2020 - Present', tech: 'React, Node.js, Firebase' },
            { role: 'Frontend Developer', company: 'WebSolutions', years: '2017 - 2020', tech: 'React, Redux, REST API' },
            { role: 'Junior Developer', company: 'CodeFactory', years: '2015 - 2017', tech: 'JavaScript, Git' },
          ].map(exp => (
            <li key={exp.company} className="border-l-4 border-blue-500 pl-4">
              <strong>{exp.role}</strong> at {exp.company} ({exp.years})<br />
              <span className="text-sm text-gray-600">Tech: {exp.tech}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{t('homepage.techStack.title')}</h2>
        <div className="mt-2 flex flex-wrap gap-4">
          {['React', 'Redux', 'MobX', 'Node.js', 'Firebase'].map(tech => (
            <span key={tech} className="bg-gray-200 p-2 rounded">{tech}</span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Purpose</h2>
        <p className="mt-2 text-lg">
          The goal of this portfolio site is to attract potential employers and freelance clients for project-based work. HR managers should be able to clearly see my experience and skills.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
