import api from './api';
import { saveToken, removeToken } from './storage';

export const signup = async (data) => {
  const res = await api.post('/auth/signup', data);
  if (res.data.token) await saveToken(res.data.token);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post('/auth/login', data);
  if (res.data.token) await saveToken(res.data.token);
  return res.data;
};

export const logout = async () => {
  await removeToken();
};

export const getProfile = async (token) => {
  const res = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
