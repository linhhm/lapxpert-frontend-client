<template>
    <div class="p-6 bg-gradient-to-b from-blue-200 via-purple-200 to-white min-h-screen">
        <h1 class="text-4xl font-bold text-center text-blue-900 mb-8">Thanh toán</h1>

        <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <!-- Tabs -->
            <div class="flex border-b border-blue-300 mb-6">
                <button class="px-4 py-2 font-semibold text-blue-800 border-b-4 border-blue-500" disabled>
                    Thông tin hóa đơn
                </button>
                <button class="px-4 py-2 text-gray-500">Thanh toán</button>
            </div>

            <!-- Danh sách sản phẩm -->
            <div class="mb-6">
                <h2 class="text-xl font-semibold text-blue-900 mb-4">Sản phẩm</h2>

                <div v-for="item in selectedItems" :key="item.sanPhamChiTiet.id"
                    class="border p-4 rounded-md bg-blue-50 mb-3">
                    <div class="flex justify-between text-sm font-medium mb-1">
                        <div>{{ item.sanPhamChiTiet.tenSanPham }}</div>
                        <div class="text-blue-700">
                            {{ item.sanPhamChiTiet.maSanPham }} | {{ item.sanPhamChiTiet.moTaMauSac }}
                        </div>
                        <div class="text-blue-900 font-bold">
                            {{ formatPrice(item.giaTaiThoiDiemThem) }}
                        </div>
                    </div>

                    <!-- Seri -->
                    <div v-if="item.serialNumbers?.length" class="text-xs text-gray-600 mt-1">
                        Seri: {{ item.serialNumbers.join(', ') }}
                    </div>

                    <div class="flex justify-between mt-2 text-sm">
                        <div>Số lượng: <strong>{{ item.soLuong }}</strong></div>
                        <div>
                            Tổng: <span class="text-blue-900 font-semibold">
                                {{ formatPrice(item.giaTaiThoiDiemThem * item.soLuong) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Tổng toàn bộ -->
                <div class="text-right font-bold text-lg text-indigo-900 mt-4">
                    Tổng cộng:
                    {{
                        formatPrice(
                            selectedItems.reduce(
                                (sum, item) => sum + item.giaTaiThoiDiemThem * item.soLuong,
                    0
                    )
                    )
                    }}
                </div>
            </div>
            <!-- Thông tin nhận hàng -->
            <div>
                <h2 class="text-xl font-semibold text-blue-900 mb-4">Thông tin nhận hàng</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-blue-800 mb-1">Họ và tên</label>
                        <input type="text"
                            class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nguyễn Tiến Duy" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-blue-800 mb-1">Số điện thoại</label>
                        <input type="text"
                            class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="0348549656" />
                    </div>
                </div>

                <!-- Địa chỉ và thêm mới -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-blue-800 mb-1">Địa chỉ nhận hàng</label>
                    <div v-if="!showAddressForm"
                        class="flex justify-between items-center bg-blue-50 px-4 py-3 rounded-md">
                        <p class="text-sm text-blue-700">
                            Số 39, xã An Bình, huyện Văn Yên, tỉnh Yên Bái
                            <span class="text-xs text-red-500 ml-2">(Địa chỉ mặc định)</span>
                        </p>
                        <button @click="showAddressForm = true"
                            class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm">
                            Thêm mới
                        </button>
                    </div>

                    <div v-else class="space-y-4">
                        <input type="text"
                            class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nhập địa chỉ cụ thể (VD: Số nhà, tên đường...)" />
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select class="w-full border border-blue-300 rounded-md px-3 py-2">
                                <option>Chọn Tỉnh / Thành phố</option>
                                <option>Hà Nội</option>
                                <option>TP. Hồ Chí Minh</option>
                            </select>
                            <select class="w-full border border-blue-300 rounded-md px-3 py-2">
                                <option>Chọn Quận / Huyện</option>
                                <option>Quận 1</option>
                                <option>Huyện Văn Yên</option>
                            </select>
                            <select class="w-full border border-blue-300 rounded-md px-3 py-2">
                                <option>Chọn Phường / Xã</option>
                                <option>Phường Nguyễn Du</option>
                                <option>Xã An Bình</option>
                            </select>
                        </div>
                        <div class="text-right">
                            <button @click="showAddressForm = false"
                                class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md text-sm">
                                Chọn lại địa chỉ mặc định
                            </button>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button @click="huyThanhToan"
                        class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md">
                        Hủy
                    </button>
                    <button class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md">
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useGioHangStore } from '../stores/gioHangStore';

export default {
  name: 'ThanhToanView',
  data() {
    return {
      selectedIds: [],
      selectedItems: [],
      showAddressForm: false
    };
  },
  computed: {
    gioHangStore() {
      return useGioHangStore();
    }
  },
  methods: {
    formatPrice(v) {
      return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    async loadSelectedItems() {
      await this.gioHangStore.fetchItems(); // Load lại giỏ hàng từ BE
      const allItems = this.gioHangStore.items;
      this.selectedItems = allItems.filter(item =>
        this.selectedIds.includes(item.sanPhamChiTiet.id)
      );
    },
    huyThanhToan() {
      this.$router.push({ name: 'GioHang' }); // quay về trang giỏ hàng
    }
  },
  async created() {
    const idsStr = this.$route.query.sanPhamIds;
    this.selectedIds = idsStr ? idsStr.split(',').map(id => Number(id)) : [];
    await this.loadSelectedItems();
  }
};
</script>
