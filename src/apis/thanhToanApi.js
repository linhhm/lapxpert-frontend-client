import api from './axios';

export const thanhToanOnline = (data) => {
  return api.post('/v1thanh-toan/online', data);
};
