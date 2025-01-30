import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact, FaSwift, FaJava, FaPhp, FaAws } from 'react-icons/fa';
import { SiTypescript, SiFirebase, SiRedux, SiMobx, SiGit, SiAngular, SiVuedotjs, SiGraphql } from 'react-icons/si';

const SkillsSection = () => {
    const { t } = useTranslation();

    const primarySkills = [
        { icon: <FaReact className="w-6 h-6" />, name: 'React Native', level: 'Expert' },
        { icon: <SiTypescript className="w-6 h-6" />, name: 'TypeScript', level: 'Expert' },
        { icon: <SiRedux className="w-6 h-6" />, name: 'Redux', level: 'Advanced' },
        { icon: <SiMobx className="w-6 h-6" />, name: 'MobX', level: 'Advanced' },
        { icon: <SiFirebase className="w-6 h-6" />, name: 'Firebase', level: 'Advanced' },
        { icon: <FaAws className="w-6 h-6" />, name: 'AWS', level: 'Advanced' }
    ];

    const additionalSkills = [
        { icon: <FaReact className="w-5 h-5" />, name: 'React' },
        { icon: <SiAngular className="w-5 h-5" />, name: 'Angular' },
        { icon: <SiVuedotjs className="w-5 h-5" />, name: 'Vue.js' },
        { icon: <FaSwift className="w-5 h-5" />, name: 'Swift' },
        { icon: <FaJava className="w-5 h-5" />, name: 'Java' },
        { icon: <FaPhp className="w-5 h-5" />, name: 'PHP' },
        { icon: <SiGraphql className="w-5 h-5" />, name: 'GraphQL' },
        { icon: <SiGit className="w-5 h-5" />, name: 'Git' }
    ];

    return (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">{t('homepage.skills.title')}</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">{t('homepage.skills.description')}</p>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6 text-center">{t('homepage.skills.primary')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {primarySkills.map(skill => (
                        <div key={skill.name} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
                            <div className="text-blue-500 mb-3">{skill.icon}</div>
                            <span className="font-medium text-sm text-center">{skill.name}</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">{skill.level}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-6 text-center">{t('homepage.skills.secondary')}</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {additionalSkills.map(skill => (
                        <div key={skill.name} className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <div className="text-gray-600 dark:text-gray-300 mb-2">{skill.icon}</div>
                            <span className="text-xs font-medium text-center">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
