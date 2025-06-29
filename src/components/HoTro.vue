<template>
  <section class="py-16 px-6 text-gray-900">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-blue-900">Hỗ Trợ Khách Hàng</h2>
      <p class="mt-4 text-lg text-gray-700">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
      <!-- Hotline -->
      <div class="p-6 bg-white shadow-lg rounded-xl text-center">
        <i class="text-4xl text-blue-500 fas fa-phone"></i>
        <h3 class="mt-4 text-xl font-semibold">Hotline 24/7</h3>
        <p class="mt-2 text-gray-600">Gọi ngay: <span class="text-blue-600 font-bold">0382400878</span></p>
      </div>

      <!-- Email Support -->
      <div class="p-6 bg-white shadow-lg rounded-xl text-center">
        <i class="text-4xl text-green-500 fas fa-envelope"></i>
        <h3 class="mt-4 text-xl font-semibold">Email Hỗ Trợ</h3>
        <p class="mt-2 text-gray-600">Liên hệ: <span class="text-green-600 font-bold">hmailinh9@gmail.com</span></p>
      </div>

      <!-- Live Chat -->
      <div @click="goToChat"
        class="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-xl transition hover:scale-105 cursor-pointer">
        <i class="text-5xl text-purple-400 fas fa-comments animate-wiggle"></i>
        <h3 class="mt-4 text-xl font-semibold text-gray-800">💬 Chat Trực Tuyến</h3>
        <p class="mt-2 text-gray-600">Nhấn <span class="text-purple-600 font-bold">tại đây</span> để trò chuyện
          nhé!</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SupportSection",
  methods: {
    goToChat() {
      this.$router.push('/chat');
    }
  }
};
</script>

<style scoped>
.shadow-lg:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease-in-out;
}
</style>