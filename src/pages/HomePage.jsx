import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaReact, FaGithub, FaNode, FaCode } from 'react-icons/fa';
import { SiTypescript, SiFirebase, SiRedux, SiMobx, SiGit } from 'react-icons/si';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-16">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:space-x-12 py-12">
        <div className="relative mb-8 md:mb-0">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-2xl transform scale-110"></div>
          <img
            src="/src/assets/images/photo.jpeg"
            alt="Konstantin's Portrait"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl ring-4 ring-blue-500/30 object-cover relative z-10"
          />
        </div>
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('homepage.introduction.title')}
          </h1>
          <h2 className="text-2xl md:text-3xl mt-4 text-gray-600 dark:text-gray-300">
            {t('homepage.introduction.subtitle')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {t('homepage.introduction.description')}
          </p>
          <Link to="/projects" className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
            {t('homepage.introduction.ctaButton')}
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('homepage.skills.title')}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('homepage.skills.description')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaReact className="w-8 h-8" />, name: 'React' },
            { icon: <FaReact className="w-8 h-8" />, name: 'React Native' },
            { icon: <SiTypescript className="w-8 h-8" />, name: 'TypeScript' },
            { icon: <SiGit className="w-8 h-8" />, name: 'Git' },
            { icon: <FaCode className="w-8 h-8" />, name: 'REST API' },
            { icon: <FaNode className="w-8 h-8" />, name: 'Node.js' },
          ].map(skill => (
            <div key={skill.name} className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-500 mr-4">{skill.icon}</div>
              <span className="font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('homepage.experience.title')}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('homepage.experience.description')}</p>
        </div>
        <div className="space-y-8">
          {[
            { role: 'Senior Developer', company: 'TechCorp', years: '2020 - Present', tech: 'React, Node.js, Firebase', icon: <FaReact /> },
            { role: 'Frontend Developer', company: 'WebSolutions', years: '2017 - 2020', tech: 'React, Redux, REST API', icon: <SiRedux /> },
            { role: 'Junior Developer', company: 'CodeFactory', years: '2015 - 2017', tech: 'JavaScript, Git', icon: <FaCode /> },
          ].map(exp => (
            <div key={exp.company} className="relative pl-8 md:pl-0">
              <div className="md:flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="text-blue-500 mr-3">{exp.icon}</span>
                    {exp.role}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{exp.company} • {exp.years}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Tech: {exp.tech}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('homepage.techStack.title')}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('homepage.techStack.description')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: <FaReact className="w-12 h-12" />, name: 'React' },
            { icon: <SiRedux className="w-12 h-12" />, name: 'Redux' },
            { icon: <SiMobx className="w-12 h-12" />, name: 'MobX' },
            { icon: <FaNode className="w-12 h-12" />, name: 'Node.js' },
            { icon: <SiFirebase className="w-12 h-12" />, name: 'Firebase' },
          ].map(tech => (
            <div key={tech.name} className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="text-blue-500 mb-3">{tech.icon}</div>
              <span className="font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t('homepage.purpose.title')}</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {t('homepage.purpose.description')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
