<template>
  <nav class="bg-gradient-to-r from-indigo-50 via-blue-50 to-white shadow-md px-6 md:px-12 py-4 rounded-b-2xl flex items-center justify-between sticky top-0 z-50">
    <!-- Logo -->
    <div class="text-3xl font-extrabold text-indigo-400 tracking-wide select-none">
      <a href="/" class="hover:text-indigo-500 transition">LapXpert</a>
    </div>

    <!-- Menu -->
    <ul class="hidden md:flex gap-8 text-slate-600 font-medium text-base">
      <li><a href="/" class="hover:text-indigo-500 transition">Trang chủ</a></li>
      <li><a href="/SanPham" class="hover:text-indigo-500 transition">Sản phẩm</a></li>
      <li><a href="/trangDotGiamGia" class="hover:text-indigo-500 transition">Sự kiện</a></li>
      <li><a href="/tatCaPhieuGiamGia" class="hover:text-indigo-500 transition">Voucher</a></li>
      <li><a href="/hoTroKhachHang" class="hover:text-indigo-500 transition">Hỗ trợ</a></li>
    </ul>

    <!-- Buttons -->
    <div class="flex items-center gap-3">
      <button
        class="hidden md:inline-flex items-center gap-2 bg-indigo-300 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-400 transition text-sm font-semibold"
        @click="goToLogin"
      >
        <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
      </button>
      <button
        class="hidden md:inline-flex items-center gap-2 border border-indigo-300 text-indigo-400 px-4 py-2 rounded-xl hover:bg-indigo-50 transition text-sm font-semibold"
        @click="goToRegister"
      >
        <i class="fa-regular fa-user"></i> Đăng ký
      </button>

      <!-- Giỏ hàng -->
      <div class="relative">
        <button
          class="inline-flex items-center gap-2 bg-blue-300 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-400 transition ease-in-out duration-300 text-sm font-semibold"
          @click="goToCart"
        >
          <i class="fa-solid fa-cart-shopping text-lg"></i> Giỏ hàng
        </button>
        <span
          v-if="cartItemCount > 0"
          class="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow"
        >
          {{ cartItemCount }}
        </span>
      </div>

      <!-- Mobile menu icon -->
      <button class="md:hidden text-indigo-400 text-2xl focus:outline-none">
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
      cartItemCount: 0,
    };
  },
  methods: {
    goToCart() {
      this.$router.push('/gioHang');
    },
    goToLogin() {
      this.$router.push('/dangNhap');
    },
    goToRegister() {
      this.$router.push('/dangKy');
    },
  },
  mounted() {
    this.cartItemCount = 3; // Replace with real logic later
  },
};
</script>
