import React from 'react';
import type { ServicePageDisplaySettings, ServiceResourceLayout } from './types';

interface ServicePageSettingsPanelProps {
  settings: ServicePageDisplaySettings;
  onChange: (patch: Partial<ServicePageDisplaySettings>) => void;
}

function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="svc-settings__segment" role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          className={`svc-settings__segment-btn${value === option.value ? ' svc-settings__segment-btn--active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ServicePageSettingsPanel({ settings, onChange }: ServicePageSettingsPanelProps) {
  return (
    <div className="svc-settings" aria-label="Настройки отображения страницы сервиса">
      <SegmentedControl<ServiceResourceLayout>
        value={settings.resourceLayout}
        options={[
          { value: 'single', label: "Сервис '1 ресурс'" },
          { value: 'many', label: "Сервис 'много ресурсов'" },
        ]}
        onChange={(resourceLayout) => onChange({ resourceLayout })}
      />
      <SegmentedControl<'empty' | 'filled'>
        value={settings.hasData ? 'filled' : 'empty'}
        options={[
          { value: 'empty', label: 'Нет данных' },
          { value: 'filled', label: 'Есть данные' },
        ]}
        onChange={(mode) => onChange({ hasData: mode === 'filled' })}
      />
    </div>
  );
}
