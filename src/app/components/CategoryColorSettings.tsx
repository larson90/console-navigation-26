import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Switch } from './ui/switch';
import { cn } from './ui/utils';
import {
  CATEGORY_COLOR_PRESETS,
  getColorConfigurableCategories,
  resolveCategoryAccentColor,
} from '../data/serviceCatalog';

interface CategoryColorSettingsProps {
  categoryColors: Record<string, string | null>;
  colorsEnabled: boolean;
  onColorChange: (categoryId: string, color: string | null) => void;
  onColorsEnabledChange: (enabled: boolean) => void;
  onReset: () => void;
}

const CONFIGURABLE_CATEGORIES = getColorConfigurableCategories();

function getCategoryColor(
  categoryId: string,
  categoryColors: Record<string, string | null>,
  defaultColor: string,
): string | null {
  if (categoryId in categoryColors) return categoryColors[categoryId];
  return defaultColor;
}

function ColorSwatch({
  color,
  selected,
  disabled,
  label,
  onClick,
}: {
  color?: string;
  selected: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        'relative shrink-0 size-[28px] rounded-full border-2 transition-shadow cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-40',
        selected ? 'border-[#41424e] shadow-[0_0_0_2px_#fff,0_0_0_4px_#41424e]' : 'border-transparent hover:border-[#aaaebd]',
      )}
      style={color ? { backgroundColor: color } : undefined}
    >
      {!color && (
        <>
          <span className="absolute inset-[3px] rounded-full bg-[#f5f6f8] border border-[#dde0ea]" />
          <span className="absolute inset-[6px] rotate-45 border-t border-[#aaaebd]" aria-hidden />
        </>
      )}
    </button>
  );
}

export function CategoryColorSettings({
  categoryColors,
  colorsEnabled,
  onColorChange,
  onColorsEnabledChange,
  onReset,
}: CategoryColorSettingsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Настройки цвета категорий"
        className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
      >
        <Palette className="size-[16px] text-[#8b8e9b]" strokeWidth={1.75} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] gap-0 p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#e6e8ef]">
            <DialogTitle className="font-['SB_Sans_Interface:Semibold',sans-serif] text-[16px] text-[#41424e]">
              Цвета категорий
            </DialogTitle>
            <DialogDescription className="font-['SB_Sans_Interface:Regular',sans-serif] text-[12px] text-[#6d707f]">
              Выберите акцентный цвет левой границы для каждой категории
            </DialogDescription>
            <label className="mt-3 flex items-center gap-[8px] cursor-pointer select-none">
              <Switch
                checked={colorsEnabled}
                onCheckedChange={onColorsEnabledChange}
                className="data-[state=checked]:bg-[#99d7ba]"
              />
              <span className="font-['SB_Sans_Interface:Regular',sans-serif] text-[14px] leading-[20px] text-[#41424e]">
                Показывать цвета категорий
              </span>
            </label>
          </DialogHeader>

          <div className="max-h-[min(60vh,480px)] overflow-y-auto px-6 py-4">
            <ul className="flex flex-col gap-4">
              {CONFIGURABLE_CATEGORIES.map((category) => {
                const currentColor = getCategoryColor(
                  category.id,
                  categoryColors,
                  category.defaultColor,
                );
                const previewAccent = resolveCategoryAccentColor(category.id, {
                  categoryColors,
                  colorsEnabled,
                });

                return (
                  <li
                    key={category.id}
                    className={cn(
                      'flex flex-col gap-3 rounded-[4px] border border-[#e6e8ef] bg-[#fdfdfd] px-3 py-3',
                      !colorsEnabled && 'opacity-50',
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {previewAccent && (
                        <div
                          className="h-[24px] w-[6px] shrink-0 rounded-full"
                          style={{ backgroundColor: previewAccent }}
                          aria-hidden
                        />
                      )}
                      <span className="font-['SB_Sans_Interface:Regular',sans-serif] text-[14px] leading-[20px] text-[#41424e]">
                        {category.title}
                      </span>
                    </div>

                    <div className={`flex flex-wrap items-center gap-[8px] ${previewAccent ? 'pl-[14px]' : ''}`}>
                      <ColorSwatch
                        selected={currentColor === null}
                        disabled={!colorsEnabled}
                        label={`Без цвета: ${category.title}`}
                        onClick={() => onColorChange(category.id, null)}
                      />
                      {CATEGORY_COLOR_PRESETS.map((preset) => (
                        <ColorSwatch
                          key={preset}
                          color={preset}
                          selected={currentColor === preset}
                          disabled={!colorsEnabled}
                          label={`${category.title}: ${preset}`}
                          onClick={() => onColorChange(category.id, preset)}
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-[#e6e8ef] sm:justify-between">
            <button
              type="button"
              onClick={onReset}
              className="font-['SB_Sans_Interface:Regular',sans-serif] text-[12px] text-[#6d707f] hover:text-[#41424e] cursor-pointer"
            >
              Сбросить по умолчанию
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-[4px] bg-[#41424e] px-4 py-2 font-['SB_Sans_Interface:Semibold',sans-serif] text-[12px] text-white hover:bg-[#2f3039] cursor-pointer"
            >
              Готово
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
