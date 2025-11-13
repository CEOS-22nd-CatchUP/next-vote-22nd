'use client';

import { useState } from 'react';

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-[550px] flex-col items-center justify-center">
        <div className="mb-9 w-[550px] border-b-2 pb-5">SIGNUP</div>
        <div>
          <form className="flex flex-col">
            <div className="mb-7">
              <ToggleButton />
            </div>
            <div className="mb-14 flex items-center justify-between">
              <div className="font-semibold">팀</div>
              <input className="border-foreground h-12 w-[227px] border-b-2 p-3" placeholder="팀을 입력해 주세요" />
              <div className="font-semibold">이름</div>
              <input className="border-foreground h-12 w-[227px] border-b-2 p-3" placeholder="이름을 입력해 주세요" />
            </div>
            <div className="mb-7 flex items-center justify-between">
              <div className="font-semibold">아이디</div>
              <input className="border-foreground h-12 w-[368px] border-b-2 p-3" placeholder="아이디를 입력해 주세요" />
            </div>
            <div className="mb-7 flex items-center justify-between">
              <div className="font-semibold">이메일</div>
              <input className="border-foreground h-12 w-[368px] border-b-2 p-3" placeholder="이메일을 입력해 주세요" />
            </div>
            <div className="mb-7 flex items-center justify-between">
              <div className="font-semibold">비밀번호</div>
              <input
                className="border-foreground h-12 w-[368px] border-b-2 p-3"
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            <div className="mb-11 flex items-center justify-between">
              <div className="font-semibold">비밀번호 재확인</div>
              <input
                className="border-foreground h-12 w-[368px] border-b-2 p-3"
                placeholder="비밀번호를 다시 입력해 주세요"
              />
            </div>
            <button className="bg-foreground text-background h-16 w-[550px]">회원가입하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ToggleButton() {
  const [selected, setSelected] = useState<'left' | 'right'>('left');
  return (
    <div className="border-foreground flex w-[550px] overflow-hidden rounded-lg border-2">
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
