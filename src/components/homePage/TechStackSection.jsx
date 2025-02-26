import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact, FaGithub, FaCode, FaDatabase, FaAws, FaBrain, FaSwift, FaJava, FaPhp } from 'react-icons/fa';
import { SiTypescript, SiFirebase, SiRedux, SiMobx, SiGit, SiGraphql, SiAngular, SiVuedotjs, SiMysql, SiPostgresql, SiRedis } from 'react-icons/si';

const TechStackSection = () => {
    const { t } = useTranslation();

    const techStack = {
        mobile: [
            { icon: <FaReact className="w-8 h-8" />, name: 'React Native' },
            { icon: <SiTypescript className="w-8 h-8" />, name: 'TypeScript' },
            { icon: <FaSwift className="w-8 h-8" />, name: 'Swift' },
            { icon: <FaJava className="w-8 h-8" />, name: 'Java' }
        ],
        frontend: [
            { icon: <FaReact className="w-8 h-8" />, name: 'React' },
            { icon: <SiAngular className="w-8 h-8" />, name: 'Angular' },
            { icon: <SiVuedotjs className="w-8 h-8" />, name: 'Vue.js' },
            { icon: <SiTypescript className="w-8 h-8" />, name: 'TypeScript' }
        ],
        stateManagement: [
            { icon: <SiRedux className="w-8 h-8" />, name: 'Redux' },
            { icon: <SiMobx className="w-8 h-8" />, name: 'MobX' },
            { icon: <FaCode className="w-8 h-8" />, name: 'Context API' },
            { icon: <FaCode className="w-8 h-8" />, name: 'Zustand' }
        ],
        backend: [
            { icon: <FaAws className="w-8 h-8" />, name: 'AWS' },
            { icon: <SiFirebase className="w-8 h-8" />, name: 'Firebase' },
            { icon: <SiGraphql className="w-8 h-8" />, name: 'GraphQL' },
            { icon: <FaPhp className="w-8 h-8" />, name: 'PHP' }
        ],
        databases: [
            { icon: <SiMysql className="w-8 h-8" />, name: 'MySQL' },
            { icon: <SiPostgresql className="w-8 h-8" />, name: 'PostgreSQL' },
            { icon: <SiRedis className="w-8 h-8" />, name: 'Redis' },
            { icon: <FaDatabase className="w-8 h-8" />, name: 'NoSQL' }
        ],
        tools: [
            { icon: <SiGit className="w-8 h-8" />, name: 'Git' },
            { icon: <FaGithub className="w-8 h-8" />, name: 'CI/CD' },
            { icon: <FaCode className="w-8 h-8" />, name: 'Testing' },
            { icon: <FaBrain className="w-8 h-8" />, name: 'AI Tools' }
        ]
    };

    return (
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">{t('homepage.techStack.title')}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{t('homepage.techStack.description')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-orange-600 dark:text-orange-400">{t('homepage.techStack.mobileDevelopment')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {techStack.mobile.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                                <div className="text-orange-500 mb-3">{tech.icon}</div>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400">{t('homepage.techStack.frontendDevelopment')}</h3>
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
                    <h3 className="text-xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">{t('homepage.techStack.stateManagement')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {techStack.stateManagement.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                                <div className="text-indigo-500 mb-3">{tech.icon}</div>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-purple-600 dark:text-purple-400">{t('homepage.techStack.backendCloud')}</h3>
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
                    <h3 className="text-xl font-semibold mb-6 text-red-600 dark:text-red-400">{t('homepage.techStack.databases')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {techStack.databases.map(tech => (
                            <div key={tech.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                                <div className="text-red-500 mb-3">{tech.icon}</div>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-6 text-green-600 dark:text-green-400">{t('homepage.techStack.developmentTools')}</h3>
                    <div className="grid grid-cols-2 gap-4">
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
