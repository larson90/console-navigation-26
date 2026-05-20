import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export type NavigationPrototypeId = '1' | '2' | '3';

const PROTOTYPES: { id: NavigationPrototypeId; path: string; title: string; description: string }[] = [
  { id: '1', path: '/prototype-1', title: 'Прототип 1', description: 'Без переключения платформы' },
  { id: '2', path: '/prototype-2', title: 'Прототип 2', description: 'Стандартная навигация' },
  { id: '3', path: '/prototype-3', title: 'Прототип 3', description: 'Сервисы, Центр управления, Решения' },
];

const ASSETS = '/assets/lk-header';

interface LkHeaderProps {
  activePrototype?: NavigationPrototypeId | null;
}

export function LkHeader({ activePrototype }: LkHeaderProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [menuOpen]);

  const openPrototype = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="lk-header">
      <div className="lk-header__appswitcher-wrap" ref={wrapRef}>
        <button
          type="button"
          className="lk-header__appswitcher"
          title="Сервисы"
          aria-label="Сервисы"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <img src={`${ASSETS}/lk-header-appswitcher.svg`} alt="" width={24} height={24} />
        </button>

        {menuOpen && (
          <div className="lk-header__proto-dropdown" role="menu">
            <div className="lk-header__proto-dropdown-title">UX-тестирование навигации</div>
            {PROTOTYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                role="menuitem"
                className="lk-header__proto-item"
                aria-current={activePrototype === p.id ? 'true' : undefined}
                onClick={() => openPrototype(p.path)}
              >
                <span className="lk-header__proto-item-name">{p.title}</span>
                <span className="lk-header__proto-item-desc">{p.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <a href="/" className="lk-header__logo" aria-label="Cloud.ru" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <img src={`${ASSETS}/lk-header-logo-c.svg`} alt="cloud.ru" width={20} height={20} />
      </a>

      <button type="button" className="lk-header__project">
        <span className="lk-header__project-text">
          <span className="lk-header__project-name">Тестикус</span>
          <span className="lk-header__project-sub">Проект</span>
        </span>
        <img
          src={`${ASSETS}/lk-header-chev-down.svg`}
          alt=""
          width={16}
          height={16}
          className="lk-header__project-chev"
        />
      </button>

      <span className="lk-header__platform">Evolution</span>
      <div className="lk-header__spacer" />

      <button type="button" className="lk-header__balance" id="lk-balance">
        <span className="lk-header__balance-val">170,02 ₽</span>
        <img
          src={`${ASSETS}/lk-header-balance-wallet.svg`}
          alt=""
          width={20}
          height={20}
          className="lk-header__balance-icon"
        />
      </button>

      <button type="button" className="lk-header__icon-btn" title="Календарь" aria-label="Календарь">
        <img src={`${ASSETS}/lk-header-calendar.svg`} alt="" width={20} height={20} />
      </button>

      <button type="button" className="lk-header__icon-btn" title="Помощь" aria-label="Помощь">
        <img src={`${ASSETS}/lk-header-help.svg`} alt="" width={20} height={20} />
      </button>

      <button type="button" className="lk-header__icon-btn" title="Уведомления" aria-label="Уведомления">
        <img src={`${ASSETS}/lk-header-bell.svg`} alt="" width={20} height={20} />
        <span className="lk-header__badge">2</span>
      </button>

      <button type="button" className="lk-header__icon-btn lk-header__giga" title="Гига-помощник" aria-label="Гига-помощник">
        <img src={`${ASSETS}/lk-giga-fab.svg`} alt="" width={28} height={28} />
      </button>

      <span className="lk-header__avatar" title="Владимир Чумаков">
        ВЧ
      </span>
    </header>
  );
}

export function getPrototypeIdFromPath(pathname: string): NavigationPrototypeId | null {
  const m = pathname.match(/^\/prototype-([123])$/);
  return m ? (m[1] as NavigationPrototypeId) : null;
}
