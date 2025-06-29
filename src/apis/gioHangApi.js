import api from './axios';

export const getGioHang = (gioHangId) => {
  return api.get(`/gio-hang/${gioHangId}`);
};

export const themVaoGio = (gioHangId, sanPhamChiTietId) => {
  return api.post(`/gio-hang/them`, null, {
    params: { gioHangId, sanPhamChiTietId }
  });
};

export const capNhatSoLuong = (gioHangId, sanPhamChiTietId, soLuongMoi) => {
  return api.put(`/gio-hang/cap-nhat-so-luong`, null, {
    params: { gioHangId, sanPhamChiTietId, soLuongMoi }
  });
};

export const xoaSanPham = (gioHangId, sanPhamChiTietId) => {
  return api.delete(`/gio-hang/xoa`, {
    params: { gioHangId, sanPhamChiTietId }
  });
};

export const xoaHetGio = (gioHangId) => {
  return api.delete(`/gio-hang/xoa-het`, {
    params: { gioHangId }
  });
};
