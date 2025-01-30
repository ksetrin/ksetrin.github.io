import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact, FaCode } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

const CTASection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                    <h2 className="text-3xl font-bold mb-6 text-center">{t('homepage.purpose.title')}</h2>
                    <p className="text-lg mb-8 text-center text-blue-100">{t('homepage.purpose.description')}</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-white/20 p-4 rounded-xl mb-4 inline-block">
                                <FaReact className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{t('homepage.purpose.specialization')}</h3>
                            <p className="text-sm text-blue-100">{t('homepage.purpose.specializationDesc')}</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/20 p-4 rounded-xl mb-4 inline-block">
                                <FaCode className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{t('homepage.purpose.fullCycle')}</h3>
                            <p className="text-sm text-blue-100">{t('homepage.purpose.fullCycleDesc')}</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/20 p-4 rounded-xl mb-4 inline-block">
                                <SiTypescript className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{t('homepage.purpose.modernTech')}</h3>
                            <p className="text-sm text-blue-100">{t('homepage.purpose.modernTechDesc')}</p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-medium">{t('homepage.contact.availability')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
