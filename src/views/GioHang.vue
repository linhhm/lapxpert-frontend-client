<template>
  <div class="container mx-auto p-6 bg-blue-50 min-h-screen">
    <h1 class="text-3xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
      Giỏ Hàng
    </h1>

    <!-- Giỏ hàng trống -->
    <div v-if="cartItems.length === 0" class="text-center text-lg text-indigo-400">
      <p>Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.</p>
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-else>
      <div class="bg-white p-6 rounded-xl shadow-md mb-8">
        <div class="grid grid-cols-6 gap-4 border-b border-indigo-200 pb-3 text-indigo-600 font-semibold select-none">
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
              class="form-checkbox h-5 w-5 text-indigo-500 rounded" />
            <span>Chọn tất cả</span>
          </div>
          <div>Sản phẩm</div>
          <div>Giá</div>
          <div>Số lượng</div>
          <div>Tổng</div>
          <div>Hành động</div>
        </div>

        <div v-for="item in cartItems" :key="item.sanPhamChiTiet.id"
          class="grid grid-cols-6 gap-4 items-center border-b border-indigo-100 py-4 hover:bg-indigo-50 rounded-md transition">
          <!-- Checkbox -->
          <div>
            <input type="checkbox" v-model="selectedItems" :value="item.sanPhamChiTiet.id"
              class="form-checkbox h-5 w-5 text-indigo-500 rounded" />
          </div>

          <!-- Hình ảnh + tên + mô tả -->
          <div class="flex items-center gap-3">
            <img :src="getImageUrl(item.sanPhamChiTiet.hinhAnh)" alt="product image"
              class="w-16 h-16 object-cover rounded-lg shadow-sm border border-indigo-200" />
            <div>
              <p class="font-semibold text-indigo-700 text-base">{{ item.sanPhamChiTiet.sanPham.tenSanPham }}</p>
              <p class="text-indigo-400 text-xs">
                RAM: {{ item.sanPhamChiTiet.ram.moTaRam }} |
                CPU: {{ item.sanPhamChiTiet.cpu.moTaCpu }} |
                Màu: {{ item.sanPhamChiTiet.mauSac.moTaMauSac }}
              </p>

              <div v-if="item.serialNumbers && item.serialNumbers.length > 0" class="text-xs text-indigo-600 mt-1">
                Seri: {{ item.serialNumbers.join(', ') }}
              </div>
            </div>
          </div>

          <!-- Giá -->
          <div>
            <div class="text-indigo-700 font-semibold" v-if="item.giaTaiThoiDiemThem < item.sanPhamChiTiet.giaBan">
              {{ formatPrice(item.giaTaiThoiDiemThem) }}
              <p class="text-sm text-gray-400 line-through ml-1">
                {{ formatPrice(item.sanPhamChiTiet.giaBan) }}
              </p>
            </div>
            <div class="text-indigo-700 font-semibold" v-else>
              {{ formatPrice(item.giaTaiThoiDiemThem) }}
            </div>
          </div>
          <!-- Số lượng -->
          <div class="flex items-center gap-3">
            <button @click="updateQuantity(item.sanPhamChiTiet.id, item.soLuong - 1)"
              class="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition disabled:opacity-50"
              :disabled="item.soLuong <= 1">−</button>
            <span class="font-semibold text-indigo-700">{{ item.soLuong }}</span>
            <button @click="updateQuantity(item.sanPhamChiTiet.id, item.soLuong + 1)"
              class="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition disabled:opacity-50"
              :disabled="item.soLuong >= item.sanPhamChiTiet.soLuongTon">+</button>
          </div>

          <!-- Tổng -->
          <div class="text-indigo-700 font-semibold">
            {{ formatPrice(item.giaTaiThoiDiemThem * item.soLuong) }}
          </div>

          <!-- Xóa -->
          <div class="flex justify-center">
            <button @click="removeItem(item.sanPhamChiTiet.id)"
              class="text-red-500 hover:text-red-600 transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Tổng tiền và thanh toán -->
      <div
        class="bg-indigo-100 rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div class="text-indigo-800 font-bold text-xl">
          Tổng cộng: <span class="text-indigo-900">{{ formatPrice(totalAmount) }}</span>
        </div>
        <div class="flex gap-4">
          <button @click="clearCart"
            class="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold transition shadow-sm">
            Xóa Giỏ Hàng
          </button>
          <button @click="proceedToCheckout"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-sm">
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGioHangStore } from '../stores/gioHangStore';

export default {
  data() {
    return {
      gioHangStore: useGioHangStore(),
      selectedItems: [],
      selectAll: false,
    };
  },
  computed: {
    cartItems() {
      return this.gioHangStore.items;
    },
    totalAmount() {
      if (this.selectedItems.length === 0) return 0;
      return this.cartItems
        .filter(item => this.selectedItems.includes(item.sanPhamChiTiet.id))
        .reduce((sum, item) => sum + item.giaTaiThoiDiemThem * item.soLuong, 0);
    },
  },
  methods: {
    getImageUrl(imageStr) {
      try {
        const imgs = JSON.parse(imageStr);
        if (!imgs || imgs.length === 0) return '/images/default.jpg';
        if (imgs[0].startsWith('http')) return imgs[0];
        return `http://localhost:8080/images/${imgs[0]}`;
      } catch {
        return '/images/default.jpg';
      }
    },
    formatPrice(v) {
      return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    async updateQuantity(spctId, newQty) {
      const item = this.cartItems.find(i => i.sanPhamChiTiet.id === spctId);
      if (!item) return;

      const maxQuantity = item.sanPhamChiTiet.soLuongTon;

      if (newQty > maxQuantity) {
        alert(`Số lượng vượt quá tồn kho (${maxQuantity} sản phẩm còn lại).`);
        return;
      }

      if (newQty < 1) return;

      await this.gioHangStore.updateQuantity(spctId, newQty);
    },
    removeItem(spctId) {
      this.gioHangStore.removeItem(spctId);
      this.selectedItems = this.selectedItems.filter(id => id !== spctId);
    },
    clearCart() {
      this.gioHangStore.clearCart();
      this.selectedItems = [];
    },
    toggleSelectAll() {
      this.selectedItems = this.selectAll
        ? this.cartItems.map(i => i.sanPhamChiTiet.id)
        : [];
    },
    proceedToCheckout() {
      if (this.selectedItems.length === 0) {
        alert("Bạn chưa chọn sản phẩm nào để thanh toán");
        return;
      }
      // Chuyển trang sang Thanh Toán, truyền id sản phẩm qua query param
      this.$router.push({
        name: 'ThanhToan', // tên route trang thanh toán, bạn đặt sao cũng được
        query: {
          sanPhamIds: this.selectedItems.join(',')
        }
      });
    }
  },
  async mounted() {
    await this.gioHangStore.fetchItems();
    console.log('Cart Items:', this.cartItems);
  },
};
</script>
