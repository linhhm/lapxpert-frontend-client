import { defineStore } from 'pinia';
import {
    getGioHang,
    themVaoGio,
    capNhatSoLuong,
    xoaSanPham,
    xoaHetGio,
    taoGioHangMoi
} from '../apis/gioHangApi';

export const useGioHangStore = defineStore('gioHang', {
    state: () => ({
        gioHangId: null,
        items: [],
    }),
    actions: {
        async taoGioHangMoi() {
            try {
                const res = await taoGioHangMoi();  // Gọi API tạo giỏ hàng mới
                this.gioHangId = res.data;  // Lưu ID giỏ hàng vào state
                localStorage.setItem('gioHangId', this.gioHangId.toString());  // Lưu giỏ hàng vào localStorage
                console.log('Giỏ hàng mới đã được tạo:', this.gioHangId);
            } catch (err) {
                console.error('Không thể tạo giỏ hàng mới:', err);
                alert('Không thể tạo giỏ hàng mới.');
            }
        },
        async fetchItems() {
            try {
                await this.getOrCreateGioHangId();
                const res = await getGioHang(this.gioHangId);
                this.items = res.data;
            } catch (e) {
                console.error("Lỗi khi fetch giỏ hàng:", e);
                alert("Không thể tải giỏ hàng. Vui lòng thử lại!");
            }
        },
        
        async themSP(spctId) {
            try {
                await this.getOrCreateGioHangId();  // Đảm bảo rằng gioHangId đã được tạo hoặc lấy đúng cách
                await themVaoGio(this.gioHangId, spctId);  // Thêm sản phẩm vào giỏ
                await this.fetchItems();  // Cập nhật danh sách sản phẩm trong giỏ hàng
            } catch (e) {
                console.error("Lỗi khi thêm sản phẩm vào giỏ:", e);
                alert("Có lỗi khi thêm sản phẩm vào giỏ hàng.");
            }
        },

        async updateQuantity(spctId, soLuong) {
            await this.getOrCreateGioHangId();
            await capNhatSoLuong(this.gioHangId, spctId, soLuong);
            await this.fetchItems();
        },

        async removeItem(spctId) {
            await this.getOrCreateGioHangId();
            await xoaSanPham(this.gioHangId, spctId);
            await this.fetchItems();
        },

        async clearCart() {
            await this.getOrCreateGioHangId();
            await xoaHetGio(this.gioHangId);
            this.items = [];
        }
    }
});
