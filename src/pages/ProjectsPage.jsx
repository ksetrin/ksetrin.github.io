import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaArrowRight, FaApple, FaGooglePlay } from 'react-icons/fa';

const ProjectsPage = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'Mebix',
      description: 'Digital therapy companion for diabetes type 2. AI-powered nutrition tracking with medical-grade accuracy.',
      image: '/projects/mebix.jpg',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'AI/ML'],
      detailLink: '/projects/mebix',
      externalLink: 'https://www.mebix.de/',
      featured: true,
      status: 'Live in Production'
    },
    {
      title: 'TapCar',
      description: 'Peer-to-peer car sharing application with zero third-party telematics. Direct OEM integration with trust-based sharing groups.',
      image: '/projects/tapcar.jpg',
      technologies: ['React Native', 'Node.js', 'OEM Integration', 'BLE', 'AutoPASS'],
      detailLink: '/projects/tapcar',
      externalLink: 'https://www.tapcar.no/',
      appStoreLink: 'https://apps.apple.com/no/app/tapcar-bildeling/id1567367431',
      featured: true,
      status: 'Research-Backed Innovation'
    },
    {
      title: 'Znaj.by',
      description: 'Unified educational platform connecting teachers, parents, and students. Top 100 EdTech companies in CIS region.',
      image: '/projects/znaj.jpg',
      technologies: ['React Native', 'AWS', 'Redux', 'Educational APIs', 'Real-time Sync'],
      detailLink: '/projects/znaj',
      appStoreLink: 'https://apps.apple.com/by/app/%D0%B7%D0%BD%D0%B0%D0%B9-%D0%B1%D0%B0%D0%B9/id1500741599',
      googlePlayLink: 'https://play.google.com/store/apps/details?id=by.znaj2',
      featured: true,
      status: 'Top 100 EdTech CIS'
    },
    {
      title: 'Apollo CarMix',
      description: 'Smart mobile concrete plant management with AR technology and IoT integration. Revolutionary construction industry solution.',
      image: '/projects/carmix.jpg',
      technologies: ['React Native', 'Redux', 'Augmented Reality', 'IoT', 'SQL Server'],
      detailLink: '/projects/carmix',
      appStoreLink: 'https://apps.apple.com/ar/app/apollo-carmix/id6476922567?l=en-GB',
      googlePlayLink: 'https://play.google.com/store/apps/details?id=com.torai.tor_equip.apollo&hl=en_GB&pli=1',
      featured: true,
      status: 'Industrial IoT Innovation'
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
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] ${
                      project.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                  }`}
              >
                {project.featured && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                      Featured Project
                    </div>
                )}

                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative">
                  {project.image && (
                      <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                      />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{project.title}</div>
                      <div className="text-sm">{project.status || 'Project Image'}</div>
                    </div>
                  </div>
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
                            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                    {tech}
                  </span>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-3">
                    {project.detailLink && project.detailLink !== '#' && (
                        <Link
                            to={project.detailLink}
                            className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
                        >
                          {t('projects.viewProject')}
                          <FaArrowRight className="w-4 h-4" />
                        </Link>
                    )}

                    <div className="flex space-x-3">
                      {project.externalLink && (
                          <a
                              href={project.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            {t('projects.liveDemo')}
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </a>
                      )}

                      {project.sourceLink && (
                          <a
                              href={project.sourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            {t('projects.sourceCode')}
                          </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ProjectsPage;
