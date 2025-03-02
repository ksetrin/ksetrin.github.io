import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    FaReact,
    FaArrowLeft,
    FaExternalLinkAlt,
    FaApple,
    FaGooglePlay,
    FaGraduationCap,
    FaUsers,
    FaShieldAlt,
    FaUserGraduate,
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
    FaFileContract,
    FaCreditCard,
    FaWrench,
    FaEye,
    FaPlay,
    FaClipboard,
    FaWifi,
    FaTabletAlt,
    FaIndustry,
    FaPhoneAlt,
    FaCalendarAlt,
    FaTachometerAlt,
    FaHandshake,
    FaQuestionCircle,
    FaLock,
    FaUserCheck,
    FaCloudUploadAlt,
    FaBookOpen,
    FaChalkboardTeacher,
    FaFileAlt,
    FaSync,
    FaCogs,
    FaLayerGroup,
    FaSearch,
    FaDesktop,
    FaExpand,
    FaTimes
} from 'react-icons/fa';
import {
    SiRedux,
    SiTypescript,
    SiSqlite
} from 'react-icons/si';
import screen1 from '@/assets/images/screenshots/preco/screen-1.png';
import screen2 from '@/assets/images/screenshots/preco/screen-2.png';
import screen3 from '@/assets/images/screenshots/preco/screen-3.png';
import screen4 from '@/assets/images/screenshots/preco/screen-4.png';
import screen5 from '@/assets/images/screenshots/preco/screen-5.png';
import screen6 from '@/assets/images/screenshots/preco/screen-6.png';
import screen7 from '@/assets/images/screenshots/preco/screen-7.png';
import screen8 from '@/assets/images/screenshots/preco/screen-8.png';
import screen9 from '@/assets/images/screenshots/preco/screen-9.png';
import screen10 from '@/assets/images/screenshots/preco/screen-10.png';
import screen11 from '@/assets/images/screenshots/preco/screen-11.png';
import screen12 from '@/assets/images/screenshots/preco/screen-12.png';

