import React, { useRef, useState } from 'react';
import { Settings } from 'lucide-react';
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
  isCategoryCustomColor,
  normalizeCategoryColorInput,
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

const SWATCH_SELECTED_CLASS = 'ring-2 ring-[#389f74] ring-offset-1';
const SWATCH_IDLE_CLASS = 'hover:ring-2 hover:ring-[#aaaebd] hover:ring-offset-1';

function getCategoryColor(
  categoryId: string,
  categoryColors: Record<string, string | null>,
  defaultColor: string,
): string | null {
  if (categoryId in categoryColors) return categoryColors[categoryId];
  return defaultColor;
}

function NoColorSwatch({
  selected,
  disabled,
  label,
  onClick,
}: {
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
        'relative shrink-0 size-[28px] rounded-full bg-white border-2 border-dashed border-[#cdd0dc] transition-shadow cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-40',
        selected ? SWATCH_SELECTED_CLASS : SWATCH_IDLE_CLASS,
      )}
    />
  );
}

function PresetColorSwatch({
  color,
  selected,
  disabled,
  label,
  onClick,
}: {
  color: string;
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
        'relative shrink-0 size-[28px] rounded-full border border-black/10 transition-shadow cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-40',
        selected ? SWATCH_SELECTED_CLASS : SWATCH_IDLE_CLASS,
      )}
      style={{ backgroundColor: color }}
    />
  );
}

function CustomColorSwatch({
  color,
  selected,
  disabled,
  label,
  onChange,
}: {
  color: string | null;
  selected: boolean;
  disabled?: boolean;
  label: string;
  onChange: (color: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasCustomColor = isCategoryCustomColor(color);
  const inputValue = hasCustomColor ? color! : '#c5c9d4';

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-pressed={selected}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative shrink-0 size-[28px] rounded-full p-[2px] transition-shadow cursor-pointer',
          'disabled:cursor-not-allowed disabled:opacity-40',
          selected ? SWATCH_SELECTED_CLASS : SWATCH_IDLE_CLASS,
        )}
      >
        <span
          className="block size-full rounded-full border border-black/10"
          style={
            hasCustomColor
              ? { backgroundColor: color! }
              : {
                  background:
                    'conic-gradient(from 90deg, #f4bdc1, #abe3ce, #ceb8ef, #adbaf2, #94dcf7, #f4bdc1)',
                }
          }
        />
      </button>
      <input
        ref={inputRef}
        type="color"
        value={inputValue}
        disabled={disabled}
        onChange={(event) => onChange(normalizeCategoryColorInput(event.target.value))}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      />
    </>
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
        aria-label="Настройки"
        className="nav-icon-btn nav-toolbar-btn cursor-pointer p-[2px]"
      >
        <Settings className="size-[20px] text-[#8b8e9b]" strokeWidth={1.5} />
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
                const isCustomColor = isCategoryCustomColor(currentColor);

                return (
                  <li
                    key={category.id}
                    className={cn(
                      'relative flex flex-col gap-3 overflow-hidden rounded-[4px] border border-[#e6e8ef] bg-[#fdfdfd] py-3 pr-3 pl-[14px]',
                      !colorsEnabled && 'opacity-50',
                    )}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-[6px]"
                      style={{ backgroundColor: previewAccent ?? 'transparent' }}
                    />
                    <span className="font-['SB_Sans_Interface:Regular',sans-serif] text-[14px] leading-[20px] text-[#41424e]">
                      {category.title}
                    </span>

                    <div className="flex flex-wrap items-center gap-[8px]">
                      <NoColorSwatch
                        selected={currentColor === null}
                        disabled={!colorsEnabled}
                        label={`Без цвета: ${category.title}`}
                        onClick={() => onColorChange(category.id, null)}
                      />
                      {CATEGORY_COLOR_PRESETS.map((preset) => (
                        <PresetColorSwatch
                          key={preset}
                          color={preset}
                          selected={currentColor === preset}
                          disabled={!colorsEnabled}
                          label={`${category.title}: ${preset}`}
                          onClick={() => onColorChange(category.id, preset)}
                        />
                      ))}
                      <CustomColorSwatch
                        color={currentColor}
                        selected={isCustomColor}
                        disabled={!colorsEnabled}
                        label={`Свой цвет: ${category.title}`}
                        onChange={(color) => onColorChange(category.id, color)}
                      />
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
