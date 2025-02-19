import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaTelegram, FaMapMarkerAlt } from 'react-icons/fa';
import photo from '@/assets/images/photo.jpeg';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col lg:flex-row items-center justify-between py-12">
            <div className="relative mb-8 lg:mb-0 lg:mr-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl transform scale-110"></div>
                <img
                    src={photo}
                    alt="Peter Evsikov Portrait"
                    className="w-48 h-48 lg:w-56 lg:h-56 rounded-full shadow-xl ring-4 ring-blue-500/30 object-cover relative z-10"
                />
            </div>
            <div className="text-center lg:text-left max-w-3xl flex-1">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                    {t('homepage.introduction.title')}
                </h1>
                <h2 className="text-xl lg:text-2xl mt-4 text-gray-600 dark:text-gray-300 font-medium">
                    {t('homepage.introduction.subtitle')}
                </h2>
                <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('homepage.introduction.description')}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                        <FaEnvelope className="w-4 h-4 text-blue-600" />
                        <span>{t('homepage.contact.email')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                        <FaTelegram className="w-4 h-4 text-blue-600" />
                        <span>@{t('homepage.contact.telegram')}</span>
                    </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                    <Link to="/projects" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                        {t('homepage.introduction.ctaButton')}
                    </Link>
                    <a href="mailto:epv01@mail.ru" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
