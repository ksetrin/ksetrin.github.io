import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { QUESTIONS, QUESTIONS_TARGET } from '../content/questions';
import { TOPICS, DOMAINS } from '../content/topics';
import { useCareer } from '../store/CareerStore';
import { normalizeLang, pickLang } from '../utils/content';
import { reviewedQuestions } from '../utils/metrics';
import { Panel } from './Primitives';

const topicDomain = (topicId) => TOPICS.find((topic) => topic.id === topicId)?.domain || 'other';

/** Банк вопросов (ч.2 §29, §40): вопрос закрывается вслух, отметка — один клик. */
const QuestionBank = () => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, actions } = useCareer();
  const [domain, setDomain] = useState('all');

  const reviewed = reviewedQuestions(state).length;

  const filtered = useMemo(
    () => (domain === 'all' ? QUESTIONS : QUESTIONS.filter((question) => topicDomain(question.topic) === domain)),
    [domain]
  );

  return (
    <Panel
      id="cc-questions"
      title={t('career.questions.title')}
      aside={
        <span className="cc-count">
          {reviewed} / {QUESTIONS_TARGET}
        </span>
      }
    >
      <div className="cc-filter" role="group" aria-label={t('career.questions.filter')}>
        <button
          type="button"
          className={`cc-filter__btn ${domain === 'all' ? 'cc-filter__btn--active' : ''}`}
          onClick={() => setDomain('all')}
        >
          {t('career.questions.all')}
        </button>
        {DOMAINS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`cc-filter__btn ${domain === item.id ? 'cc-filter__btn--active' : ''}`}
            onClick={() => setDomain(item.id)}
          >
            {pickLang(item.label, lang)}
          </button>
        ))}
      </div>

      <ul className="cc-questions">
        {filtered.map((question) => {
          const stored = state.questions?.[question.id];
          const count = stored?.reviews || 0;
          return (
            <li key={question.id} className={count > 0 ? 'cc-questions__item cc-questions__item--done' : 'cc-questions__item'}>
              <div>
                <span className="cc-questions__kind">{t(`career.questionKinds.${question.kind}`)}</span>
                <p className="cc-questions__text">{pickLang(question.text, lang)}</p>
              </div>
              <button
                type="button"
                className="cc-btn cc-btn--tiny"
                onClick={() => actions.markQuestionReviewed(question.id)}
                aria-label={t('career.questions.markAria', { text: pickLang(question.text, lang) })}
              >
                {count > 0 ? `✓ ${count}` : t('career.questions.mark')}
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
};

export default QuestionBank;
