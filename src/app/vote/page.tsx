import Link from 'next/link';
import { voteCategories } from '@/constants/partCategories';

export default function VoteMainPage() {
  return (
    <div className="grid max-h-[85dvh] w-[60dvw] grid-cols-1 gap-8 whitespace-nowrap md:my-5 md:w-[80dvw] md:grid-cols-3 md:gap-6 xl:w-250 xl:gap-7.5">
      {voteCategories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
          {/* 카테고리 */}
          <div className="border-foreground mb-2 w-full rounded-lg border-2 py-10 text-center text-lg font-medium md:px-[5vw] md:py-[7vw] xl:px-12.5 xl:py-22.5 xl:text-xl">
            {category.name}
          </div>

          {/* 버튼 */}
          <div className="flex w-full flex-col gap-2">
            <Link
              href={category.voteUrl}
              className="border-foreground w-full cursor-pointer rounded-lg border-2 py-2 text-center xl:py-2.5 xl:text-xl"
            >
              투표하기
            </Link>
            <Link
              href={category.resultUrl}
              className="border-foreground w-full rounded-lg border-2 py-2 text-center xl:py-2.5 xl:text-lg"
            >
              결과보기
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
