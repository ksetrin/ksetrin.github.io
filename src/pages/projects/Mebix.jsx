import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    FaReact,
    FaArrowLeft,
    FaExternalLinkAlt,
    FaShieldAlt,
    FaCode,
    FaRocket,
    FaMobile,
    FaDatabase,
    FaBrain,
    FaStethoscope,
    FaUsers,
    FaAward,
    FaHeart,
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaExpand,
    FaTimes
} from 'react-icons/fa';
import {
    SiTypescript,
    SiRedux,
    SiFirebase,
    SiTensorflow,
    SiGoogleanalytics
} from 'react-icons/si';
import video1 from '@/assets/video/mebix_video.mp4';
import video_poster from '@/assets/images/project_preview/mebix_video_poster.jpg';
import screen1 from '@/assets/images/screenshots/mebix/screen-1.png';
import screen2 from '@/assets/images/screenshots/mebix/screen-2.png';
import screen3 from '@/assets/images/screenshots/mebix/screen-3.png';
import screen4 from '@/assets/images/screenshots/mebix/screen-4.png';
import screen5 from '@/assets/images/screenshots/mebix/screen-5.png';

const MebixProject = () => {
    const { t, i18n } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [videoMuted, setVideoMuted] = useState(true);

    const technologies = [
        { icon: <FaReact className="w-6 h-6" />, name: 'React Native', color: 'text-blue-400' },
        { icon: <SiTypescript className="w-6 h-6" />, name: 'TypeScript', color: 'text-blue-600' },
        { icon: <SiRedux className="w-6 h-6" />, name: 'Redux', color: 'text-purple-500' },
        { icon: <SiFirebase className="w-6 h-6" />, name: 'Firebase', color: 'text-orange-500' },
        { icon: <SiTensorflow className="w-6 h-6" />, name: 'AI/ML', color: 'text-green-500' },
        { icon: <FaStethoscope className="w-6 h-6" />, name: 'Medical APIs', color: 'text-red-500' }
    ];

    const metrics = [
        { value: '11kg', label: t('mebix.results.metrics.0.label'), period: t('mebix.results.metrics.0.period') },
        { value: '1.1%', label: t('mebix.results.metrics.1.label'), period: t('mebix.results.metrics.1.period') },
        { value: '85%', label: t('mebix.results.metrics.2.label'), period: t('mebix.results.metrics.2.period') },
        { value: '40%', label: t('mebix.results.metrics.3.label'), period: t('mebix.results.metrics.3.period') }
    ];

    const screenshots = [screen1, screen2, screen3, screen4, screen5];

    const toggleVideo = () => {
        const video = document.getElementById('mebix-video');
        if (video) {
            if (videoPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setVideoPlaying(!videoPlaying);
        }
    };

    const toggleMute = () => {
        const video = document.getElementById('mebix-video');
        if (video) {
            video.muted = !videoMuted;
            setVideoMuted(!videoMuted);
        }
    };

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 filter blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <Link to="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    {t('mebix.hero.subtitle')}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                                    {t('mebix.hero.title')}
                                </h1>
                                <h2 className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6">
                                    {t('mebix.hero.description')}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {t('mebix.hero.tagline')}
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
                                    href="https://www.mebix.de/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                                >
                                    {t('mebix.hero.visitWebsite')}
                                    <FaExternalLinkAlt className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    {metrics.map((metric, index) => (
                                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                                {metric.value}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{metric.label}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{metric.period}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
                                    <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                                        {t('mebix.overview.impact')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-6">Project Showcase</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Watch how Mebix revolutionizes diabetes management through AI-powered nutrition tracking and personalized therapy guidance.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                            <video
                                id="mebix-video"
                                className="w-full h-auto"
                                poster={video_poster}
                                muted={videoMuted}
                                loop
                                onPlay={() => setVideoPlaying(true)}
                                onPause={() => setVideoPlaying(false)}
                            >
                                <source src={video1} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleVideo}
                                        className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-opacity-30 transition-all"
                                    >
                                        {videoPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6 ml-1" />}
                                    </button>
                                    <button
                                        onClick={toggleMute}
                                        className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all"
                                    >
                                        {videoMuted ? <FaVolumeMute className="w-5 h-5" /> : <FaVolumeUp className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">{t('mebix.overview.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('mebix.overview.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaUsers className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">{t('mebix.overview.role')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaRocket className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">{t('mebix.overview.duration')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaAward className="w-5 h-5 text-purple-500" />
                                    <span className="font-medium">{t('mebix.overview.company')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-6">{t('mebix.challenge.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('mebix.challenge.description')}</p>
                            <div className="space-y-4">
                                {[0, 1, 2].map((index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-medium mb-1">{t(`mebix.challenge.problems.${index}.title`)}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{t(`mebix.challenge.problems.${index}.description`)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl my-20">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t('mebix.solution.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('mebix.solution.description')}
                            </p>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-center mb-8">App Screenshots</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
                                {screenshots.map((screenshot, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 cursor-pointer group"
                                        onClick={() => openImageModal(screenshot)}
                                    >
                                        <div className="relative w-32 h-68 md:w-40 md:h-85 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                                            <img
                                                src={screenshot}
                                                alt={`Mebix App Screenshot ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc1IiBoZWlnaHQ9Ijc5OCIgdmlld0JveD0iMCAwIDM3NSA3OTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNzUiIGhlaWdodD0iNzk4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk1lYml4IFNjcmVlbnNob3Q8L3RleHQ+Cjwvc3ZnPg==';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
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
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                                        {index === 0 && <FaBrain className="w-6 h-6 text-white" />}
                                        {index === 1 && <FaHeart className="w-6 h-6 text-white" />}
                                        {index === 2 && <FaMobile className="w-6 h-6 text-white" />}
                                        {index === 3 && <FaCode className="w-6 h-6 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{t(`mebix.solution.features.${index}.title`)}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t(`mebix.solution.features.${index}.description`)}</p>
                                    <ul className="space-y-2">
                                        {[0, 1, 2, 3].map((detailIndex) => (
                                            <li key={detailIndex} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {t(`mebix.solution.features.${index}.details.${detailIndex}`)}
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
                        <h2 className="text-4xl font-bold mb-6">{t('mebix.technical.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('mebix.technical.description')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                <FaRocket className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('mebix.technical.architecture.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm">{t(`mebix.technical.architecture.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                                <FaShieldAlt className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('mebix.technical.security.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">{t(`mebix.technical.security.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-8">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                                <FaCode className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{t('mebix.technical.development.title')}</h3>
                            <ul className="space-y-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm">{t(`mebix.technical.development.items.${index}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {[0, 1, 2, 3].map((categoryIndex) => (
                            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-4">{t(`mebix.technical.technologies.${categoryIndex}.category`)}</h4>
                                <div className="space-y-2">
                                    {[0, 1, 2, 3].map((itemIndex) => (
                                        <div key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                            {t(`mebix.technical.technologies.${categoryIndex}.items.${itemIndex}`)}
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
                            <h2 className="text-4xl font-bold mb-6">{t('mebix.results.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t('mebix.results.description')}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-4 gap-8 mb-16">
                            {metrics.map((metric, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                        {metric.value}
                                    </div>
                                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">{metric.label}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{metric.period}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {[0, 1].map((studyIndex) => (
                                <div key={studyIndex} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-6">{t(`mebix.results.studies.${studyIndex}.title`)}</h3>
                                    <div className="space-y-3">
                                        {[0, 1, 2, 3].map((resultIndex) => (
                                            <div key={resultIndex} className="flex justify-between items-center">
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    {t(`mebix.results.studies.${studyIndex}.results.${resultIndex}`).split(':')[0]}:
                                                </span>
                                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                    {t(`mebix.results.studies.${studyIndex}.results.${resultIndex}`).split(':')[1]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">{t('mebix.impact.title')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('mebix.impact.description')}
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">{t(`mebix.impact.achievements.${index}.title`)}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{t(`mebix.impact.achievements.${index}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white my-20">
                    <div className="max-w-4xl mx-auto text-center px-8">
                        <h2 className="text-4xl font-bold mb-6">{t('mebix.cta.title')}</h2>
                        <p className="text-xl text-blue-100 mb-8">{t('mebix.cta.description')}</p>

                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        {index === 0 && <FaStethoscope className="w-6 h-6" />}
                                        {index === 1 && <FaShieldAlt className="w-6 h-6" />}
                                        {index === 2 && <FaBrain className="w-6 h-6" />}
                                        {index === 3 && <FaAward className="w-6 h-6" />}
                                    </div>
                                    <div className="text-sm font-medium">{t(`mebix.cta.features.${index}`)}</div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            {t('mebix.cta.button')}
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
                            alt="Mebix App Screenshot"
                            className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MebixProject;
