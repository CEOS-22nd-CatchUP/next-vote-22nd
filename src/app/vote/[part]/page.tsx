import Link from 'next/link';
import { partNames } from '@/constants/partCategories';

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
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col">
        <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 투표하기</h1>
        <div className={`mb-5 grid w-[80dvw] gap-4 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {candidateList.map((name) => (
            <div
              key={name}
              className="border-foreground flex cursor-pointer items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium"
            >
              {name}
            </div>
          ))}
        </div>
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
    </div>
  );
}
