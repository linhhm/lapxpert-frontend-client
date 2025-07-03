import api from '../apis/axios';

export const getChiTietSanPhamBySanPhamId = (sanPhamId) => {
  return api.get(`/chi-tiet-san-pham/by-san-pham/${sanPhamId}`);
};

export const getSanPhamBaseById = (id) => {
  return api.get(`/chi-tiet-san-pham/${id}`);
};
