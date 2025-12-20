import ky from 'ky';

export const api = ky.create({
  prefixUrl: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export interface SignUpRequest {
  loginId: string;
  password?: string;
  email: string;
  realName: string;
  part: 'FRONTEND' | 'BACKEND';
  team: 'STORIX' | 'Modelly' | 'CatchUp' | 'Menual' | 'DiggIdie';
  isPartLeadCandidate: boolean;
}

export interface LoginResponse {
  accessToken: string;
}

export const authApi = {
  signUp: (data: any) => api.post('api/auth/signup', { json: data }),
  // 로그인 요청 추가
  login: (data: any) => api.post('api/auth/login', { json: data }).json<LoginResponse>(),
};
