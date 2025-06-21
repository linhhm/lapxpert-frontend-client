import { defineStore } from 'pinia';
import {
  getGioHang,
  themVaoGio,
  capNhatSoLuong,
  xoaSanPham,
  xoaHetGio
} from '../apis/gioHangApi';
import { thanhToanOnline } from '../apis/thanhToanApi';

export const useThanhToanStore = defineStore('thanhToan', {
  state: () => ({
    gioHangId: null,
    items: [],
  }),
  actions: {
    getGioHangId() {
      if (!this.gioHangId) {
        const storedId = localStorage.getItem('gioHangId');
        if (storedId && !isNaN(Number(storedId))) {
          this.gioHangId = Number(storedId);
        } else {
          const newId = Date.now();
          this.gioHangId = newId;
          localStorage.setItem('gioHangId', newId.toString());
        }
      }
      return this.gioHangId;
    },

    async fetchItems() {
      try {
        const id = this.getGioHangId();
        const res = await getGioHang(id);
        this.items = res.data;
      } catch (e) {
        console.error("Lỗi fetch giỏ hàng:", e);
      }
    },

    async themSP(spctId) {
      await themVaoGio(this.getGioHangId(), spctId);
      await this.fetchItems();
    },

    async updateQuantity(spctId, soLuong) {
      await capNhatSoLuong(this.getGioHangId(), spctId, soLuong);
      await this.fetchItems();
    },

    async removeItem(spctId) {
      await xoaSanPham(this.getGioHangId(), spctId);
      await this.fetchItems();
    },

    async clearCart() {
      await xoaHetGio(this.getGioHangId());
      this.items = [];
    },

   async thanhToanOnline(thanhToanRequest) {
  try {
    const gioHangId = this.getGioHangId();
    if (!gioHangId) throw new Error("Giỏ hàng không hợp lệ");

    const res = await thanhToanOnline(gioHangId, thanhToanRequest);
    await this.clearCart();
    // Có thể xóa localStorage nếu muốn reset hoàn toàn giỏ hàng
    localStorage.removeItem('gioHangId');
    this.gioHangId = null;

    return res.data;
  } catch (e) {
    console.error("Lỗi thanh toán:", e);
    throw e;
  }
}
  }
});
