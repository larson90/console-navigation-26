import React, { useEffect } from 'react';
import { PLATFORMS } from '../data/platformCatalog';
import { MARKETPLACE_TITLE } from '../navigation/marketplaceNavigation';

const MARKETPLACE = PLATFORMS.find((platform) => platform.id === 'marketplace')!;

export default function MarketplacePage() {
  useEffect(() => {
    document.title = MARKETPLACE_TITLE;
  }, []);

  return (
    <div className="lk-page">
      <main className="lk-wrap">
        <h1 className="lk-h1">{MARKETPLACE_TITLE}</h1>

        <div className="lk-card" style={{ borderTop: '3px solid #8476a5' }}>
          <div className="lk-card__head">
            <div
              className="lk-card__head-icon"
              style={{ background: 'rgba(132, 118, 165, 0.16)' }}
            >
              <span
                style={{
                  font: '600 11px/1 system-ui,sans-serif',
                  color: '#8476a5',
                  letterSpacing: '0.04em',
                }}
              >
                150+
              </span>
            </div>
            <h3 className="lk-card__title">Сервисы от ведущих вендоров</h3>
          </div>
          <p style={{ font: '400 14px/20px system-ui,sans-serif', color: '#6d707f', margin: 0 }}>
            {MARKETPLACE.description} Выберите готовое решение или подключите сервис из каталога для
            разработки, анализа данных, безопасности и бизнес-приложений.
          </p>
        </div>
      </main>
    </div>
  );
}
