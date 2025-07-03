<template>
  <section class="py-16 px-6 text-gray-900">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-blue-900">Hỗ Trợ Khách Hàng</h2>
      <p class="mt-4 text-lg text-gray-700">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
    </div>

    <!-- Các khối hỗ trợ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 max-w-6xl mx-auto">
            <!-- Hotline -->
            <div class="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-xl transition hover:scale-105">
                <i class="text-5xl text-indigo-400 fas fa-phone animate-wiggle"></i>
                <h3 class="mt-4 text-xl font-semibold text-gray-800">📞 Hotline 24/7</h3>
                <p class="mt-2 text-gray-600">Gọi ngay: <span class="text-indigo-500 font-bold">0382400878</span></p>
            </div>

            <!-- Email -->
            <div class="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-xl transition hover:scale-105">
                <i class="text-5xl text-teal-400 fas fa-envelope animate-wiggle"></i>
                <h3 class="mt-4 text-xl font-semibold text-gray-800">📧 Email Hỗ Trợ</h3>
                <p class="mt-2 text-gray-600">Gửi đến: <span class="text-teal-600 font-bold">hmailinh9@gmail.com</span>
                </p>
            </div>

            <!-- Chat -->
            <div @click="goToChat"
                class="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-xl transition hover:scale-105 cursor-pointer">
                <i class="text-5xl text-purple-400 fas fa-comments animate-wiggle"></i>
                <h3 class="mt-4 text-xl font-semibold text-gray-800">💬 Chat Trực Tuyến</h3>
                <p class="mt-2 text-gray-600">Nhấn <span class="text-purple-600 font-bold">tại đây</span> để trò chuyện
                    nhé!</p>
            </div>
            <!-- Tra cứu đơn hàng -->
            <div @click="scrollToTraCuu"
                class="p-6 bg-white shadow-md rounded-2xl text-center hover:shadow-xl transition hover:scale-105 cursor-pointer">
                <i class="text-5xl text-pink-400 fas fa-search animate-wiggle"></i>
                <h3 class="mt-4 text-xl font-semibold text-gray-800">🛍 Tra cứu đơn</h3>
                <p class="mt-2 text-gray-600">Xem thông tin đơn hàng của bạn cực nhanh ✨</p>
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
    },
    scrollToTraCuu() {
            this.$router.push('/traCuuDon');
        },
  }
};
</script>

<style scoped>
.shadow-lg:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease-in-out;
}
</style>