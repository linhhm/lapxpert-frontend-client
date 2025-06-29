import { defineStore } from 'pinia';
import { getSanPhamOnline, getKhoangGiaSanPham } from '../apis/sanPhamApi';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    minPrice: 0,
    maxPrice: 60000000
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await getSanPhamOnline();
        this.products = res.data;
      } catch (err) {
        console.error('Lỗi fetchProducts:', err);
      }
    },
    async fetchKhoangGia() {
      try {
        const res = await getKhoangGiaSanPham();
        if (res.data.length > 0) {
          const { min, max } = res.data[0];
          this.minPrice = min;
          this.maxPrice = max;
        }
      } catch (err) {
        console.error('Lỗi fetchKhoangGia:', err);
      }
    }
  }
});