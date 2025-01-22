import React from 'react';
import { useTranslation } from 'react-i18next';

const ProjectsPage = () => {
  const { t } = useTranslation();
  
  const projects = [
    {
      title: 'CarMix',
      description: 'Offline application works on sockets and allows to measure weight from mixing car on a way.',
      image: '/project1.jpg',
      technologies: ['React Native', 'MobX', 'TypeScript'],
      demoLink: '#',
      sourceLink: '#',
    },
    {
      title: 'TapCar',
      description: 'Mobile application for sharing cars by person to person.',
      image: '/project2.jpg',
      technologies: ['React Native', 'AWS'],
      demoLink: '#',
      sourceLink: '#',
    },
    {
      title: 'Znaj.by',
      description: 'Mobile application for school education platform Zna.by.',
      image: '/project3.jpg',
      technologies: ['React Native', 'AWS'],
      demoLink: '#',
      sourceLink: '#',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('projects.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t('projects.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={project.demoLink}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  {t('projects.liveDemo')}
                </a>
                <a
                  href={project.sourceLink}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {t('projects.sourceCode')}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
