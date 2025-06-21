import { defineStore } from 'pinia';
import {
    getGioHang,
    themVaoGio,
    capNhatSoLuong,
    xoaSanPham,
    xoaHetGio
} from '../apis/gioHangApi';


export const useGioHangStore = defineStore('gioHang', {
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
                // Tạo hoặc lấy ID từ localStorage
                if (!this.gioHangId) {
                    const storedId = localStorage.getItem('gioHangId');
                    if (storedId && !isNaN(Number(storedId))) {
                        this.gioHangId = Number(storedId);
                    } else {
                        const newId = Date.now(); // Số nguyên long giả lập
                        this.gioHangId = newId;
                        localStorage.setItem('gioHangId', newId.toString());
                    }
                }
                const res = await getGioHang(this.gioHangId);
                this.items = res.data; // danh sách chi tiết giỏ hàng
            } catch (e) {
                console.error("Lỗi fetch giỏ hàng:", e);
            }
        },
        async themSP(spctId) {
            await themVaoGio(this.gioHangId, spctId); // ✅ this.gioHangId phải có giá trị
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
        }
    }
});
