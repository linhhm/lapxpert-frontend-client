import api from '../apis/axios';

export const thanhToanOnline = (gioHangId, data) => {
  return api.post(`/thanh-toan/online?gioHangId=${gioHangId}`, data);
};

export const laySerialTamThoi = (sanPhamChiTietId, soLuong) => {
  return api.get(`/thanh-toan/serials`, {
    params: {
      sanPhamChiTietId,
      soLuong
    }
  });
};

