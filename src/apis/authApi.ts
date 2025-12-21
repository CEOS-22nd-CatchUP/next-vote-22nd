import { api } from './api';

export const authApi = {
  signUp: (data: any) => api.post('api/auth/signup', { json: data }),
  // 로그인 요청 추가
  login: (data: any) => api.post('api/auth/login', { json: data }).json<LoginResponse>(),
  // 유저 정보
  getUserInfo: () => api.get('api/members/me').json<UserInfoResponse>(),
};
