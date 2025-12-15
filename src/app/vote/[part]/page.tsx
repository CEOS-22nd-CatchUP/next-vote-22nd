import Link from 'next/link';
import { partNames } from '@/constants/partCategories';
import VoteSelector from '@/components/vote/VoteSelector';

// 임시 데이터
const candidates = {
  front: ['김윤성', '백승선', '손주완', '신용섭', '이채연', '장자윤', '정성훈', '정윤지', '조성아', '최무헌'],
  back: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  demo: ['CatchUp', 'DiggIndie', 'Menual', 'Modelly', 'STORIX'],
};

export default async function PartVotePage({ params }: partName) {
  const resolvedParams = await params;
  const { part } = resolvedParams;

  const candidateList = candidates[part as keyof typeof candidates] || [];

  return (
    <div className="flex flex-col">
      {/* 주제 */}
      <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 투표하기</h1>

      {/* 후보자 렌더링 컴포넌트 */}
      <VoteSelector candidates={candidateList} part={part} />

      {/* 버튼 */}
      <div className="text-gray-1 flex flex-col gap-4">
        <div className="border-foreground bg-foreground text-background mx-auto w-[80dvw] cursor-pointer rounded-xl py-4 text-center text-lg font-semibold">
          투표하기
        </div>
        <div className="flex items-center justify-between text-sm sm:text-base">
          <Link href="/vote" className="flex items-center gap-1">
            <span>&lt;&lt;</span>
            <span>이전 페이지</span>
          </Link>

          <Link href={`${part}/result`} className="flex items-center gap-1">
            <span>결과보기</span>
            <span>&gt;&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
