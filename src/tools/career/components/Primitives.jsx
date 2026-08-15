import React from 'react';

export const Panel = ({ title, aside, children, className = '', id }) => (
  <section className={`cc-panel ${className}`} id={id} aria-labelledby={id ? `${id}-title` : undefined}>
    {(title || aside) && (
      <header className="cc-panel__head">
        {title && (
          <h2 className="cc-panel__title" id={id ? `${id}-title` : undefined}>
            {title}
          </h2>
        )}
        {aside && <div className="cc-panel__aside">{aside}</div>}
      </header>
    )}
    {children}
  </section>
);

export const Bar = ({ percent, tone = 'accent', label }) => (
  <div className="cc-bar" role="img" aria-label={label}>
    <div className={`cc-bar__fill cc-bar__fill--${tone}`} style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
  </div>
);

export const Metric = ({ label, current, target, percent, tone }) => (
  <div className="cc-metric">
    <div className="cc-metric__row">
      <span className="cc-metric__label">{label}</span>
      <span className="cc-metric__value">
        <b>{current}</b>
        {target != null && <span className="cc-metric__target"> / {target}</span>}
      </span>
    </div>
    <Bar percent={percent} tone={tone} label={`${label}: ${current}${target != null ? ` / ${target}` : ''}`} />
  </div>
);

export const Empty = ({ children }) => <p className="cc-empty">{children}</p>;
