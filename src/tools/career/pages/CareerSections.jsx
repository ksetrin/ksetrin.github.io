import React from 'react';

import TodayPanel from '../components/TodayPanel';
import QuickActions from '../components/QuickActions';
import CampaignTimeline from '../components/CampaignTimeline';
import MilestoneTrack from '../components/MilestoneTrack';
import WeeklyView from '../components/WeeklyView';
import ActivityFeed from '../components/ActivityFeed';
import ActivityHeatmap from '../components/ActivityHeatmap';
import Changelog from '../components/Changelog';
import KnowledgeMatrix from '../components/KnowledgeMatrix';
import EvidenceBoard from '../components/EvidenceBoard';
import InterviewReadiness from '../components/InterviewReadiness';
import QuestionBank from '../components/QuestionBank';
import MarketFunnel from '../components/MarketFunnel';
import Scoreboard from '../components/Scoreboard';
import ParkingLot from '../components/ParkingLot';

export const CareerToday = ({ dayNumber }) => (
  <>
    <TodayPanel dayNumber={dayNumber} />
    <QuickActions dayNumber={dayNumber} />
    <WeeklyView dayNumber={dayNumber} />
  </>
);

export const CareerCampaign = ({ dayNumber, onOpenDay }) => (
  <>
    <CampaignTimeline dayNumber={dayNumber} onOpenDay={onOpenDay} />
    <WeeklyView dayNumber={dayNumber} />
    <MilestoneTrack />
  </>
);

export const CareerActivity = () => (
  <>
    <ActivityFeed limit={120} removable />
    <Changelog />
  </>
);

export const CareerKnowledge = () => (
  <>
    <KnowledgeMatrix />
    <ParkingLot />
  </>
);

export const CareerEvidence = () => <EvidenceBoard />;

export const CareerInterviews = () => (
  <>
    <InterviewReadiness detailed />
    <QuestionBank />
  </>
);

/** Аналитика вынесена на отдельный экран, чтобы не перегружать главный (§50). */
export const CareerAnalytics = ({ dayNumber }) => (
  <>
    <Scoreboard dayNumber={dayNumber} />
    <MarketFunnel />
    <ActivityHeatmap />
    <InterviewReadiness detailed />
    <KnowledgeMatrix interactive={false} />
  </>
);
