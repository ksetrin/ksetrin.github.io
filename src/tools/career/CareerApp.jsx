import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CareerProvider, useCareer } from './store/CareerStore';
import usePageMetadata from '@/hooks/usePageMetadata';

import StartScreen from './components/StartScreen';
import RecoveryScreen from './components/RecoveryScreen';
import CampaignComplete from './components/CampaignComplete';
import DayLogModal from './components/DayLogModal';
import CareerDashboard from './pages/CareerDashboard';
import CareerSettings from './pages/CareerSettings';
import {
  CareerToday,
  CareerCampaign,
  CareerActivity,
  CareerKnowledge,
  CareerEvidence,
  CareerInterviews,
  CareerAnalytics
} from './pages/CareerSections';

import { formatFullDate } from './utils/date';
import { normalizeLang } from './utils/content';
import { nonZeroDays } from './utils/metrics';

import './career.css';

const SECTIONS = [
  'dashboard',
  'today',
  'campaign',
  'activity',
  'knowledge',
  'evidence',
  'interviews',
  'analytics',
  'settings'
];

const CareerHeader = ({ dayNumber }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign, today, isComplete } = useCareer();
  const nz = nonZeroDays(state, campaign, dayNumber);

  return (
    <header className="cc-header">
      <div className="cc-header__main">
        <h1 className="cc-header__title">{t('career.title')}</h1>
        <p className="cc-header__subtitle">{t('career.subtitle')}</p>
      </div>
      <dl className="cc-header__status">
        <div>
          <dt>{t('career.header.day')}</dt>
          <dd>
            {Math.min(dayNumber, campaign.duration)} / {campaign.duration}
          </dd>
        </div>
        <div>
          <dt>{t('career.header.date')}</dt>
          <dd>{formatFullDate(today, lang)}</dd>
        </div>
        <div>
          <dt>{t('career.header.state')}</dt>
          <dd>{isComplete ? t('career.header.complete') : t('career.header.active')}</dd>
        </div>
        <div>
          <dt>{t('career.scoreboard.nonZero')}</dt>
          <dd>
            {nz.count} / {nz.elapsed}
          </dd>
        </div>
      </dl>
    </header>
  );
};

const CareerShell = ({ section }) => {
  const { t, i18n } = useTranslation();
  const { status, dayNumber, theme, isComplete } = useCareer();
  const [openDay, setOpenDay] = useState(null);
  const [dismissedComplete, setDismissedComplete] = useState(false);

  usePageMetadata({
    title: t('career.metaTitle'),
    description: t('career.metaDescription'),
    canonical: 'https://ksetrin.github.io/tools/career/',
    lang: i18n.language,
    robots: 'index,follow'
  });

  useEffect(() => {
    if (openDay != null) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
      };
    }
    return undefined;
  }, [openDay]);

  if (status === 'corrupted') {
    return (
      <div className="cc-root" data-cc-theme={theme}>
        <RecoveryScreen />
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="cc-root" data-cc-theme={theme}>
        <StartScreen />
      </div>
    );
  }

  const showComplete = isComplete && !dismissedComplete;

  const content = () => {
    if (showComplete) return <CampaignComplete onContinue={() => setDismissedComplete(true)} />;

    switch (section) {
      case 'today':
        return <CareerToday dayNumber={dayNumber} />;
      case 'campaign':
        return <CareerCampaign dayNumber={dayNumber} onOpenDay={setOpenDay} />;
      case 'activity':
        return <CareerActivity />;
      case 'knowledge':
        return <CareerKnowledge />;
      case 'evidence':
        return <CareerEvidence />;
      case 'interviews':
        return <CareerInterviews />;
      case 'analytics':
        return <CareerAnalytics dayNumber={dayNumber} />;
      case 'settings':
        return <CareerSettings />;
      default:
        return <CareerDashboard dayNumber={dayNumber} onOpenDay={setOpenDay} />;
    }
  };

  return (
    <div className="cc-root" data-cc-theme={theme}>
      <CareerHeader dayNumber={dayNumber} />

      <nav className="cc-nav" aria-label={t('career.nav.label')}>
        {SECTIONS.map((item) => (
          <NavLink
            key={item}
            to={item === 'dashboard' ? '/tools/career' : `/tools/career/${item}`}
            end={item === 'dashboard'}
            className={({ isActive }) => `cc-nav__link ${isActive ? 'cc-nav__link--active' : ''}`}
          >
            {t(`career.nav.${item}`)}
          </NavLink>
        ))}
      </nav>

      <div className="cc-content">{content()}</div>

      {openDay != null && <DayLogModal day={openDay} onClose={() => setOpenDay(null)} />}
    </div>
  );
};

const CareerApp = () => {
  const { t } = useTranslation();
  const { section } = useParams();

  if (section && !SECTIONS.includes(section)) {
    return <Navigate to="/tools/career" replace />;
  }

  return (
    <div className="container wide page cc-page">
      <p className="cc-breadcrumb">
        <Link to="/tools">← {t('tools.back')}</Link>
      </p>
      <CareerProvider>
        <CareerShell section={section || 'dashboard'} />
      </CareerProvider>
    </div>
  );
};

export default CareerApp;
