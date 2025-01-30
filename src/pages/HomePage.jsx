import React from 'react';
import HeroSection from '@/components/homePage/HeroSection';
import SkillsSection from '@/components/homePage/SkillsSection';
import ExperienceSection from '@/components/homePage/ExperienceSection';
import TechStackSection from '@/components/homePage/TechStackSection';
import CTASection from '@/components/homePage/CTASection';

const HomePage = () => {
  return (
      <div className="max-w-6xl mx-auto p-4 space-y-12">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <TechStackSection />
        <CTASection />
      </div>
  );
};

export default HomePage;
