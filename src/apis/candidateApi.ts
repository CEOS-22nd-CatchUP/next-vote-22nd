import { api } from './api';

export const candidateApi = {
  getPartCandidates: () => api.get('api/candidates/parts').json<PartCandidate[]>(),
  getTeamCandidates: () => api.get('api/candidates/teams').json<TeamCandidate[]>(),
};
