import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact, FaGithub, FaCode, FaDatabase, FaAws } from 'react-icons/fa';
import { SiTypescript, SiFirebase, SiRedux, SiMobx, SiGit, SiGraphql } from 'react-icons/si';

const TechStackSection = () => {
    const { t } = useTranslation();

    const techStack = {
        frontend: [
            { icon: <FaReact className="w-8 h-8" />, name: 'React Native' },
            { icon: <SiTypescript className="w-8 h-8" />, name: 'TypeScript' },
            { icon: <SiRedux className="w-8 h-8" />, name: 'Redux' },
            { icon: <SiMobx className="w-8 h-8" />, name: 'MobX' }
        ],
        backend: [
            { icon: <FaAws className="w-8 h-8" />, name: 'AWS' },
            { icon: <SiFirebase className="w-8 h-8" />, name: 'Firebase' },
            { icon: <SiGraphql className="w-8 h-8" />, name: 'GraphQL' },
            { icon: <FaDatabase className="w-8 h-8" />, name: 'Databases' }
        ],
        tools: [
            { icon: <SiGit className="w-8 h-8" />, name: 'Git' },
            { icon: <FaGithub className="w-8 h-8" />, name: 'CI/CD' },
            { icon: <FaCode className="w-8 h-8" />, name: 'Testing' }
        ]
    };

    return (
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">{t('homepage.techStack.title')}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{t('homepage.techStack.description')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400">{t('homepage.techStack.frontend')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {techStack.frontend.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                                <div className="text-blue-500 mb-3">{tech.icon}</div>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-purple-600 dark:text-purple-400">{t('homepage.techStack.backend')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {techStack.backend.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                                <div className="text-purple-500 mb-3">{tech.icon}</div>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-green-600 dark:text-green-400">{t('homepage.techStack.tools')}</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {techStack.tools.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                                <div className="text-green-500 mb-3">{tech.icon}</div>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;
