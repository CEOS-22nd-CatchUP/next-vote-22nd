interface SignUpRequest {
  loginId: string;
  password?: string;
  email: string;
  realName: string;
  part: 'FRONTEND' | 'BACKEND';
  team: 'STORIX' | 'Modelly' | 'CatchUp' | 'Menual' | 'DiggIndie';
  isPartLeadCandidate: boolean;
}

interface LoginResponse {
  accessToken: string;
}

interface UserInfoResponse {
  id: number;
  name: string;
  team: string;
  part: string;
  hasVotedForTeam: boolean;
  hasVotedForPartLead: boolean;
}
