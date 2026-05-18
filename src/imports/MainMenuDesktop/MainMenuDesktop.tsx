import svgPaths from "./svg-znqodigjzs";
import { imgIconColor, imgIconColor1, imgIconColor2, imgIconColor3, imgIconColor4, imgIconColor5, imgIconColor6, imgIconColor7, imgIconColor8, imgIconColor9, imgIconColor10, imgIconColor11, imgIconColor12, imgIconColor13 } from "./svg-3dkbq";

function TextLayout() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic relative" data-name="TextLayout">
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#8b8e9b] text-[12px] tracking-[0.1px] w-full">Платформа</p>
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] w-full whitespace-nowrap">Evolution</p>
    </div>
  );
}

function PinTopBlock() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start pb-[16px] relative shrink-0 w-full" data-name="PinTopBlock">
      <div className="bg-[#fdfdfd] h-[56px] relative rounded-[4px] shrink-0 w-full" data-name="SelectNavigation">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[12px] py-px relative size-full">
            <div className="flex-[1_0_0] min-w-px relative" data-name="ContentLayout">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                <div className="bg-[#787b8a] relative rounded-[4px] shrink-0 size-[32px]" data-name="IconPlatform">
                  <div className="absolute inset-0 overflow-clip" data-name="Evolution">
                    <div className="absolute inset-[12.5%]" data-name="ToneAlpha1">
                      <div className="absolute inset-[-5.21%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.5 26.5">
                          <path clipRule="evenodd" d={svgPaths.p1c0bf500} fill="var(--fill-0, white)" fillRule="evenodd" id="ToneAlpha1" stroke="var(--stroke-1, white)" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <TextLayout />
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor}')` }} data-name="Icon (color)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutBadge() {
  return <div className="absolute content-stretch flex items-end right-0 size-[8px] top-0" data-name="LayoutBadge" />;
}

function ElementLayout() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="ElementLayout">
      <div className="mb-[-8px] relative shrink-0 size-[24px]" data-name="IconElement">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor1}')` }} data-name="Icon (color)" />
      </div>
      <LayoutBadge />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[4px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#6d707f] text-[12px] text-ellipsis text-left whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden text-ellipsis">Избранное</p>
          </div>
          <div className="content-stretch flex items-center justify-center opacity-0 relative rounded-[4px] shrink-0 size-[24px]" data-name="ButtonFunctionXs">
            <ElementLayout />
          </div>
        </div>
      </div>
    </div>
  );
}

function Img() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip p-[4px] relative rounded-[4px] shrink-0" data-name="Img">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute bg-[#99d7ba] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor2}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[2px] shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center p-[12px] relative size-full">
          <Img />
          <div className="flex flex-col font-['SB_Sans_Interface:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8b8e9b] text-[12px] text-center tracking-[0.1px] w-[153.494px]">
            <p className="leading-[16px]">Перетащите сюда карточки сервисов, расположенные справа</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="relative shrink-0 w-full" data-name="Cards">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative size-full">
        <Frame12 />
        <Content />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[2]">
      <PinTopBlock />
      <button className="bg-[#fdfdfd] content-stretch cursor-pointer flex flex-col items-start relative rounded-[4px] shrink-0 w-[216px]" data-name="Favourite">
        <Cards />
      </button>
    </div>
  );
}

function TitleTag() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Title & Tag">
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Поддержка</p>
    </div>
  );
}

function TitleDescription() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Title + Description">
      <TitleTag />
    </div>
  );
}

function C() {
  return (
    <div className="max-w-[286.5px] min-w-[200px] relative shrink-0 w-full" data-name="C">
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
            <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor3}')` }} data-name="Icon (color)" />
          </div>
          <TitleDescription />
        </div>
      </div>
    </div>
  );
}

function TitleTag1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Title & Tag">
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Документация</p>
    </div>
  );
}

function TitleDescription1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Title + Description">
      <TitleTag1 />
    </div>
  );
}

function C1() {
  return (
    <div className="max-w-[286.5px] min-w-[200px] relative shrink-0 w-full" data-name="C">
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
            <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor4}')` }} data-name="Icon (color)" />
          </div>
          <TitleDescription1 />
        </div>
      </div>
    </div>
  );
}

function Indicator() {
  return (
    <div className="bg-[#389f74] relative rounded-[4px] shrink-0 size-[8px]" data-name="Indicator">
      <div aria-hidden="true" className="absolute border-[#fdfdfd] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TitleTag2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Title & Tag">
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Иннокентий Свистоплясов</p>
    </div>
  );
}

function TitleDescription2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Title + Description">
      <TitleTag2 />
    </div>
  );
}

