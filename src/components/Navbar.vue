<template>
  <nav class="bg-white shadow-lg px-6 md:px-12 py-4 rounded-b-2xl flex items-center justify-between sticky top-0 z-50">
    <!-- Logo -->
    <div class="text-3xl font-extrabold text-indigo-600 tracking-wide select-none">
      <a href="/" class="hover:text-indigo-700 transition">LapXpert</a>
    </div>

    <!-- Menu -->
    <ul class="hidden md:flex gap-8 text-slate-700 font-medium text-base">
      <li><a href="/" class="hover:text-indigo-600 transition">Trang chủ</a></li>
      <li><a href="/SanPham" class="hover:text-indigo-600 transition">Sản phẩm</a></li>
      <li><a href="/trangDotGiamGia" class="hover:text-indigo-600 transition">Sự kiện</a></li>
      <li><a href="/tatCaPhieuGiamGia" class="hover:text-indigo-600 transition">Voucher</a></li>
      <li><a href="/hoTroKhachHang" class="hover:text-indigo-600 transition">Hỗ trợ</a></li>
    </ul>

    <!-- Buttons -->
    <div class="flex items-center gap-3">
      <button
        class="hidden md:inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-600 transition text-sm font-semibold"
      >
        <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
      </button>
      <button
        class="hidden md:inline-flex items-center gap-2 border border-indigo-500 text-indigo-500 px-4 py-2 rounded-xl hover:bg-indigo-50 transition text-sm font-semibold"
      >
        <i class="fa-regular fa-user"></i> Đăng ký
      </button>

      <!-- Giỏ hàng -->
      <div class="relative">
        <button
          class="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-green-600 transition ease-in-out duration-300 text-sm font-semibold"
          @click="goToCart"
        >
          <i class="fa-solid fa-cart-shopping text-lg"></i> Giỏ hàng
        </button>
        <!-- Hiển thị số lượng trong giỏ hàng -->
        <span v-if="cartItemCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {{ cartItemCount }}
        </span>
      </div>

      <!-- Mobile menu icon -->
      <button class="md:hidden text-indigo-600 text-2xl focus:outline-none">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      cartItemCount: 0, // Dữ liệu cho số lượng sản phẩm trong giỏ hàng
    };
  },
  methods: {
    goToCart() {
      this.$router.push('/gioHang'); // Chuyển hướng tới trang giỏ hàng
    },
  },
  mounted() {
    // Giả lập số lượng sản phẩm trong giỏ hàng, thay thế bằng logic thực tế từ store hoặc API
    this.cartItemCount = 3; // Thay đổi số lượng này khi có dữ liệu thực tế
  },
};
</script>

