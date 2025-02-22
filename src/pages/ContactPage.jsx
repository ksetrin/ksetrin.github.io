import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
    const { t } = useTranslation();

    const contacts = [
        {
            icon: <FaLinkedin className="w-8 h-8" />,
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/ksetrin/',
            handle: '@ksetrin',
            color: 'text-blue-600 hover:text-blue-700'
        },
        {
            icon: <FaGithub className="w-8 h-8" />,
            name: 'GitHub',
            url: 'https://github.com/ksetrin',
            handle: '@ksetrin',
            color: 'text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        },
        {
            icon: <FaTelegram className="w-8 h-8" />,
            name: 'Telegram',
            url: 'https://t.me/ksetrin',
            handle: '@ksetrin',
            color: 'text-blue-500 hover:text-blue-600'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                    {t('contact.title')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {t('contact.subtitle')}
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {contacts.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                    >
                        <div className={`mb-6 ${contact.color} transition-colors duration-300`}>
                            {contact.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {contact.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            {contact.handle}
                        </p>
                        <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('contact.visit')} →
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-full">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        {t('homepage.contact.availability')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;