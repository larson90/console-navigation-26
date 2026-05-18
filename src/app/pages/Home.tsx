import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eeeff3] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-[#41424e] mb-4">UX Тестирование Навигации</h1>
          <p className="text-[#8b8e9b]">Выберите прототип для тестирования</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/prototype-1"
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-l-6 border-[#99d7ba]"
          >
            <div className="text-center">
              <div className="bg-[#99d7ba] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-['SB_Sans_Interface:Semibold',sans-serif] text-[24px]">1</span>
              </div>
              <h2 className="text-[#41424e] font-['SB_Sans_Interface:Semibold',sans-serif] text-[18px] mb-2">
                Прототип 1
              </h2>
              <p className="text-[#8b8e9b] font-['SB_Sans_Interface:Regular',sans-serif] text-[14px]">
                Без переключения платформы
              </p>
            </div>
          </Link>

          <Link
            to="/prototype-2"
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-l-6 border-[#aac4ea]"
          >
            <div className="text-center">
              <div className="bg-[#aac4ea] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-['SB_Sans_Interface:Semibold',sans-serif] text-[24px]">2</span>
              </div>
              <h2 className="text-[#41424e] font-['SB_Sans_Interface:Semibold',sans-serif] text-[18px] mb-2">
                Прототип 2
              </h2>
              <p className="text-[#8b8e9b] font-['SB_Sans_Interface:Regular',sans-serif] text-[14px]">
                Стандартная навигация
              </p>
            </div>
          </Link>

          <Link
            to="/prototype-3"
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-l-6 border-[#e8b1c1]"
          >
            <div className="text-center">
              <div className="bg-[#e8b1c1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-['SB_Sans_Interface:Semibold',sans-serif] text-[24px]">3</span>
              </div>
              <h2 className="text-[#41424e] font-['SB_Sans_Interface:Semibold',sans-serif] text-[18px] mb-2">
                Прототип 3
              </h2>
              <p className="text-[#8b8e9b] font-['SB_Sans_Interface:Regular',sans-serif] text-[14px]">
                Альтернативная навигация
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
