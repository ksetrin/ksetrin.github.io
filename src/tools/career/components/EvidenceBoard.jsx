import React from 'react';
import { useTranslation } from 'react-i18next';

import { EVIDENCE_STAGES } from '../content/artifacts';
import { useCareer } from '../store/CareerStore';
import { artifactsProgress } from '../utils/metrics';
import { normalizeLang, pickLang } from '../utils/content';
import { Panel } from './Primitives';

/**
 * Evidence board (§18, §3.2): важно не количество проектов,
 * а положение каждого артефакта на цепочке IDEA → … → IMPROVED.
 */
const EvidenceBoard = ({ editable = true }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, actions } = useCareer();

  const artifacts = artifactsProgress(state);

  return (
    <Panel id="cc-evidence" title={t('career.evidence.title')}>
      <ol className="cc-stages" aria-label={t('career.evidence.lifecycle')}>
        {EVIDENCE_STAGES.map((stage) => (
          <li key={stage}>{t(`career.evidenceStages.${stage}`)}</li>
        ))}
      </ol>

      <ul className="cc-evidence">
        {artifacts.map((artifact) => (
          <li className="cc-evidence__item" key={artifact.id}>
            <div className="cc-evidence__head">
              <h3>{pickLang(artifact.label, lang)}</h3>
              <span className={`cc-badge cc-badge--stage-${artifact.stage.toLowerCase()}`}>
                {t(`career.evidenceStages.${artifact.stage}`)}
              </span>
            </div>
            <p className="cc-evidence__summary">{pickLang(artifact.summary, lang)}</p>

            <div className="cc-evidence__track" role="img" aria-label={`${pickLang(artifact.label, lang)}: ${t(`career.evidenceStages.${artifact.stage}`)}`}>
              {EVIDENCE_STAGES.map((stage, index) => (
                <span
                  key={stage}
                  className={`cc-evidence__node ${index <= artifact.level ? 'cc-evidence__node--reached' : ''}`}
                />
              ))}
            </div>

            {editable && (
              <div className="cc-evidence__controls">
                <label className="cc-field cc-field--inline">
                  <span className="cc-field__label">{t('career.evidence.stage')}</span>
                  <select
                    value={artifact.stage}
                    onChange={(event) =>
                      actions.setArtifact(artifact.id, { stage: event.target.value }, artifact.label)
                    }
                  >
                    {EVIDENCE_STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {t(`career.evidenceStages.${stage}`)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cc-field cc-field--inline cc-field--grow">
                  <span className="cc-field__label">{t('career.evidence.link')}</span>
                  <input
                    type="url"
                    value={artifact.url}
                    placeholder="https://"
                    onChange={(event) => actions.setArtifact(artifact.id, { url: event.target.value })}
                  />
                </label>
              </div>
            )}

            {!editable && artifact.url && (
              <a href={artifact.url} target="_blank" rel="noopener noreferrer" className="cc-link">
                {artifact.url}
              </a>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
};

export default EvidenceBoard;
