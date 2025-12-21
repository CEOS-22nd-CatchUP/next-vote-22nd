import ky from 'ky';

export const api = ky.create({
  prefixUrl: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('accessToken');

        // 로그인/회원가입 요청에는 토큰 제외
        if (token && !request.url.includes('/api/auth/login') && !request.url.includes('/api/auth/signup')) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export interface SignUpRequest {
  loginId: string;
  password?: string;
  email: string;
  realName: string;
  part: 'FRONTEND' | 'BACKEND';
  team: 'STORIX' | 'Modelly' | 'CatchUp' | 'Menual' | 'DiggIndie';
  isPartLeadCandidate: boolean;
}

export interface LoginResponse {
  accessToken: string;
}

export interface UserInfoResponse {
  id: number;
  name: string;
  team: string;
  part: string;
  hasVotedForTeam: boolean;
  hasVotedForPartLead: boolean;
}

export const authApi = {
  signUp: (data: any) => api.post('api/auth/signup', { json: data }),
  // 로그인 요청 추가
  login: (data: any) => api.post('api/auth/login', { json: data }).json<LoginResponse>(),
  // 유저 정보
  getUserInfo: () => api.get('api/members/me').json<UserInfoResponse>(),
};
