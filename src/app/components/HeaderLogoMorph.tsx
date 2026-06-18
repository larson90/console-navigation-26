import React from 'react';

const BRAND_COLOR = '#26D07C';

const BRAND_PATH = 'M20 11V16L11 20V11H20ZM20 9V4L11 0V9H20ZM0 4V16L9 20V0L0 4Z';
/** Сплошной силуэт домика без выреза (крыша + корпус). */
const HOME_PATH = 'M10 2L18 8.5V18H2V8.5L10 2Z';

export function HeaderLogoMorph() {
  return (
    <span className="lk-header__logo-morph" aria-hidden>
      <svg viewBox="0 0 20 20" width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="lk-header__logo-morph__brand" d={BRAND_PATH} fill={BRAND_COLOR} />
        <path className="lk-header__logo-morph__home" d={HOME_PATH} fill={BRAND_COLOR} />
      </svg>
    </span>
  );
}
