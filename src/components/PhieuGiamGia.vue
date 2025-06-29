<template>
  <section class="py-10 px-6 bg-gray-50">
    <h2 class="text-3xl font-bold text-center text-blue-900">🎁 Danh sách Voucher</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div
        v-for="voucher in previewVouchers"
        :key="voucher.code"
        class="p-4 bg-white shadow-lg rounded-xl border border-blue-100 relative hover:shadow-xl transition"
      >
        <h3 class="text-xl font-semibold text-blue-700">{{ voucher.name }}</h3>
        <p class="text-lg font-bold text-red-500">Giảm {{ voucher.discount }}</p>
        <p class="text-sm text-gray-600">Điều kiện: {{ voucher.condition }}</p>
        <p
          class="text-sm"
          :class="isExpiringSoon(voucher.expiry) ? 'text-red-500 font-semibold' : 'text-gray-600'"
        >
          ⏳ Hạn sử dụng: {{ voucher.expiry }}
        </p>
        <div class="mt-4 flex justify-between items-center">
          <span class="bg-gray-200 text-gray-700 px-3 py-1 rounded font-mono">{{ voucher.code }}</span>
          <button
            @click="copyCode(voucher.code)"
            class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            {{ copiedCode === voucher.code ? "✔ Đã sao chép" : "Sao chép" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Xem tất cả -->
    <div class="mt-10 text-center">
      <router-link
        to="/tatCaPhieuGiamGia"
        class="text-blue-600 font-semibold text-lg hover:underline hover:text-blue-800 transition"
      >
        Xem tất cả voucher &rarr;
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      copiedCode: null,
      vouchers: [
        { name: "Giảm 50K", discount: "50.000 VND", condition: "Đơn hàng từ 500K", expiry: "2025-04-30", code: "GIAM50K" },
        { name: "Giảm 10%", discount: "10%", condition: "Đơn hàng từ 1 triệu", expiry: "2025-05-15", code: "GIAM10" },
        { name: "Giảm 100K", discount: "100.000 VND", condition: "Đơn hàng từ 2 triệu", expiry: "2025-05-31", code: "GIAM100K" },
        { name: "Giảm 200K", discount: "200.000 VND", condition: "Đơn hàng từ 3 triệu", expiry: "2025-06-10", code: "GIAM200K" },
        { name: "Mua 1 Tặng 1", discount: "Tặng thêm sản phẩm", condition: "Áp dụng sản phẩm chọn lọc", expiry: "2025-06-20", code: "MUA1TANG1" }
      ],
    };
  },
  computed: {
    previewVouchers() {
      return this.vouchers.slice(0, 4); // Hiển thị 4 voucher
    },
  },
  methods: {
    copyCode(code) {
      navigator.clipboard.writeText(code);
      this.copiedCode = code;
      setTimeout(() => {
        this.copiedCode = null;
      }, 2000);
    },
    isExpiringSoon(expiry) {
      const today = new Date();
      const end = new Date(expiry);
      const diff = (end - today) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    },
  },
};
</script>
