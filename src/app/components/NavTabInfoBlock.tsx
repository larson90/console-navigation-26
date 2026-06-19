import React from 'react';

function NavTabInfoIcon() {
  return (
    <svg className="nav-tab-info__icon" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 10.5V8M8 5.5H8.005" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function NavTabInfoBlock({ text }: { text: string }) {
  return (
    <div className="nav-tab-info" role="note">
      <NavTabInfoIcon />
      <p className="nav-tab-info__text">{text}</p>
    </div>
  );
}
