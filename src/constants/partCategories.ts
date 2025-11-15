export const partNames: Record<string, string> = {
  front: 'FE',
  back: 'BE',
  demo: 'DEMODAY',
};

export const voteCategories = [
  { name: 'FE 파트장', voteUrl: '/vote/front', resultUrl: '/vote/front/result' },
  { name: 'BE 파트장', voteUrl: '/vote/back', resultUrl: '/vote/back/result' },
  { name: '데모데이', voteUrl: '/vote/demo', resultUrl: '/vote/demo/result' },
];
