import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/homePage/HeroSection';
import SkillsSection from '@/components/homePage/SkillsSection';
import ExperienceSection from '@/components/homePage/ExperienceSection';
import TechStackSection from '@/components/homePage/TechStackSection';
import FeaturedArticles from '@/components/homePage/FeaturedArticles';
import CTASection from '@/components/homePage/CTASection';
import usePageMetadata from '@/hooks/usePageMetadata';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const seoKeywords = t('seo.home.keywords', { returnObjects: true });

  usePageMetadata({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: Array.isArray(seoKeywords) ? seoKeywords : [],
    canonical: 'https://ksetrin.github.io/',
    lang: i18n.language
  });

  return (
      <div className="max-w-6xl mx-auto p-4 space-y-12">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <TechStackSection />
        <FeaturedArticles />
        <CTASection />
      </div>
  );
};

export default HomePage;
