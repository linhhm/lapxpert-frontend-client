import { defineStore } from 'pinia';
import { getChiTietSanPhamBySanPhamId } from '../apis/chiTietSanPhamApi';

export const useChiTietSanPhamStore = defineStore('chiTietSanPham', {
  state: () => ({
    danhSachChiTiet: [],
  }),
  actions: {
    async fetchChiTietBySanPhamId(sanPhamId) {
      try {
        const res = await getChiTietSanPhamBySanPhamId(sanPhamId);
        this.danhSachChiTiet = res.data;
      } catch (error) {
        console.error('Lỗi fetchChiTietBySanPhamId:', error);
      }
    },
    reset() {
      this.danhSachChiTiet = [];
    }
  }
});
