'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { partNames } from '@/constants/partCategories';

const candidates = {
  FR3ONTEND: [
    { name: '2', count: 1 },
    { name: '3', count: 10 },
  ],
  BACKEND: [
    { name: '1', count: 10 },
    { name: '10', count: 1 },
  ],
  DEMO: [
    { name: 'CatchUp', count: 1 },
    { name: 'DiggIndie', count: 1 },
    { name: 'Menual', count: 1 },
    { name: 'Modelly', count: 1 },
    { name: 'STORIX', count: 1 },
  ],
};

interface PartVoteResultClientProps {
  part: string;
}

export default function PartVoteResultClient({ part }: PartVoteResultClientProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/vote'); // 로그아웃 시 자동 이동
    }
  }, [isLoggedIn, router]);

  const candidateList = (candidates[part as keyof typeof candidates] || []).sort((a, b) => b.count - a.count);
  const highestCount = candidateList[0]?.count || 0;

  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 결과보기</h1>

      <div className={`mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {candidateList.map(({ name, count }) => (
          <div
            key={name}
            className={`border-foreground flex items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium whitespace-nowrap ${
              count === highestCount ? 'bg-yellow-400' : ''
            }`}
          >
            {name} ({count})
          </div>
        ))}
      </div>

      <div className="text-gray-1 flex flex-col items-end gap-0.5">
        <Link href="/">홈 페이지로 &gt;&gt;</Link>
        <Link href="/vote">투표 메인 페이지로 &gt;&gt;</Link>
      </div>
    </div>
  );
}
