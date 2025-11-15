'use client';

import { useState } from 'react';

export default function SignUp() {
  return (
    <div className="flex w-[90dvw] flex-col items-center justify-center md:w-[550px]">
      <div className="mb-9 w-full border-b-2 pb-5">SIGNUP</div>
      <div className="w-full">
        <form className="flex w-full flex-col">
          <div className="mb-7 w-full">
            <ToggleButton />
          </div>
          <div className="mb-14 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="hidden font-semibold md:block">팀</div>
            <input
              className="border-foreground h-12 w-full border-b-2 p-3 md:w-[227px]"
              placeholder="팀을 입력해 주세요"
            />

            <div className="hidden font-semibold md:block">이름</div>
            <input
              className="border-foreground h-12 w-full border-b-2 p-3 md:w-[227px]"
              placeholder="이름을 입력해 주세요"
            />
          </div>
          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">아이디</div>
            <input
              className="border-foreground h-12 w-full border-b-2 p-3 md:w-[368px]"
              placeholder="아이디를 입력해 주세요"
            />
          </div>

          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">이메일</div>
            <input
              className="border-foreground h-12 w-full border-b-2 p-3 md:w-[368px]"
              placeholder="이메일을 입력해 주세요"
            />
          </div>

          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">비밀번호</div>
            <input
              className="border-foreground h-12 w-full border-b-2 p-3 md:w-[368px]"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>

          <div className="mb-11 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">비밀번호 재확인</div>
            <input
              className="border-foreground h-12 w-full border-b-2 p-3 md:w-[368px]"
              placeholder="비밀번호를 다시 입력해 주세요"
            />
          </div>
          <button className="bg-foreground text-background h-16 w-full">회원가입하기</button>
        </form>
      </div>
    </div>
  );
}

function ToggleButton() {
  const [selected, setSelected] = useState<'left' | 'right'>('left');
  return (
    <div className="border-foreground flex w-full overflow-hidden rounded-lg border-2">
      <button
        type="button"
        onClick={() => setSelected('left')}
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          selected === 'left' ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-gray-50'
        }`}
      >
        FRONT - END
      </button>
      <div className="w-[1px] bg-gray-300" />
      <button
        type="button"
        onClick={() => setSelected('right')}
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          selected === 'right' ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-gray-50'
        }`}
      >
        BACK - END
      </button>
    </div>
  );
}
