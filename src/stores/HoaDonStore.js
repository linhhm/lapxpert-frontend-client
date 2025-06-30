// src/stores/hoaDonStore.js
import { defineStore } from 'pinia';
import { getHoaDonTheoMa, huyHoaDon  } from '../apis/hoaDonApi';

export const useHoaDonStore = defineStore('hoaDon', {
    state: () => ({
        hoaDon: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchHoaDon(maHoaDon) {
            this.loading = true;
            this.error = null;
            try {
                const res = await getHoaDonTheoMa(maHoaDon);
                this.hoaDon = res.data;
            } catch (err) {
                this.error = 'Không thể tải hóa đơn';
                console.error('Lỗi:', err);
            } finally {
                this.loading = false;
            }
        },
        async huyDonHang(maHoaDon) {
            this.loading = true;
            try {
                await huyHoaDon(maHoaDon);
                // Gọi lại để lấy trạng thái mới sau khi hủy
                await this.fetchHoaDon(maHoaDon);
            } catch (err) {
                console.error('Lỗi khi hủy đơn:', err);
                throw err;
            } finally {
                this.loading = false;
            }
        },
        clearHoaDon() {
            this.hoaDon = null;
        }
    }
});
