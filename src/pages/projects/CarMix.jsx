import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    FaReact,
    FaArrowLeft,
    FaExternalLinkAlt,
    FaApple,
    FaGooglePlay,
    FaIndustry,
    FaCogs,
    FaWeightHanging,
    FaMapMarkerAlt,
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
    FaCube,
    FaCertificate,
    FaWrench,
    FaEye,
    FaShieldAlt,
    FaPlay,
    FaClipboard,
    FaWifi,
    FaTabletAlt
} from 'react-icons/fa';
import {
    SiRedux,
    SiMysql,
    SiGoogleanalytics
} from 'react-icons/si';

const CarMixProject = () => {
    const { t, i18n } = useTranslation();

    const technologies = [
        { icon: <FaReact className="w-6 h-6" />, name: 'React Native', color: 'text-blue-400' },
        { icon: <SiRedux className="w-6 h-6" />, name: 'Redux', color: 'text-purple-600' },
        { icon: <FaEye className="w-6 h-6" />, name: 'Augmented Reality', color: 'text-green-500' },
        { icon: <FaWifi className="w-6 h-6" />, name: 'IoT Integration', color: 'text-orange-500' },
        { icon: <SiMysql className="w-6 h-6" />, name: 'SQL Server', color: 'text-blue-600' },
        { icon: <FaChartLine className="w-6 h-6" />, name: 'Real-time Control', color: 'text-red-500' }
    ];

    const metrics = [
        { value: '15', label: t('carmix.impact.metrics.0.label'), description: t('carmix.impact.metrics.0.description') },
        { value: '99', label: t('carmix.impact.metrics.1.label'), description: t('carmix.impact.metrics.1.description') },
        { value: '4', label: t('carmix.impact.metrics.2.label'), description: t('carmix.impact.metrics.2.description') },
        { value: '100%', label: t('carmix.impact.metrics.3.label'), description: t('carmix.impact.metrics.3.description') }
    ];

    const getFeatureIcon = (iconType) => {
        switch(iconType) {
            case 'formula': return <FaCube className="w-8 h-8" />;
            case 'monitor': return <FaChartLine className="w-8 h-8" />;
            case 'document': return <FaCertificate className="w-8 h-8" />;
            case 'remote': return <FaWifi className="w-8 h-8" />;
            case 'ar': return <FaEye className="w-8 h-8" />;
            case 'location': return <FaMapMarkerAlt className="w-8 h-8" />;
            default: return <FaCogs className="w-8 h-8" />;
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-200 dark:bg-red-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <Link to="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-8">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        {t('projects.backToProjects')}
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-block bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    {t('carmix.hero.subtitle')}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent mb-6">
                                    {t('carmix.hero.title')}
                                </h1>
                                <h2 className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6">
                                    {t('carmix.hero.description')}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {t('carmix.hero.tagline')}
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
                                    href="https://apps.apple.com/ar/app/apollo-carmix/id6476922567?l=en-GB"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    <FaApple className="w-5 h-5" />
                                    {t('carmix.hero.downloadIOS')}
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.torai.tor_equip.apollo&hl=en_GB&pli=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    <FaGooglePlay className="w-4 h-4" />
                                    {t('carmix.hero.downloadAndroid')}
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    {metrics.map((metric, index) => (
                                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                                                {metric.value}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{metric.label}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl">
                                    <FaIndustry className="w-6 h-6 text-orange-500" />
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                            {t('carmix.overview.scope')}
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
                            <h2 className="text-4xl font-bold mb-6">{t('carmix.overview.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('carmix.overview.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaCogs className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">{t('carmix.overview.role')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaRocket className="w-5 h-5 text-red-500" />
                                    <span className="font-medium">{t('carmix.overview.duration')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaAward className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">{t('carmix.overview.company')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaIndustry className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">{t('carmix.overview.industry')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-6">{t('carmix.challenge.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('carmix.challenge.description')}</p>
                            <div className="space-y-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-medium mb-1">{t(`carmix.challenge.problems.${index}.title`)}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{t(`carmix.challenge.problems.${index}.description`)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('carmix.solution.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('carmix.solution.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                                        {index === 0 && <FaEye className="w-6 h-6 text-white" />}
                                        {index === 1 && <FaCube className="w-6 h-6 text-white" />}
                                        {index === 2 && <FaWeightHanging className="w-6 h-6 text-white" />}
                                        {index === 3 && <FaMapMarkerAlt className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`carmix.solution.features.${index}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t(`carmix.solution.features.${index}.description`)}</p>
                                    <ul className="space-y-2">
                                        {[0, 1, 2, 3].map((detailIndex) => (
                                            <li key={detailIndex} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`carmix.solution.features.${index}.details.${detailIndex}`)}
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
                        <h2 className="text-4xl font-bold mb-6">{t('carmix.technical.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('carmix.technical.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                                <FaRocket className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('carmix.technical.architecture.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                        <span className="text-sm">{t(`carmix.technical.architecture.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-6">
                                <FaWrench className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('carmix.technical.hardware.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        <span className="text-sm">{t(`carmix.technical.hardware.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                <FaDatabase className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('carmix.technical.software.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm">{t(`carmix.technical.software.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {[0, 1, 2, 3].map((categoryIndex) => (
                            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-4">{t(`carmix.technical.technologies.${categoryIndex}.category`)}</h4>
                                <div className="space-y-2">
                                    {[0, 1, 2, 3].map((itemIndex) => (
                                        <div key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                            {t(`carmix.technical.technologies.${categoryIndex}.items.${itemIndex}`)}
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
                            <h2 className="text-4xl font-bold mb-6">{t('carmix.features.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('carmix.features.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {[0, 1, 2, 3, 4, 5].map((featureIndex) => (
                                <div key={featureIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                                        {getFeatureIcon(t(`carmix.features.capabilities.${featureIndex}.icon`))}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`carmix.features.capabilities.${featureIndex}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{t(`carmix.features.capabilities.${featureIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('carmix.impact.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('carmix.impact.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8 mb-16">
                        {metrics.map((metric, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                                    {metric.value}
                                </div>
                                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">{metric.label}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{metric.description}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {[0, 1, 2, 3].map((benefitIndex) => (
                            <div key={benefitIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                        {benefitIndex === 0 && <FaShieldAlt className="w-6 h-6 text-white" />}
                                        {benefitIndex === 1 && <FaChartLine className="w-6 h-6 text-white" />}
                                        {benefitIndex === 2 && <FaClipboard className="w-6 h-6 text-white" />}
                                        {benefitIndex === 3 && <FaWifi className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold">{t(`carmix.impact.benefits.${benefitIndex}.title`)}</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{t(`carmix.impact.benefits.${benefitIndex}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('carmix.userExperience.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('carmix.userExperience.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {[0, 1, 2, 3].map((principleIndex) => (
                                <div key={principleIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                                        {principleIndex === 0 && <FaTabletAlt className="w-6 h-6 text-white" />}
                                        {principleIndex === 1 && <FaShieldAlt className="w-6 h-6 text-white" />}
                                        {principleIndex === 2 && <FaPlay className="w-6 h-6 text-white" />}
                                        {principleIndex === 3 && <FaChartLine className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`carmix.userExperience.principles.${principleIndex}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{t(`carmix.userExperience.principles.${principleIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('carmix.innovation.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('carmix.innovation.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {[0, 1, 2, 3].map((innovationIndex) => (
                            <div key={innovationIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    {innovationIndex === 0 && <FaEye className="w-8 h-8 text-white" />}
                                    {innovationIndex === 1 && <FaWifi className="w-8 h-8 text-white" />}
                                    {innovationIndex === 2 && <FaBrain className="w-8 h-8 text-white" />}
                                    {innovationIndex === 3 && <FaRocket className="w-8 h-8 text-white" />}
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-center">{t(`carmix.innovation.innovations.${innovationIndex}.title`)}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-center">{t(`carmix.innovation.innovations.${innovationIndex}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl text-white my-20">
                    <div className="max-w-4xl mx-auto text-center px-8">
                        <h2 className="text-4xl font-bold mb-6">{t('carmix.cta.title')}</h2>
                        <p className="text-xl text-orange-100 mb-8">{t('carmix.cta.description')}</p>

                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        {index === 0 && <FaWifi className="w-6 h-6" />}
                                        {index === 1 && <FaEye className="w-6 h-6" />}
                                        {index === 2 && <FaChartLine className="w-6 h-6" />}
                                        {index === 3 && <FaIndustry className="w-6 h-6" />}
                                    </div>
                                    <div className="text-sm font-medium">{t(`carmix.cta.features.${index}`)}</div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            {t('carmix.cta.button')}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CarMixProject;
