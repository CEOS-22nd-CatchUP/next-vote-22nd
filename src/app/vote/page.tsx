import Link from 'next/link';

export default function VoteMainPage() {
  const voteCategories = [
    { name: 'FE 파트장', voteUrl: '/vote/front', resultUrl: '/vote/front/result' },
    { name: 'BE 파트장', voteUrl: '/vote/back', resultUrl: '/vote/back/result' },
    { name: '데모데이', voteUrl: '/vote/demo', resultUrl: '/vote/demo/result' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-[80dvw] justify-between whitespace-nowrap">
        {voteCategories.map((category) => (
          <div key={category.name}>
            <div className="mx-[1vw] -mb-[1.5px] flex justify-between">
              <div className="h-[2vw] w-[3vw] rounded-t-full border-2"></div>
              <div className="h-[2vw] w-[3vw] rounded-t-full border-2"></div>
            </div>
            <div className="border-foreground mb-2 w-full rounded-lg border-2 px-[5vw] py-[7vw] text-center text-lg font-medium">
              {category.name}
            </div>
            <div className="flex w-full flex-col gap-1">
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
