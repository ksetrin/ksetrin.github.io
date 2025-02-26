import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaMobile,
    FaCode,
    FaCogs,
    FaUsers,
    FaLayerGroup,
    FaDatabase,
    FaCube,
    FaGlobe,
    FaServer,
    FaAudible
} from 'react-icons/fa';

const SkillsSection = () => {
    const { t } = useTranslation();
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const coreSkills = [
        {
            icon: <FaMobile className="w-8 h-8" />,
            title: t('homepage.skills.coreRNSkills.mobileArchitecture.title'),
            description: t('homepage.skills.coreRNSkills.mobileArchitecture.description'),
            details: t('homepage.skills.coreRNSkills.mobileArchitecture.details')
        },
        {
            icon: <FaCode className="w-8 h-8" />,
            title: t('homepage.skills.coreRNSkills.codeRefactoring.title'),
            description: t('homepage.skills.coreRNSkills.codeRefactoring.description'),
            details: t('homepage.skills.coreRNSkills.codeRefactoring.details')
        },
        {
            icon: <FaCogs className="w-8 h-8" />,
            title: t('homepage.skills.coreRNSkills.dependencyManagement.title'),
            description: t('homepage.skills.coreRNSkills.dependencyManagement.description'),
            details: t('homepage.skills.coreRNSkills.dependencyManagement.details')
        },
        {
            icon: <FaLayerGroup className="w-8 h-8" />,
            title: t('homepage.skills.coreRNSkills.productionDevelopment.title'),
            description: t('homepage.skills.coreRNSkills.productionDevelopment.description'),
            details: t('homepage.skills.coreRNSkills.productionDevelopment.details')
        },
        {
            icon: <FaCube className="w-8 h-8" />,
            title: t('homepage.skills.coreRNSkills.nativeModuleDevelopment.title'),
            description: t('homepage.skills.coreRNSkills.nativeModuleDevelopment.description'),
            details: t('homepage.skills.coreRNSkills.nativeModuleDevelopment.details')
        },
        {
            icon: <FaAudible className="w-8 h-8" />,
            title: t('homepage.skills.coreRNSkills.crossPlatformWebIntegration.title'),
            description: t('homepage.skills.coreRNSkills.crossPlatformWebIntegration.description'),
            details: t('homepage.skills.coreRNSkills.crossPlatformWebIntegration.details')
        }
    ];

    const architecturalSkills = [
        {
            icon: <FaLayerGroup className="w-7 h-7" />,
            title: t('homepage.skills.architecturalSkills.stateManagement.title'),
            description: t('homepage.skills.architecturalSkills.stateManagement.description')
        },
        {
            icon: <FaUsers className="w-7 h-7" />,
            title: t('homepage.skills.architecturalSkills.codeReview.title'),
            description: t('homepage.skills.architecturalSkills.codeReview.description')
        },
        {
            icon: <FaDatabase className="w-7 h-7" />,
            title: t('homepage.skills.architecturalSkills.fullStack.title'),
            description: t('homepage.skills.architecturalSkills.fullStack.description')
        }
    ];

    const additionalSkills = [
        {
            icon: <FaGlobe className="w-6 h-6" />,
            title: t('homepage.skills.additionalSkills.webDevelopment.title'),
            description: t('homepage.skills.additionalSkills.webDevelopment.description')
        },
        {
            icon: <FaServer className="w-6 h-6" />,
            title: t('homepage.skills.additionalSkills.backendDatabases.title'),
            description: t('homepage.skills.additionalSkills.backendDatabases.description')
        }
    ];

    return (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">{t('homepage.skills.title')}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{t('homepage.skills.description')}</p>
            </div>

            <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600 dark:text-blue-400">
                    {t('homepage.skills.coreReactNativeSkills')}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreSkills.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="group relative bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                            onMouseEnter={() => setHoveredSkill(index)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="text-blue-500 group-hover:scale-110 transition-transform duration-300">
                                    {skill.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {skill.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
                                        {skill.description}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                        {skill.details}
                                    </p>
                                </div>
                            </div>
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl transition-opacity duration-300 ${hoveredSkill === index ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6 text-center text-purple-600 dark:text-purple-400">
                    {t('homepage.skills.architecturalTeamSkills')}
                </h3>
                <div className="grid md:grid-cols-3 gap-5">
                    {architecturalSkills.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="bg-white dark:bg-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            style={{
                                animationDelay: `${(index + 5) * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="text-purple-500">{skill.icon}</div>
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2">{skill.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-6 text-center text-green-600 dark:text-green-400">
                    {t('homepage.skills.additionalAppliedSkills')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {additionalSkills.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
                            style={{
                                animationDelay: `${(index + 8) * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="text-green-500">{skill.icon}</div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                                        {skill.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default SkillsSection;
