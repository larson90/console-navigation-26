import { imgSearchM } from "./svg-u17sy";

export default function SearchM() {
  return (
    <div className="bg-[#fdfdfd] content-stretch flex flex-col items-start justify-center px-[10px] py-[721px] relative rounded-[4px] size-full" data-name="SearchM">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="relative shrink-0 w-full" data-name="SearchPrivateM/Placeholder">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Icon">
            <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgSearchM}')` }} data-name="Icon (color)" />
          </div>
          <div className="content-stretch flex flex-[1_0_0] items-start min-w-px overflow-clip relative" data-name="Placeholder">
            <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="InputArea">
              <p className="flex-[1_0_0] font-['SB_Sans_Interface:Regular',sans-serif] leading-[20px] min-w-px not-italic overflow-hidden relative text-[#aaaebd] text-[14px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}