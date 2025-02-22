import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    FaReact,
    FaArrowLeft,
    FaExternalLinkAlt,
    FaApple,
    FaCar,
    FaUsers,
    FaShieldAlt,
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
    FaTv,
    FaNewspaper
} from 'react-icons/fa';
import {
    SiNodedotjs,
    SiRedux,
    SiBluetooth,
    SiGoogleanalytics
} from 'react-icons/si';

const TapcarProject = () => {
    const { t, i18n } = useTranslation();

    const tTapcar = (key) => t(key, { ns: 'tapcar' });

    const technologies = [
        { icon: <FaReact className="w-6 h-6" />, name: 'React Native', color: 'text-blue-400' },
        { icon: <SiNodedotjs className="w-6 h-6" />, name: 'Node.js', color: 'text-green-600' },
        { icon: <FaCar className="w-6 h-6" />, name: 'OEM Integration', color: 'text-purple-500' },
        { icon: <SiBluetooth className="w-6 h-6" />, name: 'BLE', color: 'text-blue-600' },
        { icon: <FaChartLine className="w-6 h-6" />, name: 'AutoPASS', color: 'text-orange-500' },
        { icon: <SiGoogleanalytics className="w-6 h-6" />, name: 'Real-time Analytics', color: 'text-red-500' }
    ];

    const metrics = [
        { value: '10+', label: t('tapcar.impact.metrics.0.label'), description: t('tapcar.impact.metrics.0.description') },
        { value: '0', label: t('tapcar.impact.metrics.1.label'), description: t('tapcar.impact.metrics.1.description') },
        { value: '100%', label: t('tapcar.impact.metrics.2.label'), description: t('tapcar.impact.metrics.2.description') },
        { value: '20+', label: t('tapcar.impact.metrics.3.label'), description: t('tapcar.impact.metrics.3.description') }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-green-900">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200 dark:bg-green-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <Link to="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors mb-8">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        {t('projects.backToProjects')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-block bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    {t('tapcar.hero.subtitle')}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-800 bg-clip-text text-transparent mb-6">
                                    {t('tapcar.hero.title')}
                                </h1>
                                <h2 className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6">
                                    {t('tapcar.hero.description')}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {t('tapcar.hero.tagline')}
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
                                    href="https://apps.apple.com/no/app/tapcar-bildeling/id1567367431"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    <FaApple className="w-5 h-5" />
                                    {t('tapcar.hero.downloadApp')}
                                </a>
                                <a
                                    href="https://www.tapcar.no/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    {t('tapcar.hero.visitWebsite')}
                                    <FaExternalLinkAlt className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    {metrics.map((metric, index) => (
                                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                                {metric.value}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{metric.label}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
                                    <FaAward className="w-6 h-6 text-green-500" />
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                            {t('tapcar.overview.funding')}
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
                            <h2 className="text-4xl font-bold mb-6">{t('tapcar.overview.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('tapcar.overview.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaUsers className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">{t('tapcar.overview.role')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaRocket className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">{t('tapcar.overview.duration')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaAward className="w-5 h-5 text-purple-500" />
                                    <span className="font-medium">{t('tapcar.overview.company')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaBrain className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">{t('tapcar.overview.partnership')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-6">{t('tapcar.challenge.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('tapcar.challenge.description')}</p>
                            <div className="space-y-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-medium mb-1">{t(`tapcar.challenge.problems.${index}.title`)}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{t(`tapcar.challenge.problems.${index}.description`)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('tapcar.solution.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('tapcar.solution.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                                        {index === 0 && <FaCar className="w-6 h-6 text-white" />}
                                        {index === 1 && <FaUsers className="w-6 h-6 text-white" />}
                                        {index === 2 && <FaChartLine className="w-6 h-6 text-white" />}
                                        {index === 3 && <SiBluetooth className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`tapcar.solution.features.${index}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t(`tapcar.solution.features.${index}.description`)}</p>
                                    <ul className="space-y-2">
                                        {[0, 1, 2, 3].map((detailIndex) => (
                                            <li key={detailIndex} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`tapcar.solution.features.${index}.details.${detailIndex}`)}
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
                        <h2 className="text-4xl font-bold mb-6">{t('tapcar.technical.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('tapcar.technical.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                                <FaRocket className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('tapcar.technical.architecture.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">{t(`tapcar.technical.architecture.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                <FaDatabase className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('tapcar.technical.integrations.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm">{t(`tapcar.technical.integrations.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                                <FaBrain className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('tapcar.technical.algorithms.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm">{t(`tapcar.technical.algorithms.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {[0, 1, 2, 3].map((categoryIndex) => (
                            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-4">{t(`tapcar.technical.technologies.${categoryIndex}.category`)}</h4>
                                <div className="space-y-2">
                                    {[0, 1, 2, 3].map((itemIndex) => (
                                        <div key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                            {t(`tapcar.technical.technologies.${categoryIndex}.items.${itemIndex}`)}
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
                            <h2 className="text-4xl font-bold mb-6">{t('tapcar.innovation.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('tapcar.innovation.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 mb-16">
                            {[0, 1].map((partnerIndex) => (
                                <div key={partnerIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                                            <FaAward className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold">{t(`tapcar.innovation.partnerships.${partnerIndex}.organization`)}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{t(`tapcar.innovation.partnerships.${partnerIndex}.description`)}</p>
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">{t(`tapcar.innovation.partnerships.${partnerIndex}.contribution`)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {[0, 1, 2, 3].map((innovationIndex) => (
                                <div key={innovationIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                                    <h4 className="text-lg font-semibold mb-3">{t(`tapcar.innovation.innovations.${innovationIndex}.title`)}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t(`tapcar.innovation.innovations.${innovationIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('tapcar.impact.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('tapcar.impact.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8 mb-16">
                        {metrics.map((metric, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                    {metric.value}
                                </div>
                                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">{metric.label}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{metric.description}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[0, 1, 2].map((recognitionIndex) => (
                            <div key={recognitionIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    {recognitionIndex === 0 && <FaNewspaper className="w-8 h-8 text-white" />}
                                    {recognitionIndex === 1 && <FaTv className="w-8 h-8 text-white" />}
                                    {recognitionIndex === 2 && <FaGlobe className="w-8 h-8 text-white" />}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{t(`tapcar.impact.recognition.${recognitionIndex}.outlet`)}</h3>
                                <h4 className="text-lg text-green-600 dark:text-green-400 font-medium mb-3">{t(`tapcar.impact.recognition.${recognitionIndex}.title`)}</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{t(`tapcar.impact.recognition.${recognitionIndex}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('tapcar.userExperience.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('tapcar.userExperience.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {[0, 1, 2, 3].map((principleIndex) => (
                                <div key={principleIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                                        {principleIndex === 0 && <FaHeart className="w-6 h-6 text-white" />}
                                        {principleIndex === 1 && <FaCar className="w-6 h-6 text-white" />}
                                        {principleIndex === 2 && <FaChartLine className="w-6 h-6 text-white" />}
                                        {principleIndex === 3 && <FaUsers className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`tapcar.userExperience.principles.${principleIndex}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{t(`tapcar.userExperience.principles.${principleIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl text-white my-20">
                    <div className="max-w-4xl mx-auto text-center px-8">
                        <h2 className="text-4xl font-bold mb-6">{t('tapcar.cta.title')}</h2>
                        <p className="text-xl text-green-100 mb-8">{t('tapcar.cta.description')}</p>

                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        {index === 0 && <FaCar className="w-6 h-6" />}
                                        {index === 1 && <FaChartLine className="w-6 h-6" />}
                                        {index === 2 && <FaBrain className="w-6 h-6" />}
                                        {index === 3 && <FaAward className="w-6 h-6" />}
                                    </div>
                                    <div className="text-sm font-medium">{t(`tapcar.cta.features.${index}`)}</div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            {t('tapcar.cta.button')}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TapcarProject;
