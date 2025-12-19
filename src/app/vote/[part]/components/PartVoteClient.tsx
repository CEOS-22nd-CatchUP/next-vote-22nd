// Client Component (투표 페이지)

'use client';

import { useState } from 'react';
import Link from 'next/link';
import VoteSelector from '@/components/vote/VoteSelector';
import Alert from '@/components/vote/Alert';
import { partNames } from '@/constants/partCategories';

const candidates = {
  front: ['김윤성', '백승선', '손주완', '신용섭', '이채연', '장자윤', '정성훈', '정윤지', '조성아', '최무헌'],
  back: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  demo: ['CatchUp', 'DiggIndie', 'Menual', 'Modelly', 'STORIX'],
};

export default function PartVoteClient({ part }: { part: string }) {
  const candidateList = candidates[part as keyof typeof candidates] || [];

  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSelect = (name: string) => {
    if (voted) return;
    setSelected((prev) => (prev === name ? null : name));
  };

  const confirmVote = () => {
    setVoted(true);
    setAlertOpen(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 투표하기</h1>

      <VoteSelector candidates={candidateList} selected={selected} onSelect={handleSelect} part={part} />

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
