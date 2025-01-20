import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaReact, FaGithub, FaNode, FaCode } from 'react-icons/fa';
import { SiTypescript, SiFirebase, SiRedux, SiMobx, SiGit } from 'react-icons/si';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-8">
        <div className="relative mb-6 md:mb-0 md:mr-8">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-xl transform scale-105"></div>
          <img
            src="/assets/images/photo.jpeg"
            alt="Konstantin's Portrait"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-lg ring-2 ring-blue-500/20 object-cover relative z-10"
          />
        </div>
        <div className="text-center md:text-left max-w-2xl flex-1">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('homepage.introduction.title')}
          </h1>
          <h2 className="text-xl md:text-2xl mt-3 text-gray-600 dark:text-gray-300">
            {t('homepage.introduction.subtitle')}
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {t('homepage.introduction.description')}
          </p>
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            <Link to="/projects" className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              {t('homepage.introduction.ctaButton')}
            </Link>
            <a href="mailto:contact@example.com" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{t('homepage.skills.title')}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t('homepage.skills.description')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: <FaReact className="w-6 h-6" />, name: 'React', level: 'Expert' },
            { icon: <FaReact className="w-6 h-6" />, name: 'React Native', level: 'Advanced' },
            { icon: <SiTypescript className="w-6 h-6" />, name: 'TypeScript', level: 'Expert' },
            { icon: <SiGit className="w-6 h-6" />, name: 'Git', level: 'Advanced' },
            { icon: <FaCode className="w-6 h-6" />, name: 'REST API', level: 'Expert' },
            { icon: <FaNode className="w-6 h-6" />, name: 'Node.js', level: 'Intermediate' },
          ].map(skill => (
            <div key={skill.name} className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-500 mb-2">{skill.icon}</div>
              <span className="font-medium text-sm">{skill.name}</span>
              <span className="text-xs text-gray-500 mt-1">{skill.level}</span>
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
      <section className="py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{t('homepage.purpose.title')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                  <FaCode className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">Available for Full-time & Contract Work</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Open to both permanent positions and project-based collaborations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                  <FaReact className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">Specialized in Modern Web Technologies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Expert in React ecosystem with strong TypeScript foundation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                  <FaGithub className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">Remote-First Professional</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Experienced in remote collaboration with proven track record</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
