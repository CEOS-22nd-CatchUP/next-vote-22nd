// Client Component (투표 페이지)

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VoteSelector from '@/components/vote/VoteSelector';
import Alert from '@/components/vote/Alert';
import { partNames } from '@/constants/partCategories';
import { candidateApi } from '@/apis/candidateApi';
import { voteApi } from '@/apis/voteApi';
import { useAuthStore } from '@/store/useAuthStore';
import VoteResultsSkeleton from '@/components/vote/VoteResultsSkeleton';

export default function PartVoteClient({ part }: { part: string }) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [candidates, setCandidates] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAuth = isLoggedIn || (typeof window !== 'undefined' && !!localStorage.getItem('accessToken'));

  const handleSelect = (name: string) => {
    if (voted) return;
    setSelected((prev) => (prev === name ? null : name));
  };

  const confirmVote = async () => {
    if (!selected) return;

    try {
      if (part === 'demo') {
        const teams = await candidateApi.getTeamCandidates();
        const target = teams.find((t) => t.name === selected);
        if (!target) throw new Error('선택 후보 없음');

        await voteApi.voteTeam(target.id);
      } else {
        const parts = await candidateApi.getPartCandidates();
        const target = parts.find((p) => p.name === selected);
        if (!target) throw new Error('선택 후보 없음');

        await voteApi.votePart(target.id);
      }

      setVoted(true);
      setAlertOpen(false);
    } catch (err) {
      console.error('투표 실패', err);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/vote');
    }
  }, [isAuth, router]);

  useEffect(() => {
    const fetchCandidatesAndStatus = async () => {
      if (!isAuth) return;
      setIsLoading(true);

      try {
        // 데모데이
        if (part === 'demo') {
          const teams = await candidateApi.getTeamCandidates();
          setCandidates(teams.map((team) => team.name));
        } else {
          // 파트장
          const parts = await candidateApi.getPartCandidates();

          const filtered = parts
            .filter((p) => {
              if (part === 'front') return p.part === 'FRONTEND';
              if (part === 'back') return p.part === 'BACKEND';
              return false;
            })
            .map((p) => p.name);

          setCandidates(filtered);
        }

        // 투표 상태
        const status = await voteApi.getVoteStatus();
        if ((part == 'demo' && status.teamVote) || (part !== 'demo' && status.partLeadVote)) {
          setVoted(true);
        }
      } catch (err) {
        console.error('후보 불러오기 실패', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidatesAndStatus();
  }, [part, isAuth]);

  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 투표하기</h1>

      {isLoading ? (
        <VoteResultsSkeleton part={part} />
      ) : (
        <VoteSelector candidates={candidates} selected={selected} onSelect={handleSelect} part={part} />
      )}

      <div className="flex flex-col gap-4 xl:w-250">
        <button
          disabled={!selected || voted}
          onClick={() => setAlertOpen(true)}
          className={`mx-auto w-[80dvw] rounded-xl py-4 text-lg font-semibold xl:w-250 ${
            !selected || voted
              ? 'cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-foreground text-background cursor-pointer'
          }`}
        >
          {voted ? '투표 완료' : '투표하기'}
        </button>

        <div className="flex items-center justify-between text-sm sm:text-base">
          <Link href="/vote">&lt;&lt; 이전 페이지</Link>
          {voted && <Link href={`${part}/result`}>결과보기 &gt;&gt;</Link>}
        </div>
      </div>

      {alertOpen && (
        <Alert
          message={`투표하신 후에는 변경이 불가능합니다. \n투표하시겠습니까?`}
          onConfirm={confirmVote}
          onCancel={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
}