function C2() {
  return (
    <div className="max-w-[286.5px] min-w-[200px] relative shrink-0 w-full" data-name="C">
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
          <div className="bg-[#fdd6cd] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[24px]" data-name="AvatarXs">
            <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a2d2d] text-[11px] text-center whitespace-nowrap">
              <p className="leading-[14px]">И</p>
            </div>
            <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a2d2d] text-[11px] text-center whitespace-nowrap">
              <p className="leading-[14px]">С</p>
            </div>
            <div className="absolute bottom-0 content-stretch flex items-end justify-end left-0 top-0 w-[24px]" data-name="BadgeAvatar">
              <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0 size-[8px]" data-name="StatusIndicator">
                <Indicator />
              </div>
            </div>
          </div>
          <TitleDescription2 />
        </div>
      </div>
    </div>
  );
}

function MenuLeftBar() {
  return (
    <div className="h-full relative shrink-0 w-[216px]" data-name="MenuLeftBar">
      <div className="content-stretch flex flex-col isolate items-start justify-between pb-[20px] relative size-full">
        <Frame15 />
        <div className="content-stretch flex flex-col items-start min-h-[32px] overflow-clip relative rounded-[4px] shrink-0 w-[216px] z-[1]" data-name="Admin Cards">
          <C />
          <C1 />
          <C2 />
        </div>
      </div>
    </div>
  );
}

function DividerWrapper() {
  return (
    <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0" data-name="DividerWrapper">
      <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip relative shrink-0" data-name="Divider">
        <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative">
          <div className="-scale-y-100 flex-none h-full">
            <div className="bg-[#dde0ea] h-full w-px" data-name="Line" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor5}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[16px] min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">Контроль затрат</p>
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">Управление финансами</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor6}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[16px] min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">IAM</p>
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">Роли</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor7}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[16px] min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">Администрирование</p>
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">Оргструктура, квоты</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor8}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[16px] min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">Обсерватория</p>
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">Мониторинг</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor9}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">Менеджер ресурсов</p>
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[0] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">
        <span className="leading-[16px]">Управление ре</span>
        <span className="leading-[16px]">сурсами</span>
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="IconS24px">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor10}')` }} data-name="Icon (color)" />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[16px] min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['SB_Sans_Interface:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">Пользователи</p>
      <p className="font-['SB_Sans_Interface:Regular',sans-serif] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">Управление доступами</p>
    </div>
  );
}

function Carriage() {
  return <div className="bg-[#1c1c24] h-full shrink-0 w-px" data-name="Carriage" />;
}

function InputArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative z-[1]" data-name="InputArea">
      <div className="content-stretch flex items-center min-w-px relative self-stretch shrink-0" data-name="Carriage">
        <Carriage />
      </div>
      <p className="flex-[1_0_0] font-['SB_Sans_Interface:Regular',sans-serif] leading-[20px] min-w-px not-italic overflow-hidden relative text-[#aaaebd] text-[14px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Поиск по сервисам</p>
    </div>
  );
}

function LayoutBadge1() {
  return <div className="absolute content-stretch flex items-end right-0 size-[8px] top-0" data-name="LayoutBadge" />;
}

function ElementLayout1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="ElementLayout">
      <div className="mb-[-8px] relative shrink-0 size-[24px]" data-name="IconElement">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor12}')` }} data-name="Icon (color)" />
      </div>
      <LayoutBadge1 />
    </div>
  );
}

function LayoutBadge2() {
  return <div className="absolute content-stretch flex items-end right-0 size-[8px] top-0" data-name="LayoutBadge" />;
}

function ElementLayout2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0" data-name="ElementLayout">
      <div className="mb-[-8px] relative shrink-0 size-[24px]" data-name="IconElement">
        <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor13}')` }} data-name="Icon (color)" />
      </div>
      <LayoutBadge2 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="content-stretch flex items-center p-[2px] relative shrink-0" data-name="SegmentedControlS">
        <div className="absolute bg-[#eeeff3] inset-0 rounded-[4px]" data-name="Container">
          <div aria-hidden="true" className="absolute border border-[#dde0ea] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
        <div className="relative shrink-0" data-name="Segments">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
            <div className="bg-white content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0" data-name="Segment">
              <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#41424e] text-[12px] whitespace-nowrap">Сервисы платформы</p>
            </div>
            <div className="content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0" data-name="Segment">
              <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d707f] text-[12px] whitespace-nowrap">Центр управления</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Control Buttons">
        <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="ButtonFunctionXs">
          <ElementLayout1 />
        </div>
        <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="ButtonFunctionXs">
          <ElementLayout2 />
        </div>
      </div>
    </div>
  );
}

