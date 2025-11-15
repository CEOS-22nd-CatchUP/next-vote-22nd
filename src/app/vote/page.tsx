import Link from 'next/link';
import { voteCategories } from '@/constants/partCategories';

export default function VoteMainPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="my-5 grid w-[80dvw] grid-cols-1 gap-6 whitespace-nowrap md:grid-cols-3">
        {voteCategories.map((category) => (
          <div key={category.name} className="flex flex-col items-center">
            {/* 카테고리 */}
            <div className="border-foreground mb-2 w-full rounded-lg border-2 px-[5vw] py-[7vw] text-center text-lg font-medium">
              {category.name}
            </div>

            {/* 버튼 */}
            <div className="flex w-full flex-col gap-2">
              <Link
                href={category.voteUrl}
                className="border-foreground w-full cursor-pointer rounded-lg border-2 py-2 text-center"
              >
                투표하기
              </Link>
              <Link href={category.resultUrl} className="border-foreground w-full rounded-lg border-2 py-2 text-center">
                결과보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
