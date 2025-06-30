import api from './axios';

export const getHoaDonTheoMa = (maHoaDon) => {
  return api.get(`/hoa-don/${maHoaDon}`);
};
export const huyHoaDon = (maHoaDon) => {
  return api.put(`/hoa-don/huy/${maHoaDon}`);
};