'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from 'src/apis/api';
import { useAuthStore } from 'src/store/useAuthStore';

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await authApi.login({
        loginId: formData.loginId,
        password: formData.password,
      });

      if (data.accessToken) {
        login(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        router.push('/');
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      alert('아이디 또는 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <div className="mx-auto flex w-[90dvw] flex-col items-center justify-center py-20 md:w-[550px]">
      <div className="mb-9 w-full border-b-2 pb-5 text-center text-xl font-bold">LOGIN</div>
      <div className="w-full">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-2 p-3 outline-none"
              placeholder="아이디를 입력해 주세요"
              required
            />
          </div>
          <div className="mb-[34px]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-foreground h-12 w-full border-2 p-3 outline-none"
              placeholder="비밀번호를 입력해 주세요"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-foreground text-background hover:bg-opacity-90 h-16 w-full font-bold transition-opacity"
          >
            로그인하기
          </button>
        </form>
      </div>
      <div className="mt-6">
        <Link href="/signup" className="text-sm text-gray-500 underline underline-offset-4">
          아직 계정이 없나요? 회원가입하러 가기
        </Link>
      </div>
    </div>
  );
}
