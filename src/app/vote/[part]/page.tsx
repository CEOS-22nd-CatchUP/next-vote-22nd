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
      <div className="text-gray-1 flex justify-between">
        <Link href="/vote">
          <span>&lt;&lt; </span>
          <span>이전 페이지로</span>
        </Link>
        <Link href={`${part}/result`}>
          <span>결과보기 </span>
          <span>&gt;&gt;</span>
        </Link>
      </div>
    </div>
  );
}
