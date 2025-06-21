import { defineStore } from 'pinia';
import {
  getGioHang,
  themVaoGio,
  capNhatSoLuong,
  xoaSanPham,
  xoaHetGio
} from '../apis/gioHangApi';
import { thanhToanOnline } from '../apis/thanhToanApi';

export const useGioHangStore = defineStore('gioHang', {
  state: () => ({
    gioHangId: null,
    items: [],
  }),
  actions: {
    async fetchItems() {
      try {
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
        const res = await getGioHang(this.gioHangId);
        this.items = res.data;
      } catch (e) {
        console.error("Lỗi fetch giỏ hàng:", e);
      }
    },

    async themSP(spctId) {
      await themVaoGio(this.gioHangId, spctId);
      await this.fetchItems();
    },

    async updateQuantity(spctId, soLuong) {
      await capNhatSoLuong(this.gioHangId, spctId, soLuong);
      await this.fetchItems();
    },

    async removeItem(spctId) {
      await xoaSanPham(this.gioHangId, spctId);
      await this.fetchItems();
    },

    async clearCart() {
      await xoaHetGio(this.gioHangId);
      this.items = [];
    },

    // MỚI: action thanh toán online
    /**
     * 
     * @param {Object} thanhToanRequest Dữ liệu gửi lên backend gồm:
     *   - serialIds: Array<number>
     *   - thongTinKhachHang: {hoTen: string, soDienThoai: string, ...}
     *   - phuongThucThanhToan: string (TIEN_MAT, THANH_TOAN_ONLINE)
     * @returns 
     */
    async thanhToanOnline(thanhToanRequest) {
      try {
        const res = await thanhToanOnline(thanhToanRequest);
        // Xóa giỏ hàng cục bộ sau khi thanh toán thành công
        await this.clearCart();
        return res.data; // Thường là hóa đơn trả về
      } catch (e) {
        console.error("Lỗi thanh toán:", e);
        throw e;
      }
    }
  }
});
