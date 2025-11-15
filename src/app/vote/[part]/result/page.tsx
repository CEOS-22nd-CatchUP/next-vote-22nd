import Link from 'next/link';
import { partNames } from '@/constants/partCategories';

// 임시 데이터
const candidates = {
  front: [
    { name: '김윤성', count: 1 },
    { name: '백승선', count: 2 },
    { name: '손주완', count: 3 },
    { name: '신용섭', count: 4 },
    { name: '이채연', count: 5 },
    { name: '장자윤', count: 6 },
    { name: '정성훈', count: 7 },
    { name: '정윤지', count: 8 },
    { name: '조성아', count: 9 },
    { name: '최무헌', count: 10 },
  ],
  back: [
    { name: '1', count: 10 },
    { name: '2', count: 9 },
    { name: '3', count: 8 },
    { name: '4', count: 7 },
    { name: '5', count: 6 },
    { name: '6', count: 5 },
    { name: '7', count: 4 },
    { name: '8', count: 3 },
    { name: '9', count: 2 },
    { name: '10', count: 1 },
  ],
  demo: [
    { name: 'CatchUp', count: 1 },
    { name: 'DiggIndie', count: 1 },
    { name: 'Menual', count: 1 },
    { name: 'Modelly', count: 1 },
    { name: 'STORIX', count: 1 },
  ],
};

export default async function PartVoteResultPage({ params }: partName) {
  const resolvedParams = await params;
  const { part } = resolvedParams;

  const candidateList = (candidates[part as keyof typeof candidates] || []).sort(
    (a, b) => b.count - a.count, // 내림차순 정렬
  );

  // 최다 득표수
  const highestCount = candidateList[0]?.count || 0;

  return (
    <div className="flex flex-col">
      {/* 주제 */}
      <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 결과보기</h1>

      {/* 결과 */}
      <div className={`mb-5 grid w-[80dvw] gap-4 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {candidateList.map(({ name, count }) => (
          <div
            key={name}
            className={`border-foreground flex items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium ${count === highestCount ? 'bg-yellow-400' : ''}`}
          >
            {name} ({count})
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="text-gray-1 flex flex-col items-end gap-0.5">
        <Link href="/">
          <span>홈 페이지로 </span>
          <span>&gt;&gt;</span>
        </Link>
        <Link href="/vote">
          <span>투표 메인 페이지로 </span>
          <span>&gt;&gt;</span>
        </Link>
      </div>
    </div>
  );
}
