import { api } from './api';
import type { PartCandidate, TeamCandidate } from '@/types/candidate';

export const candidateApi = {
  getPartCandidates: () => api.get('api/candidates/parts').json<PartCandidate[]>(),
  getTeamCandidates: () => api.get('api/candidates/teams').json<TeamCandidate[]>(),
};
