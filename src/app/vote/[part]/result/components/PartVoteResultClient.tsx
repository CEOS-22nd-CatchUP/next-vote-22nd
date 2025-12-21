// Client Component (카테고리별 투표 페이지)

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { partNames } from '@/constants/partCategories';
import { voteApi } from '@/apis/voteApi';
import VoteResultsSkeleton from '@/components/vote/VoteResultsSkeleton';

interface PartVoteResultClientProps {
  part: string;
}

export default function PartVoteResultClient({ part }: PartVoteResultClientProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [candidateList, setCandidateList] = useState<PartVoteResult[] | TeamVoteResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAuth = isLoggedIn || (typeof window !== 'undefined' && !!localStorage.getItem('accessToken'));

  useEffect(() => {
    if (!isAuth) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/vote');
    }
  }, [isAuth, router]);

  useEffect(() => {
    const fetchVoteResults = async () => {
      if (!isAuth) return;
      setIsLoading(true);

      try {
        if (part === 'demo') {
          const teamResults = await voteApi.getTeamResults();
          setCandidateList(teamResults);
        } else {
          const apiPart = part === 'front' ? 'FRONTEND' : part === 'back' ? 'BACKEND' : part;
          const partResults = await voteApi.getPartResults(apiPart);
          setCandidateList(partResults);
        }
      } catch (err) {
        console.error('투표 결과 불러오기 실패', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoteResults();
  }, [part, isAuth]);

  const highestCount = candidateList[0]?.voteCount || 0;

  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 결과보기</h1>

      {isLoading ? (
        <VoteResultsSkeleton part={part} />
      ) : (
        <div className={`mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {candidateList.map((candidate) => (
            <div
              key={candidate.targetId}
              className={`border-foreground flex items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium whitespace-nowrap ${
                candidate.voteCount === highestCount ? 'bg-yellow-400' : ''
              }`}
            >
              {candidate.targetName} ({candidate.voteCount})
            </div>
          ))}
        </div>
      )}

      <div className="text-gray-1 flex flex-col items-end gap-0.5">
        <Link href="/">홈 페이지로 &gt;&gt;</Link>
        <Link href="/vote">투표 메인 페이지로 &gt;&gt;</Link>
      </div>
    </div>
  );
}
