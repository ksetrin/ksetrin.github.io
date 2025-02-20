import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact } from 'react-icons/fa';
import { SiRedux, SiMobx } from 'react-icons/si';

const ExperienceSection = () => {
    const { t } = useTranslation();

    const experience = [
        {
            role: 'React Native Developer',
            company: 'Mebix',
            years: '2021 - 2025',
            duration: '3+ ' + t('homepage.experience.years'),
            location: 'Germany',
            description: 'Digital therapy companion for diabetes and cardiovascular diseases',
            tech: 'React Native, TypeScript, Redux, Firebase',
            icon: <FaReact />
        },
        {
            role: 'Senior Software Engineer',
            company: 'Bamboo Agile',
            years: '2019 - 2021',
            duration: '2 ' + t('homepage.experience.years'),
            location: 'UAE/Remote',
            description: 'Emirates HR, TapCar, Zna.by education platform',
            tech: 'React Native, Angular, Redux, MobX, AWS, GraphQL',
            icon: <SiRedux />
        },
        {
            role: 'React Native Developer',
            company: 'The Red One',
            years: '2017 - 2019',
            duration: '2 ' + t('homepage.experience.years'),
            location: 'Russia',
            description: 'Started mobile development direction, various RN projects',
            tech: 'React Native, Redux, MobX, TypeScript, Swift, Java',
            icon: <SiMobx />
        }
    ];

    return (
        <section className="py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">{t('homepage.experience.title')}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{t('homepage.experience.description')}</p>
            </div>
            <div className="space-y-6">
                {experience.map(exp => (
                    <div key={exp.company} className="relative">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
                            <div className="text-blue-500 text-2xl">{exp.icon}</div>
                            <div className="flex-1">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-blue-600 dark:text-blue-400">{exp.duration}</span>
                                        <span>{exp.years}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-300 font-medium">{exp.company} • {exp.location}</p>
                                        <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {exp.tech.split(', ').map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
