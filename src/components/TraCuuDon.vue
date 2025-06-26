<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h2 class="text-3xl font-bold text-center text-indigo-700">🔍 Tra cứu đơn hàng</h2>

      <!-- Ô nhập mã đơn -->
      <div class="flex items-center gap-3">
        <input
          v-model="maTraCuu"
          placeholder="Nhập mã hóa đơn (VD: HD999999)"
          class="flex-1 border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
        />
        <button
          @click="traCuuDon"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Tìm
        </button>
      </div>

      <!-- Nếu tìm thấy -->
      <div v-if="daTimThay" class="space-y-5 animate-fade-in">
        <div class="border rounded-xl bg-blue-50 p-4 shadow">
          <p><strong>Mã HĐ:</strong> {{ hoaDon.maHoaDon }}</p>
          <p><strong>Ngày đặt:</strong> {{ formatDate(hoaDon.ngayTao) }}</p>
          <p>
            <strong>Trạng thái:</strong>
            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
              :class="getStatusColor(hoaDon.trangThai)"
            >
              <i class="fas fa-shipping-fast"></i>
              {{ getStatusLabel(hoaDon.trangThai) }}
            </span>
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-indigo-600 mb-2">🛒 Sản phẩm:</h3>
          <ul class="space-y-2">
            <li
              v-for="ct in hoaDon.chiTietHoaDons"
              :key="ct.id"
              class="bg-white border border-purple-200 p-3 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p class="font-semibold text-indigo-800">
                  {{ ct.sanPhamChiTiet.sanPham.tenSanPham }}
                </p>
                <p class="text-sm text-gray-600">
                  SL: {{ ct.soLuong }} | Đơn giá: {{ formatPrice(ct.gia) }}
                </p>
              </div>
              <div class="text-right text-blue-700 font-semibold">
                {{ formatPrice(ct.soLuong * ct.gia) }}
              </div>
            </li>
          </ul>
          <div class="text-right text-indigo-800 text-xl font-bold mt-4">
            Tổng tiền: {{ formatPrice(hoaDon.tongTien) }}
          </div>
        </div>
      </div>

      <!-- Nếu không tìm thấy -->
      <div v-else-if="daTim && !daTimThay" class="text-center text-red-600 font-semibold mt-4">
        Không tìm thấy hóa đơn với mã <strong>{{ maTraCuu }}</strong>.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maTraCuu: '',
      daTim: false,
      daTimThay: false,
      hoaDon: null
    };
  },
  methods: {
    traCuuDon() {
      this.daTim = true;

      // Giả lập dữ liệu (bạn sẽ thay bằng gọi API ở đây)
      if (this.maTraCuu === 'HD999999') {
        this.daTimThay = true;
        this.hoaDon = {
          maHoaDon: 'HD999999',
          ngayTao: '2025-06-22T09:00:00',
          trangThai: 'DANG_GIAO_HANG',
          tongTien: 35000000,
          chiTietHoaDons: [
            {
              id: 1,
              soLuong: 1,
              gia: 15000000,
              sanPhamChiTiet: {
                sanPham: { tenSanPham: 'Laptop Asus Zenbook' }
              }
            },
            {
              id: 2,
              soLuong: 2,
              gia: 10000000,
              sanPhamChiTiet: {
                sanPham: { tenSanPham: 'Màn hình LG 24 inch' }
              }
            }
          ]
        };
      } else {
        this.daTimThay = false;
        this.hoaDon = null;
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString('vi-VN');
    },
    formatPrice(v) {
      return v.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
    },
    getStatusLabel(trangThai) {
      const map = {
        CHO_XAC_NHAN: 'Chờ xác nhận',
        DA_XAC_NHAN: 'Đã xác nhận',
        DANG_XU_LY: 'Đang xử lý',
        CHO_GIAO_HANG: 'Chờ giao hàng',
        DANG_GIAO_HANG: 'Đang giao hàng',
        DA_GIAO_HANG: 'Đã giao hàng',
        HOAN_THANH: 'Hoàn thành',
        DA_HUY: 'Đã hủy'
      };
      return map[trangThai] || trangThai;
    },
    getStatusColor(trangThai) {
      const map = {
        CHO_XAC_NHAN: 'bg-yellow-200 text-yellow-800',
        DA_XAC_NHAN: 'bg-blue-200 text-blue-800',
        DANG_XU_LY: 'bg-purple-200 text-purple-800',
        CHO_GIAO_HANG: 'bg-pink-200 text-pink-800',
        DANG_GIAO_HANG: 'bg-indigo-200 text-indigo-800',
        DA_GIAO_HANG: 'bg-green-200 text-green-800',
        HOAN_THANH: 'bg-emerald-200 text-emerald-800',
        DA_HUY: 'bg-red-200 text-red-800'
      };
      return map[trangThai] || 'bg-gray-200 text-gray-600';
    }
  }
};
</script>

<style scoped>
input::placeholder {
  color: #94a3b8;
}
</style>
