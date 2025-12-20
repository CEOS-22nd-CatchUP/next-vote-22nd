import { api } from './api';
import type { VoteStatus, VoteResults } from '@/types/vote';

export const voteApi = {
  // 투표
  votePart: (targetId: number) => api.post('api/votes/parts', { json: { targetId } }).text(),
  voteTeam: (targetId: number) => api.post('api/votes/teams', { json: { targetId } }).text(),

  // 투표 상태 조회
  getVoteStatus: () => api.get('api/votes/status').json<VoteStatus>(),

  // 투표 결과 조회
  getVoteResults: () => api.get('api/votes/results').json<VoteResults>(),
};
