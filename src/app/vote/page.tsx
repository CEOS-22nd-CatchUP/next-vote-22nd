'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { voteCategories } from '@/constants/partCategories';
import Alert from '@/components/vote/Alert';

export default function VoteMainPage() {
  const router = useRouter();

  // 테스트용 데이터
  const isLoggedIn = true;
  const userPart = 'back';

  const votedStatus: Record<string, boolean> = {
    front: false,
    back: true,
    demo: true,
  };

  const filteredCategories = voteCategories.filter((category) => {
    if (category.part === 'demo') return true;
    return category.part === userPart;
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});

  // 로그인 필요 모달
  const openLoginAlert = () => {
    setAlertMessage('로그인이 필요한 항목입니다.\n로그인 페이지로 이동하시겠습니까?');
    setOnConfirmAction(() => () => {
      router.push('/login');
    });
    setAlertOpen(true);
  };

  // 투표하기 버튼 클릭
  const handleVoteClick = (category: any) => {
    if (!isLoggedIn) {
      openLoginAlert();
      return;
    }
    router.push(category.voteUrl);
  };

  // 결과보기 버튼 클릭
  const handleResultClick = (category: any) => {
    if (!isLoggedIn) {
      openLoginAlert();
      return;
    }

    if (!votedStatus[category.part]) {
      setAlertMessage('아직 투표하지 않은 항목입니다.\n투표 페이지로 이동하시겠습니까?');
      setOnConfirmAction(() => () => {
        router.push(category.voteUrl);
      });
      setAlertOpen(true);
      return;
    }
    router.push(category.resultUrl);
  };

  return (
    <div className="grid max-h-[85dvh] w-[60dvw] grid-cols-1 gap-10 whitespace-nowrap md:my-5 md:w-[80dvw] md:grid-cols-2 md:gap-10 xl:w-250 xl:gap-20">
      {filteredCategories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
          {/* 카테고리 */}
          <div className="border-foreground mb-2 w-full rounded-lg border-2 py-10 text-center text-lg font-medium md:px-[5vw] md:py-[8vw] xl:px-12.5 xl:py-24 xl:text-xl">
            {category.name}
          </div>

          {/* 버튼 */}
          <div className="flex w-full flex-col gap-2">
            <button
              onClick={() => handleVoteClick(category)}
              className="border-foreground w-full cursor-pointer rounded-lg border-2 py-2 text-center xl:py-2.5 xl:text-xl"
            >
              투표하기
            </button>
            <button
              onClick={() => handleResultClick(category)}
              className="border-foreground w-full cursor-pointer rounded-lg border-2 py-2 text-center xl:py-2.5 xl:text-lg"
            >
              결과보기
            </button>
          </div>
        </div>
      ))}

      {alertOpen && (
        <Alert
          message={alertMessage}
          onConfirm={() => {
            onConfirmAction();
            setAlertOpen(false);
          }}
          onCancel={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
}
