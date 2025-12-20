import ky from 'ky';

export const api = ky.create({
  prefixUrl: 'http://144.24.71.208:8080',
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

export const authApi = {
  signUp: (data: SignUpRequest) => api.post('api/auth/signup', { json: data }),
};
