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
