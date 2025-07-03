<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white flex items-center justify-center p-6">
    <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-indigo-700 mb-6">
        🔐 Đăng nhập vào hệ thống
      </h1>

      <form @submit.prevent="dangNhap">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" required
            class="w-full px-4 py-2 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
        </div>

        <!-- Password với icon mắt -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              required
              class="w-full px-4 py-2 pr-10 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              @click="toggleShowPassword"
              class="absolute right-3 top-2.5 text-indigo-400 hover:text-indigo-600"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Ghi nhớ đăng nhập -->
        <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="form.remember" class="mr-2">
            Ghi nhớ đăng nhập
          </label>
          <a href="#" class="text-indigo-600 hover:underline">Quên mật khẩu?</a>
        </div>

        <!-- Nút đăng nhập -->
        <button type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200">
          Đăng nhập
        </button>
      </form>

      <!-- Chuyển sang đăng ký -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <a href="#" @click.prevent="goToRegister" class="text-indigo-600 hover:underline font-medium">
          Chưa có tài khoản?
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      showPassword: false
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    dangNhap() {
      console.log('Đăng nhập với:', this.form);
      this.$toast?.add?.({
        severity: 'success',
        summary: 'Đăng nhập thành công',
        detail: '',
        life: 3000
      });
      // Ví dụ điều hướng
      this.$router.push('/');
    },
    goToRegister() {
      this.$router.push('/dangKy');
    }
  }
};
</script>