function SegmentControl() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pt-[8px] relative rounded-[8px] shrink-0 w-full" data-name="Segment Control">
      <div className="bg-white h-[40px] max-h-[40px] min-h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="SearchM">
        <div aria-hidden="true" className="absolute border border-[#389f74] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col justify-center max-h-[inherit] min-h-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-center max-h-[inherit] min-h-[inherit] px-[10px] py-px relative size-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <div className="absolute inset-0 rounded-[4px]" data-name="Outline (apply radius)">
                <div aria-hidden="true" className="absolute border-3 border-[#99d7ba] border-solid inset-[-3px] pointer-events-none rounded-[7px]" />
              </div>
            </div>
            <div className="relative shrink-0 w-full" data-name="SearchPrivateM/PlaceholderFocused">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
                <div className="relative shrink-0 size-[24px]" data-name="Icon">
                  <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor11}')` }} data-name="Icon (color)" />
                </div>
                <div className="content-stretch flex flex-[1_0_0] isolate items-start min-w-px overflow-clip relative" data-name="Placeholder">
                  <InputArea />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame13 />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Инфраструктура</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Сеть</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Хранение данных</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Контейнеры</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Брокеры сообщений</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Базы данных</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Инструменты разработчика</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">Платформа данных</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronIconContainer() {
  return (
    <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]" data-name="ChevronIconContainer">
      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="Interface/Xs/ChevronRight">
        <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]" data-name="ToneAlpha1">
          <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.34099 8.56066">
              <path d={svgPaths.p83bfb80} id="ToneAlpha1" stroke="var(--stroke-0, #787B8A)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative" data-name="SectionTitle">
          <div className="content-stretch flex items-start pl-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TitleClickable">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="◆TitleContent">
                <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                  <p className="leading-[24px] overflow-hidden text-ellipsis">AI Factory</p>
                </div>
              </div>
              <ChevronIconContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#f5b27b] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#a8d1a2] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title1 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#e6c878] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title2 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#ceb7e7] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title3 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#aac4ea] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title4 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#e8b1c1] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title5 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#fbab99] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title6 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#99d7d5] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title7 />
        </div>
      </div>
      <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full" data-name="MenuCategory">
        <div aria-hidden="true" className="absolute border-[#cfd2dc] border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col gap-[10px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
          <Title8 />
        </div>
      </div>
    </div>
  );
}

function EvolutionMenuContent() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] relative shrink-0 w-full" data-name="◆EvolutionMenuContent">
      <div className="gap-x-[4px] gap-y-[4px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full" data-name="Favourite/Adm Services">
        <div className="bg-[#fdfdfd] col-3 justify-self-stretch min-h-[32px] relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Admin Cards">
          <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
              <Frame1 />
              <Frame />
            </div>
          </div>
        </div>
        <div className="bg-[#fdfdfd] col-2 justify-self-stretch min-h-[32px] relative rounded-[4px] row-2 self-start shrink-0" data-name="Admin Cards">
          <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
              <Frame2 />
              <Frame3 />
            </div>
          </div>
        </div>
        <div className="bg-[#fdfdfd] col-3 justify-self-stretch min-h-[32px] relative rounded-[4px] row-2 self-start shrink-0" data-name="Admin Cards">
          <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
              <Frame4 />
              <Frame5 />
            </div>
          </div>
        </div>
        <div className="bg-[#fdfdfd] col-1 justify-self-stretch min-h-[32px] relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Admin Cards">
          <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
              <Frame6 />
              <Frame7 />
            </div>
          </div>
        </div>
        <div className="bg-[#fdfdfd] col-2 justify-self-stretch min-h-[32px] relative rounded-[4px] row-1 self-start shrink-0" data-name="Admin Cards">
          <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
              <Frame8 />
              <Frame9 />
            </div>
          </div>
        </div>
        <div className="bg-[#fdfdfd] col-1 justify-self-stretch min-h-[32px] relative rounded-[4px] row-2 self-start shrink-0" data-name="Admin Cards">
          <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
              <Frame10 />
              <Frame11 />
            </div>
          </div>
        </div>
      </div>
      <SegmentControl />
      <Frame14 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px relative w-full z-[2]" data-name="Body">
      <EvolutionMenuContent />
    </div>
  );
}

function MenuBody() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="MenuBody">
      <div className="content-stretch flex flex-col gap-[8px] isolate items-start pr-[20px] relative size-full">
        <Body />
        <div className="absolute bottom-[202px] content-stretch flex flex-col gap-[250px] items-center right-0 top-[218px] w-[16px] z-[1]" data-name="ScrollM/Vertica">
          <div className="bg-[#787b8a] flex-[1_0_0] min-h-px opacity-32 rounded-[4px] w-[6px]" data-name="Slider" />
          <div className="h-0 shrink-0 w-[4px]" data-name="ZeroBlock" />
        </div>
      </div>
    </div>
  );
}

function DrawerWindow() {
  return (
    <div className="bg-[#eeeff3] flex-[1_0_0] h-[800px] max-w-[900px] min-w-[744px] relative shadow-[0px_0px_16px_0px_rgba(0,0,0,0.08),0px_24px_16px_0px_rgba(0,0,0,0.08)]" data-name="DrawerWindow">
      <div className="content-stretch flex items-start max-w-[inherit] min-w-[inherit] pl-[20px] pt-[20px] relative size-full">
        <MenuLeftBar />
        <DividerWrapper />
        <MenuBody />
      </div>
    </div>
  );
}

export default function MainMenuDesktop() {
  return (
    <div className="bg-[rgba(0,0,0,0.32)] content-stretch flex items-start pr-[20px] relative size-full" data-name="MainMenu/Desktop">
      <DrawerWindow />
    </div>
  );
}