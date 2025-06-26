import { defineStore } from 'pinia';
import { thanhToanMuaNgay } from '../apis/thanhToanApi';

export const useMuaNgayStore = defineStore('muaNgay', {
    state: () => ({
        gioHangId: null,
        items: [],
        muaNgaySanPham: null,
        hoaDon: null,
    }),

    actions: {
        setMuaNgaySanPham(spct) {
            this.muaNgaySanPham = spct;
        },
        clearMuaNgaySanPham() {
            this.muaNgaySanPham = null;
        },
        async muaNgay(data) {
            try {
                const res = await thanhToanMuaNgay(data);
                this.hoaDon = res.data;
                return res.data;
            } catch (e) {
                console.error("Lỗi mua ngay:", e);
                throw e;
            }
        }
    }
});
