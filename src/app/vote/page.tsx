'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { voteCategories } from '@/constants/partCategories';
import Alert from '@/components/vote/Alert';
import { authApi } from 'src/apis/api';

export default function VoteMainPage() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPart, setUserPart] = useState<'FRONTEND' | 'BACKEND' | null>(null);
  // const [votedStatus, setVotedStatus] = useState<{ team: boolean; partLead: boolean }>({
  //   team: false,
  //   partLead: false,
  // });
  const [isLoading, setIsLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});

  // 유저 파트에 따른 파트장(FE, BE) 카테고리 필터링
  const filteredCategories = voteCategories.filter((category) => {
    // 로그인 안 한 경우 -> 모든 파트 표시
    if (!isLoggedIn) return true;

    // 로그인 한 경우
    if (category.part === 'demo') return true;

    if (userPart === 'FRONTEND' && category.part === 'front') return true;
    if (userPart === 'BACKEND' && category.part === 'back') return true;

    return false;
  });

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

    //   const votedKey = category.part === 'front' ? 'partLead' : 'team';

    //   if (!votedStatus[votedKey]) {
    //     setAlertMessage('아직 투표하지 않은 항목입니다.\n투표 페이지로 이동하시겠습니까?');
    //     setOnConfirmAction(() => () => {
    //       router.push(category.voteUrl);
    //     });
    // setAlertOpen(true);
    //     return;
    //   }
    router.push(category.resultUrl);
  };

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      try {
        const userInfo = await authApi.getUserInfo();

        setIsLoggedIn(true);

        if (userInfo.part === 'FRONT' || userInfo.part === 'FRONTEND') {
          setUserPart('FRONTEND');
        } else if (userInfo.part === 'BACK' || userInfo.part === 'BACKEND') {
          setUserPart('BACKEND');
        }
      } catch (err) {
        console.error('유저 정보 로딩 실패', err);
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // // 투표 여부 가져오기
  // useEffect(() => {
  //   if (!isLoggedIn) return;

  //   const fetchVotedStatus = async () => {
  //     try {
  //       const memberInfo = await memberApi.getUserInfo();
  //       setVotedStatus({
  //         team: memberInfo.hasVotedForTeam,
  //         partLead: memberInfo.hasVotedForPartLead,
  //       });
  //     } catch (err) {
  //       console.error('투표 여부 불러오기 실패', err);
  //     }
  //   };

  //   fetchVotedStatus();
  // }, [isLoggedIn]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // 로그인 여부에 따른 grid-cols 동적 설정 (투표 카테고리 렌더링)
  const gridColsClass = isLoggedIn ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

  return (
    <div
      className={`grid max-h-[85dvh] w-[60dvw] ${gridColsClass} gap-10 whitespace-nowrap md:my-5 md:w-[80dvw] md:gap-10 xl:w-250 xl:gap-20`}
    >
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
