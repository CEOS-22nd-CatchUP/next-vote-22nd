'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, SignUpRequest } from 'src/apis/api';

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    passwordConfirm: '',
    email: '',
    realName: '',
    part: 'FRONTEND' as 'FRONTEND' | 'BACKEND',
    team: '', // 초기값 빈 문자열
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.team) {
      alert('팀을 선택해 주세요.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const payload: SignUpRequest = {
        loginId: formData.loginId,
        password: formData.password,
        email: formData.email,
        realName: formData.realName,
        part: formData.part,
        team: formData.team as any,
        isPartLeadCandidate: true,
      };

      const response = await authApi.signUp(payload);

      if (response.ok) {
        alert('회원가입에 성공했습니다!');
        router.push('/login');
      }
    } catch (error: any) {
      console.error('Signup Error:', error);
      alert('서버 연결에 실패했습니다. (네트워크 상태를 확인하세요)');
    }
  };

  return (
    <div className="mx-auto flex w-[90dvw] flex-col items-center justify-center py-10 md:w-[550px]">
      <div className="mb-9 w-full border-b-2 pb-5 text-xl font-bold">SIGNUP</div>
      <div className="w-full">
        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <div className="mb-7 w-full">
            <ToggleButton value={formData.part} onChange={(val) => setFormData((prev) => ({ ...prev, part: val }))} />
          </div>

          <div className="mb-14 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="hidden text-sm font-semibold md:block">팀</div>
            <select
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-b-2 bg-transparent p-2 outline-none md:w-[227px]"
              required
            >
              <option value="" disabled>
                팀을 선택해 주세요
              </option>
              <option value="STORIX">STORIX</option>
              <option value="Modelly">Modelly</option>
              <option value="CatchUp">CatchUp</option>
              <option value="Menual">Menual</option>
              <option value="DiggIndie">DiggIndie</option>
            </select>

            <div className="hidden text-sm font-semibold md:block">이름</div>
            <input
              name="realName"
              value={formData.realName}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-b-2 p-3 outline-none md:w-[227px]"
              placeholder="이름을 입력해 주세요"
              required
            />
          </div>

          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">아이디</div>
            <input
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-b-2 p-3 outline-none md:w-[368px]"
              placeholder="아이디를 입력해 주세요"
              required
            />
          </div>

          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">이메일</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-b-2 p-3 outline-none md:w-[368px]"
              placeholder="이메일을 입력해 주세요"
              required
            />
          </div>

          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">비밀번호</div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-b-2 p-3 outline-none md:w-[368px]"
              placeholder="비밀번호를 입력해 주세요"
              required
            />
          </div>

          <div className="mb-11 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 font-semibold md:mb-0">비밀번호 재확인</div>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-b-2 p-3 outline-none md:w-[368px]"
              placeholder="비밀번호를 다시 입력해 주세요"
              required
            />
          </div>

          <button type="submit" className="bg-foreground text-background hover:bg-opacity-90 h-16 w-full font-bold">
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

function ToggleButton({
  value,
  onChange,
}: {
  value: 'FRONTEND' | 'BACKEND';
  onChange: (val: 'FRONTEND' | 'BACKEND') => void;
}) {
  return (
    <div className="border-foreground flex w-full overflow-hidden rounded-lg border-2">
      <button
        type="button"
        onClick={() => onChange('FRONTEND')}
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          value === 'FRONTEND' ? 'bg-foreground text-background' : 'bg-background text-foreground'
        }`}
      >
        FRONT - END
      </button>
      <div className="w-[1px] bg-gray-300" />
      <button
        type="button"
        onClick={() => onChange('BACKEND')}
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          value === 'BACKEND' ? 'bg-foreground text-background' : 'bg-background text-foreground'
        }`}
      >
        BACK - END
      </button>
    </div>
  );
}
