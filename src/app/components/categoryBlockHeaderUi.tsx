import React from 'react';

export function CategoryDragHandleIcon() {
  return (
    <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7" cy="5" r="1.5" fill="#8b8e9b" />
      <circle cx="12" cy="5" r="1.5" fill="#8b8e9b" />
      <circle cx="17" cy="5" r="1.5" fill="#8b8e9b" />
      <circle cx="7" cy="12" r="1.5" fill="#8b8e9b" />
      <circle cx="12" cy="12" r="1.5" fill="#8b8e9b" />
      <circle cx="17" cy="12" r="1.5" fill="#8b8e9b" />
      <circle cx="7" cy="19" r="1.5" fill="#8b8e9b" />
      <circle cx="12" cy="19" r="1.5" fill="#8b8e9b" />
      <circle cx="17" cy="19" r="1.5" fill="#8b8e9b" />
    </svg>
  );
}

export function CategoryDragHandle({
  handleRef,
}: {
  handleRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={handleRef}
      role="button"
      tabIndex={-1}
      aria-label="Переместить категорию"
      onClick={(e) => e.stopPropagation()}
      className="nav-category-drag content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-move nav-icon-btn"
    >
      <div className="relative shrink-0 size-[24px]">
        <CategoryDragHandleIcon />
      </div>
    </div>
  );
}

export function CategoryHeaderChevron({ expanded }: { expanded: boolean }) {
  return (
    <div className="nav-collapse-chevron content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]">
      <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
        <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
          <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
            <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
              <svg
                className={`block size-full nav-chevron${expanded ? ' nav-chevron--expanded' : ''}`}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 5.34099 8.56066"
                aria-hidden="true"
              >
                <path
                  d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033"
                  stroke="#787B8A"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Шеврон рядом с кликабельным заголовком — всегда вправо, без подложки. */
export function ClickableTitleChevron() {
  return (
    <span className="nav-title-chevron-wrap" aria-hidden="true">
      <svg
        className="nav-title-chevron"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 5.34099 8.56066"
      >
        <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export function CategoryCollapsedHeader({
  title,
  hasAccentPadding,
  showDragHandle = false,
}: {
  title: string;
  hasAccentPadding: boolean;
  showDragHandle?: boolean;
}) {
  return (
    <div className={`content-stretch flex flex-col items-start pr-[8px] py-[8px] relative size-full ${hasAccentPadding ? 'pl-[14px]' : 'pl-[8px]'}`}>
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[8px] py-[4px] relative size-full rounded-[4px]">
          <div className="flex-[1_0_0] min-w-px relative">
            <div
              className={`content-stretch flex items-center relative size-full min-h-[32px] ${hasAccentPadding ? 'pl-[12px]' : 'pl-[8px]'}`}
            >
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                <p className="nav-category-title font-semibold text-[16px] leading-[24px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis whitespace-nowrap">
                  {title}
                </p>
              </div>
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 ml-auto">
                {showDragHandle && (
                  <div className="nav-category-drag nav-category-drag--visible content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]">
                    <div className="relative shrink-0 size-[24px]">
                      <CategoryDragHandleIcon />
                    </div>
                  </div>
                )}
                <CategoryHeaderChevron expanded={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
