<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-white p-6">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
      <!-- Tiêu đề -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-purple-700 mb-2">📝 Tạo tài khoản</h1>
        <p class="text-sm text-gray-500">Điền thông tin bên dưới để bắt đầu</p>
      </div>

      <!-- Form đăng ký -->
      <form @submit.prevent="dangKyTaiKhoan" class="space-y-5">
        <!-- Họ tên -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Họ tên</label>
          <div class="relative">
            <input v-model="form.hoTen" type="text" required
              class="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none" />
            <i class="fas fa-user absolute left-3 top-2.5 text-purple-400"></i>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <div class="relative">
            <input v-model="form.email" type="email" required
              class="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none" />
            <i class="fas fa-envelope absolute left-3 top-2.5 text-purple-400"></i>
          </div>
        </div>

        <!-- Mật khẩu -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Mật khẩu</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              required
              class="w-full pl-10 pr-10 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <i class="fas fa-lock absolute left-3 top-2.5 text-purple-400"></i>
            <button type="button" @click="toggleShowPassword"
              class="absolute right-3 top-2.5 text-purple-400 hover:text-purple-600">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Nhập lại mật khẩu -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Nhập lại mật khẩu</label>
          <div class="relative">
            <input
              :type="showRePassword ? 'text' : 'password'"
              v-model="form.rePassword"
              required
              class="w-full pl-10 pr-10 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <i class="fas fa-lock absolute left-3 top-2.5 text-purple-400"></i>
            <button type="button" @click="toggleShowRePassword"
              class="absolute right-3 top-2.5 text-purple-400 hover:text-purple-600">
              <i :class="showRePassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">❗ Mật khẩu không khớp</p>
        </div>

        <!-- Button -->
        <button type="submit"
          class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all">
          Đăng ký ngay
        </button>
      </form>

      <!-- Link chuyển sang đăng nhập -->
      <div class="text-center text-sm text-gray-600">
        Đã có tài khoản?
        <router-link to="/dang-nhap" class="text-indigo-600 hover:underline font-medium">Đăng nhập</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        hoTen: '',
        email: '',
        password: '',
        rePassword: ''
      },
      showPassword: false,
      showRePassword: false,
      passwordMismatch: false
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowRePassword() {
      this.showRePassword = !this.showRePassword;
    },
    dangKyTaiKhoan() {
      if (this.form.password !== this.form.rePassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;
      console.log('Gửi đăng ký:', this.form);

      this.$toast?.add?.({
        severity: 'success',
        summary: 'Đăng ký thành công',
        detail: 'Hãy đăng nhập để tiếp tục',
        life: 3000
      });

      this.$router.push('/dang-nhap');
    }
  }
};
</script>
