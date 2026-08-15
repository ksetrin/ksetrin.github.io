import React from 'react';

import CurrentFocus from '../components/CurrentFocus';
import TodayPanel from '../components/TodayPanel';
import QuickActions from '../components/QuickActions';
import Scoreboard from '../components/Scoreboard';
import CampaignTimeline from '../components/CampaignTimeline';
import MarketFunnel from '../components/MarketFunnel';
import EvidenceBoard from '../components/EvidenceBoard';
import InterviewReadiness from '../components/InterviewReadiness';
import ActivityFeed from '../components/ActivityFeed';
import { useCareer } from '../store/CareerStore';
import { confirmedTopics } from '../utils/metrics';
import { useTranslation } from 'react-i18next';
import { Panel } from '../components/Primitives';
import { TARGETS } from '../content/campaign';

/**
 * Порядок блоков зафиксирован в ТЗ (§49) и подчинён правилу TODAY FIRST (§6):
 * фокус → сегодня → счёт → таймлайн → рынок → evidence → знания → готовность → активность.
 */
const CareerDashboard = ({ dayNumber, onOpenDay }) => {
  const { t } = useTranslation();
  const { state } = useCareer();
  const confirmed = confirmedTopics(state).length;

  return (
    <>
      <CurrentFocus dayNumber={dayNumber} />
      <TodayPanel dayNumber={dayNumber} />
      <QuickActions dayNumber={dayNumber} />
      <Scoreboard dayNumber={dayNumber} />
      <CampaignTimeline dayNumber={dayNumber} onOpenDay={onOpenDay} />

      <div className="cc-grid">
        <MarketFunnel compact />
        <Panel id="cc-knowledge-brief" title={t('career.knowledge.title')}>
          <p className="cc-bignum">
            {confirmed}
            <span className="cc-bignum__target"> / {TARGETS.topics}</span>
          </p>
          <p className="cc-hint">{t('career.knowledge.confirmedHint')}</p>
        </Panel>
        <InterviewReadiness />
      </div>

      <EvidenceBoard editable={false} />
      <ActivityFeed limit={20} />
    </>
  );
};

export default CareerDashboard;
