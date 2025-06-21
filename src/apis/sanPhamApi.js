import api from '../apis/axios';

export const getSanPhamOnline = () => {
  return api.get('/san-pham-online');
};
export const getKhoangGiaSanPham = () => {
  return api.get('/san-pham-online/khoang-gia');
};