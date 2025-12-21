// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Link from 'next/link';
// // import { partNames } from '@/constants/partCategories';
// // import { candidateApi } from '@/apis/candidateApi';
// // import { voteApi } from '@/apis/voteApi';

// // interface Props {
// //   part: string;
// // }

// // interface Candidate {
// //   name: string;
// //   count: number;
// // }

// // export default function PartVoteResultPage({ part }: Props) {
// //   const [candidateList, setCandidateList] = useState<Candidate[]>([]);
// //   const [highestCount, setHighestCount] = useState<number>(0);

// //   useEffect(() => {
// //     const fetchResults = async () => {
// //       try {
// //         if (part === 'demo') {
// //           const data = await voteApi.getVoteResults();
// //           const list = data.teamVoteResults.map((result) => ({
// //             name: result.targetName,
// //             count: result.voteCount,
// //           }));
// //           list.sort((a, b) => b.count - a.count);
// //           setCandidateList(list);
// //           setHighestCount(list[0]?.count || 0);
// //         } else {
// //           // 파트장 후보 필터링
// //           const [allCandidates, voteResults] = await Promise.all([
// //             candidateApi.getPartCandidates(),
// //             voteApi.getVoteResults(),
// //           ]);

// //           // 현재 part 후보만 필터링
// //           const filteredCandidates = allCandidates.filter((c) => {
// //             if (part === 'front') return c.part === 'FRONTEND';
// //             if (part === 'back') return c.part === 'BACKEND';
// //             return false;
// //           });

// //           // 후보와 투표 결과 매칭
// //           const list = filteredCandidates.map((c) => {
// //             const result = voteResults.partLeadVoteResults.find((r) => r.targetName === c.name);
// //             return {
// //               name: c.name,
// //               count: result?.voteCount || 0,
// //             };
// //           });

// //           list.sort((a, b) => b.count - a.count);
// //           setCandidateList(list);
// //           setHighestCount(list[0]?.count || 0);
// //         }
// //       } catch (err) {
// //         console.error('투표 결과 불러오기 실패', err);
// //       }
// //     };

// //     fetchResults();
// //   }, [part]);

// //   return (
// //     <div className="flex flex-col">
// //       <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 결과보기</h1>

// //       <div className={`mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
// //         {candidateList.map(({ name, count }) => (
// //           <div
// //             key={name}
// //             className={`border-foreground flex items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium whitespace-nowrap ${
// //               count === highestCount ? 'bg-yellow-400' : ''
// //             }`}
// //           >
// //             {name} ({count})
// //           </div>
// //         ))}
// //       </div>

// //       <div className="text-gray-1 flex flex-col items-end gap-0.5">
// //         <Link href="/">홈 페이지로 &gt;&gt;</Link>
// //         <Link href="/vote">투표 메인 페이지로 &gt;&gt;</Link>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuthStore } from '@/store/useAuthStore';
// import { partNames } from '@/constants/partCategories';

// // 임시 데이터
// const candidates = {
//   front: [
//     { name: '김윤성', count: 1 },
//     { name: '백승선', count: 2 },
//     { name: '손주완', count: 3 },
//     { name: '신용섭', count: 4 },
//     { name: '이채연', count: 5 },
//     { name: '장자윤', count: 6 },
//     { name: '정성훈', count: 7 },
//     { name: '정윤지', count: 8 },
//     { name: '조성아', count: 9 },
//     { name: '최무헌', count: 10 },
//   ],
//   back: [
//     { name: '1', count: 10 },
//     { name: '2', count: 9 },
//     { name: '3', count: 8 },
//     { name: '4', count: 7 },
//     { name: '5', count: 6 },
//     { name: '6', count: 5 },
//     { name: '7', count: 4 },
//     { name: '8', count: 3 },
//     { name: '9', count: 2 },
//     { name: '10', count: 1 },
//   ],
//   demo: [
//     { name: 'CatchUp', count: 1 },
//     { name: 'DiggIndie', count: 1 },
//     { name: 'Menual', count: 1 },
//     { name: 'Modelly', count: 1 },
//     { name: 'STORIX', count: 1 },
//   ],
// };

// interface PartVoteResultPageProps {
//   params: { part: string };
// }

// export default function PartVoteResultPage({ params }: PartVoteResultPageProps) {
//   const router = useRouter();
//   const { isLoggedIn } = useAuthStore();
//   const { part } = params;

//   // **로그아웃 시 /vote로 리다이렉트**
//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push('/vote');
//     }
//   }, [isLoggedIn, router]);

//   const candidateList = (candidates[part as keyof typeof candidates] || []).sort((a, b) => b.count - a.count);

//   const highestCount = candidateList[0]?.count || 0;

//   return (
//     <div className="flex flex-col">
//       <h1 className="mb-10 text-center text-2xl font-bold">{partNames[part] || part} 결과보기</h1>

//       <div className={`mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
//         {candidateList.map(({ name, count }) => (
//           <div
//             key={name}
//             className={`border-foreground flex items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium whitespace-nowrap ${
//               count === highestCount ? 'bg-yellow-400' : ''
//             }`}
//           >
//             {name} ({count})
//           </div>
//         ))}
//       </div>

//       <div className="text-gray-1 flex flex-col items-end gap-0.5">
//         <Link href="/">홈 페이지로 &gt;&gt;</Link>
//         <Link href="/vote">투표 메인 페이지로 &gt;&gt;</Link>
//       </div>
//     </div>
//   );
// }

import PartVoteResultClient from './components/PartVoteResultClient';

interface PageProps {
  params: { part: string };
}

export default function PartVoteResultPage({ params }: PageProps) {
  return <PartVoteResultClient part={params.part} />;
}
