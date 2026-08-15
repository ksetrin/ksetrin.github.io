import React from 'react';
import { useTranslation } from 'react-i18next';

import { TOPIC_STATUSES, topicsByDomain } from '../content/topics';
import { questionsForTopic } from '../content/questions';
import { useCareer } from '../store/CareerStore';
import { normalizeLang, pickLang } from '../utils/content';
import { formatDate } from '../utils/date';
import { Panel } from './Primitives';

const statusRank = (status) => Math.max(0, TOPIC_STATUSES.indexOf(status || 'NEW'));

/** Матрица знаний (§19): статус темы и переход между NEW → STUDYING → CONFIRMED. */
const KnowledgeMatrix = ({ interactive = true }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, actions } = useCareer();

  const groups = topicsByDomain();

  return (
    <Panel id="cc-knowledge" title={t('career.knowledge.title')}>
      {interactive && <p className="cc-hint">{t('career.knowledge.hint')}</p>}

      <div className="cc-matrix-wrap">
        <table className="cc-matrix">
          <thead>
            <tr>
              <th scope="col">{t('career.knowledge.topic')}</th>
              {TOPIC_STATUSES.map((status) => (
                <th scope="col" key={status}>
                  {t(`career.topicStatuses.${status}`)}
                </th>
              ))}
              <th scope="col">{t('career.knowledge.lastReview')}</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <React.Fragment key={group.id}>
                <tr className="cc-matrix__group">
                  <th scope="rowgroup" colSpan={TOPIC_STATUSES.length + 2}>
                    {pickLang(group.label, lang)}
                    <span className="cc-matrix__priority">{group.priority}</span>
                  </th>
                </tr>
                {group.topics.map((topic) => {
                  const stored = state.topics?.[topic.id];
                  const rank = statusRank(stored?.status);
                  return (
                    <tr key={topic.id}>
                      <th scope="row">
                        <span className="cc-matrix__topic">{pickLang(topic.label, lang)}</span>
                        <span className="cc-matrix__meta">
                          {t('career.knowledge.fromDay', { day: topic.introducedOnDay })} ·{' '}
                          {t('career.knowledge.questions', { n: questionsForTopic(topic.id).length })}
                        </span>
                      </th>
                      {TOPIC_STATUSES.map((status, index) => {
                        const reached = rank >= index;
                        const isCurrent = rank === index && Boolean(stored?.status);
                        const label = `${pickLang(topic.label, lang)}: ${t(`career.topicStatuses.${status}`)}`;
                        return (
                          <td key={status}>
                            {interactive ? (
                              <button
                                type="button"
                                className={`cc-cell ${reached ? 'cc-cell--reached' : ''} ${isCurrent ? 'cc-cell--current' : ''}`}
                                onClick={() => actions.setTopicStatus(topic.id, status, status !== 'NEW')}
                                aria-pressed={isCurrent}
                                aria-label={label}
                                title={label}
                              >
                                {reached ? (status === 'CONFIRMED' ? '✓' : '●') : '○'}
                              </button>
                            ) : (
                              <span className={`cc-cell ${reached ? 'cc-cell--reached' : ''}`} aria-label={label}>
                                {reached ? (status === 'CONFIRMED' ? '✓' : '●') : '○'}
                              </span>
                            )}
                          </td>
                        );
                      })}
                      <td className="cc-matrix__date">
                        {stored?.lastReviewAt ? formatDate(stored.lastReviewAt, lang) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default KnowledgeMatrix;