const PrecoProject = () => {
    const { t, i18n } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);

    const technologies = [
        { icon: <FaReact className="w-6 h-6" />, name: 'React Native', color: 'text-blue-400' },
        { icon: <SiRedux className="w-6 h-6" />, name: 'Redux', color: 'text-purple-600' },
        { icon: <FaSync className="w-6 h-6" />, name: 'Offline Sync', color: 'text-green-500' },
        { icon: <FaFileAlt className="w-6 h-6" />, name: 'Document Management', color: 'text-orange-500' },
        { icon: <FaUserCheck className="w-6 h-6" />, name: 'Role-Based Access', color: 'text-blue-600' },
        { icon: <FaGraduationCap className="w-6 h-6" />, name: 'Educational APIs', color: 'text-red-500' }
    ];

    const metrics = [
        { value: '2', label: t('preco.impact.metrics.0.label'), description: t('preco.impact.metrics.0.description') },
        { value: '15+', label: t('preco.impact.metrics.1.label'), description: t('preco.impact.metrics.1.description') },
        { value: '100%', label: t('preco.impact.metrics.2.label'), description: t('preco.impact.metrics.2.description') },
        { value: 'Multi-Role', label: t('preco.impact.metrics.3.label'), description: t('preco.impact.metrics.3.description') }
    ];

    const screenshots = [screen1, screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10, screen11, screen12];

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

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
                                    {t('preco.hero.subtitle')}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-6">
                                    {t('preco.hero.title')}
                                </h1>
                                <h2 className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6">
                                    {t('preco.hero.description')}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {t('preco.hero.tagline')}
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

                            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <FaGraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                    <div>
                                        <div className="font-semibold text-lg">{t('preco.overview.complexity')}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Multi-Institution Educational Platform</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaSync className="w-4 h-4 text-green-600" />
                                        <span>Offline-First Architecture</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaUsers className="w-4 h-4 text-blue-600" />
                                        <span>Dual-Role System</span>
                                    </div>
                                </div>
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
                                    <FaCode className="w-6 h-6 text-indigo-500" />
                                    <div className="text-center">
                                        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                            {t('preco.overview.scope')}
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
                            <h2 className="text-4xl font-bold mb-6">{t('preco.overview.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('preco.overview.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaCode className="w-5 h-5 text-indigo-500" />
                                    <span className="font-medium">{t('preco.overview.role')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaRocket className="w-5 h-5 text-purple-500" />
                                    <span className="font-medium">{t('preco.overview.duration')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaGraduationCap className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">{t('preco.overview.institutions')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaLayerGroup className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">{t('preco.overview.complexity')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-6">{t('preco.challenge.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('preco.challenge.description')}</p>
                            <div className="space-y-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-medium mb-1">{t(`preco.challenge.problems.${index}.title`)}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{t(`preco.challenge.problems.${index}.description`)}</div>
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
                            <h2 className="text-4xl font-bold mb-6">{t('preco.solution.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('preco.solution.description')}
                            </p>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-center mb-8">Скриншоты приложения</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {screenshots.map((screenshot, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer group"
                                        onClick={() => openImageModal(screenshot)}
                                    >
                                        <div className="relative w-56 h-[30rem] bg-white dark:bg-gray-800 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                                            <img
                                                src={screenshot}
                                                alt={`Preco App Screenshot ${index + 1}`}
                                                className="w-full h-full object-cover rounded-2xl"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc1IiBoZWlnaHQ9Ijc5OCIgdmlld0JveD0iMCAwIDM3NSA3OTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNzUiIGhlaWdodD0iNzk4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPlByZWNvIFNjcmVlbnNob3Q8L3RleHQ+Cjwvc3ZnPg==';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-2xl">
                                                <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                                        {index === 0 && <FaUsers className="w-6 h-6 text-white" />}
                                        {index === 1 && <FaDatabase className="w-6 h-6 text-white" />}
                                        {index === 2 && <FaFileAlt className="w-6 h-6 text-white" />}
                                        {index === 3 && <FaSync className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`preco.solution.features.${index}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t(`preco.solution.features.${index}.description`)}</p>
                                    <ul className="space-y-2">
                                        {[0, 1, 2, 3].map((detailIndex) => (
                                            <li key={detailIndex} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`preco.solution.features.${index}.details.${detailIndex}`)}
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
                        <h2 className="text-4xl font-bold mb-6">{t('preco.technical.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('preco.technical.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                                <FaLayerGroup className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('preco.technical.architecture.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                        <span className="text-sm">{t(`preco.technical.architecture.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                                <FaDatabase className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('preco.technical.dataManagement.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm">{t(`preco.technical.dataManagement.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                <FaDesktop className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('preco.technical.userExperience.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm">{t(`preco.technical.userExperience.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {[0, 1, 2, 3].map((categoryIndex) => (
                            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-4">{t(`preco.technical.technologies.${categoryIndex}.category`)}</h4>
                                <div className="space-y-2">
                                    {[0, 1, 2, 3].map((itemIndex) => (
                                        <div key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                            {t(`preco.technical.technologies.${categoryIndex}.items.${itemIndex}`)}
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
                            <h2 className="text-4xl font-bold mb-6">{t('preco.features.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('preco.features.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <FaUserGraduate className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold">{t('preco.features.studentFeatures.title')}</h3>
                                </div>
                                <div className="space-y-6">
                                    {[0, 1, 2, 3, 4, 5].map((featureIndex) => (
                                        <div key={featureIndex} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                                {featureIndex === 0 && <FaBookOpen className="w-5 h-5 text-indigo-600" />}
                                                {featureIndex === 1 && <FaCalendarAlt className="w-5 h-5 text-indigo-600" />}
                                                {featureIndex === 2 && <FaAward className="w-5 h-5 text-indigo-600" />}
                                                {featureIndex === 3 && <FaFileAlt className="w-5 h-5 text-indigo-600" />}
                                                {featureIndex === 4 && <FaCreditCard className="w-5 h-5 text-indigo-600" />}
                                                {featureIndex === 5 && <FaUsers className="w-5 h-5 text-indigo-600" />}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">{t(`preco.features.studentFeatures.items.${featureIndex}.title`)}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{t(`preco.features.studentFeatures.items.${featureIndex}.description`)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <FaChalkboardTeacher className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold">{t('preco.features.facultyFeatures.title')}</h3>
                                </div>
                                <div className="space-y-6">
                                    {[0, 1, 2, 3].map((featureIndex) => (
                                        <div key={featureIndex} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                                {featureIndex === 0 && <FaTachometerAlt className="w-5 h-5 text-purple-600" />}
                                                {featureIndex === 1 && <FaCloudUploadAlt className="w-5 h-5 text-purple-600" />}
                                                {featureIndex === 2 && <FaChartLine className="w-5 h-5 text-purple-600" />}
                                                {featureIndex === 3 && <FaCogs className="w-5 h-5 text-purple-600" />}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">{t(`preco.features.facultyFeatures.items.${featureIndex}.title`)}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{t(`preco.features.facultyFeatures.items.${featureIndex}.description`)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('preco.technicalHighlights.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('preco.technicalHighlights.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {[0, 1, 2, 3].map((highlightIndex) => (
                            <div key={highlightIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    {highlightIndex === 0 && <FaSync className="w-8 h-8 text-white" />}
                                    {highlightIndex === 1 && <FaDesktop className="w-8 h-8 text-white" />}
                                    {highlightIndex === 2 && <FaFileAlt className="w-8 h-8 text-white" />}
                                    {highlightIndex === 3 && <FaChartLine className="w-8 h-8 text-white" />}
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-center">{t(`preco.technicalHighlights.highlights.${highlightIndex}.title`)}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-center">{t(`preco.technicalHighlights.highlights.${highlightIndex}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('preco.impact.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('preco.impact.description')}
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
                            {[0, 1, 2, 3].map((achievementIndex) => (
                                <div key={achievementIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            {achievementIndex === 0 && <FaSync className="w-6 h-6 text-white" />}
                                            {achievementIndex === 1 && <FaShieldAlt className="w-6 h-6 text-white" />}
                                            {achievementIndex === 2 && <FaRocket className="w-6 h-6 text-white" />}
                                            {achievementIndex === 3 && <FaLayerGroup className="w-6 h-6 text-white" />}
                                        </div>
                                        <h3 className="text-xl font-semibold">{t(`preco.impact.achievements.${achievementIndex}.title`)}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">{t(`preco.impact.achievements.${achievementIndex}.description`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white my-20">
                    <div className="max-w-4xl mx-auto text-center px-8">
                        <h2 className="text-4xl font-bold mb-6">{t('preco.cta.title')}</h2>
                        <p className="text-xl text-indigo-100 mb-8">{t('preco.cta.description')}</p>

                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        {index === 0 && <FaUsers className="w-6 h-6" />}
                                        {index === 1 && <FaSync className="w-6 h-6" />}
                                        {index === 2 && <FaDatabase className="w-6 h-6" />}
                                        {index === 3 && <FaShieldAlt className="w-6 h-6" />}
                                    </div>
                                    <div className="text-sm font-medium">{t(`preco.cta.features.${index}`)}</div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            {t('preco.cta.button')}
                        </Link>
                    </div>
                </section>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
                    <div className="relative max-w-sm mx-auto">
                        <button
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Preco App Screenshot"
                            className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrecoProject;
