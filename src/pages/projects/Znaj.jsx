import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    FaReact,
    FaArrowLeft,
    FaExternalLinkAlt,
    FaApple,
    FaGooglePlay,
    FaUsers,
    FaChalkboardTeacher,
    FaUserGraduate,
    FaUserFriends,
    FaCode,
    FaRocket,
    FaMobile,
    FaDatabase,
    FaBrain,
    FaAward,
    FaHeart,
    FaQuoteLeft,
    FaChartLine,
    FaGlobe,
    FaBookOpen,
    FaCreditCard,
    FaBell,
    FaClipboardList,
    FaCalendarAlt,
    FaGraduationCap
} from 'react-icons/fa';
import {
    SiRedux,
    // SiAmazonaws,
    SiGoogleanalytics
} from 'react-icons/si';

const ZnajProject = () => {
    const { t, i18n } = useTranslation();

    const technologies = [
        { icon: <FaReact className="w-6 h-6" />, name: 'React Native', color: 'text-blue-400' },
        // { icon: <SiAmazonaws className="w-6 h-6" />, name: 'AWS', color: 'text-orange-600' },
        { icon: <SiRedux className="w-6 h-6" />, name: 'Redux', color: 'text-purple-500' },
        { icon: <FaDatabase className="w-6 h-6" />, name: 'Real-time Sync', color: 'text-green-600' },
        { icon: <FaGraduationCap className="w-6 h-6" />, name: 'Educational APIs', color: 'text-blue-600' },
        { icon: <FaCreditCard className="w-6 h-6" />, name: 'Payment Integration', color: 'text-red-500' }
    ];

    const metrics = [
        { value: 'Top 100', label: t('znaj.impact.metrics.0.label'), description: t('znaj.impact.metrics.0.description') },
        { value: 'Top 5', label: t('znaj.impact.metrics.1.label'), description: t('znaj.impact.metrics.1.description') },
        { value: '3', label: t('znaj.impact.metrics.2.label'), description: t('znaj.impact.metrics.2.description') },
        { value: '100%', label: t('znaj.impact.metrics.3.label'), description: t('znaj.impact.metrics.3.description') }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-900">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <Link to="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        {t('projects.backToProjects')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    {t('znaj.hero.subtitle')}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-6">
                                    {t('znaj.hero.title')}
                                </h1>
                                <h2 className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6">
                                    {t('znaj.hero.description')}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {t('znaj.hero.tagline')}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {technologies.map((tech, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-white dark:bg-gray-800 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                                        <span className={tech.color}>{tech.icon}</span>
                                        <span className="text-sm font-medium">{tech.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href="https://apps.apple.com/by/app/%D0%B7%D0%BD%D0%B0%D0%B9-%D0%B1%D0%B0%D0%B9/id1500741599"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    <FaApple className="w-5 h-5" />
                                    {t('znaj.hero.downloadIOS')}
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=by.znaj2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    <FaGooglePlay className="w-4 h-4" />
                                    {t('znaj.hero.downloadAndroid')}
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    {metrics.map((metric, index) => (
                                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                                {metric.value}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{metric.label}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
                                    <FaAward className="w-6 h-6 text-indigo-500" />
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                            {t('znaj.overview.recognition')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">{t('znaj.overview.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('znaj.overview.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaUsers className="w-5 h-5 text-indigo-500" />
                                    <span className="font-medium">{t('znaj.overview.role')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaRocket className="w-5 h-5 text-purple-500" />
                                    <span className="font-medium">{t('znaj.overview.duration')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaAward className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">{t('znaj.overview.company')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaGraduationCap className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">{t('znaj.overview.category')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-6">{t('znaj.challenge.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('znaj.challenge.description')}</p>
                            <div className="space-y-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-medium mb-1">{t(`znaj.challenge.problems.${index}.title`)}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{t(`znaj.challenge.problems.${index}.description`)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('znaj.solution.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('znaj.solution.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                                        {index === 0 && <FaBookOpen className="w-6 h-6 text-white" />}
                                        {index === 1 && <FaUserFriends className="w-6 h-6 text-white" />}
                                        {index === 2 && <FaChalkboardTeacher className="w-6 h-6 text-white" />}
                                        {index === 3 && <FaUserGraduate className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`znaj.solution.features.${index}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t(`znaj.solution.features.${index}.description`)}</p>
                                    <ul className="space-y-2">
                                        {[0, 1, 2, 3].map((detailIndex) => (
                                            <li key={detailIndex} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`znaj.solution.features.${index}.details.${detailIndex}`)}
                        </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('znaj.technical.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('znaj.technical.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                                <FaRocket className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('znaj.technical.architecture.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                        <span className="text-sm">{t(`znaj.technical.architecture.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                                <FaGraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('znaj.technical.features.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm">{t(`znaj.technical.features.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                <FaMobile className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('znaj.technical.platforms.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm">{t(`znaj.technical.platforms.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {[0, 1, 2, 3].map((categoryIndex) => (
                            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-4">{t(`znaj.technical.technologies.${categoryIndex}.category`)}</h4>
                                <div className="space-y-2">
                                    {[0, 1, 2, 3].map((itemIndex) => (
                                        <div key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                            {t(`znaj.technical.technologies.${categoryIndex}.items.${itemIndex}`)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('znaj.impact.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('znaj.impact.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-4 gap-8 mb-16">
                            {metrics.map((metric, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                        {metric.value}
                                    </div>
                                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">{metric.label}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{metric.description}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {[0, 1].map((recognitionIndex) => (
                                <div key={recognitionIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            <FaAward className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{t(`znaj.impact.recognition.items.${recognitionIndex}.award`)}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{t(`znaj.impact.recognition.items.${recognitionIndex}.year`) || t(`znaj.impact.recognition.items.${recognitionIndex}.organization`)}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">{t(`znaj.impact.recognition.items.${recognitionIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('znaj.userExperience.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('znaj.userExperience.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[0, 1, 2].map((stakeholderIndex) => (
                            <div key={stakeholderIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    {stakeholderIndex === 0 && <FaChalkboardTeacher className="w-8 h-8 text-white" />}
                                    {stakeholderIndex === 1 && <FaUserFriends className="w-8 h-8 text-white" />}
                                    {stakeholderIndex === 2 && <FaUserGraduate className="w-8 h-8 text-white" />}
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-center">{t(`znaj.userExperience.stakeholders.${stakeholderIndex}.title`)}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{t(`znaj.userExperience.stakeholders.${stakeholderIndex}.description`)}</p>
                                <ul className="space-y-3">
                                    {[0, 1, 2, 3].map((benefitIndex) => (
                                        <li key={benefitIndex} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t(`znaj.userExperience.stakeholders.${stakeholderIndex}.benefits.${benefitIndex}`)}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('znaj.methodology.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('znaj.methodology.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {[0, 1, 2, 3].map((criteriaIndex) => (
                                <div key={criteriaIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                                        {criteriaIndex === 0 && <FaChartLine className="w-6 h-6 text-white" />}
                                        {criteriaIndex === 1 && <FaBrain className="w-6 h-6 text-white" />}
                                        {criteriaIndex === 2 && <FaHeart className="w-6 h-6 text-white" />}
                                        {criteriaIndex === 3 && <FaRocket className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`znaj.methodology.criteria.${criteriaIndex}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{t(`znaj.methodology.criteria.${criteriaIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white my-20">
                    <div className="max-w-4xl mx-auto text-center px-8">
                        <h2 className="text-4xl font-bold mb-6">{t('znaj.cta.title')}</h2>
                        <p className="text-xl text-indigo-100 mb-8">{t('znaj.cta.description')}</p>

                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        {index === 0 && <FaUsers className="w-6 h-6" />}
                                        {index === 1 && <FaGraduationCap className="w-6 h-6" />}
                                        {index === 2 && <FaDatabase className="w-6 h-6" />}
                                        {index === 3 && <FaRocket className="w-6 h-6" />}
                                    </div>
                                    <div className="text-sm font-medium">{t(`znaj.cta.features.${index}`)}</div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            {t('znaj.cta.button')}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ZnajProject;
