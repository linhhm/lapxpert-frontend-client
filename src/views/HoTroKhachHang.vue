<template>
    <section class="py-16 px-6 bg-gradient-to-b from-indigo-50 to-blue-100">
        <!-- Tiêu đề -->
        <div class="max-w-6xl mx-auto text-center">
            <h2 class="text-4xl font-extrabold text-indigo-500">💫 Trang Hỗ Trợ Khách Hàng</h2>
            <p class="mt-4 text-lg text-gray-700">Tụi mình luôn sẵn sàng hỗ trợ bạn bất kỳ lúc nào nè~ 🌈</p>
        </div>

        <!-- Các khối hỗ trợ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
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
        </div>

        <!-- Nút nổi Chatbot -->
        <div id="chatbot-button"
            class="fixed bottom-4 right-4 bg-indigo-400 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-indigo-500 transition"
            @click="toggleChat">
            <i class="fas fa-robot text-2xl"></i>
        </div>

        <!-- Câu Hỏi Thường Gặp -->
        <div class="mt-16 max-w-6xl mx-auto">
            <h3 class="text-3xl font-semibold text-indigo-500 text-center">🧐 Câu Hỏi Thường Gặp</h3>
            <div class="mt-6 space-y-4">
                <div class="bg-white p-5 shadow-md rounded-lg hover:shadow-xl transition duration-300">
                    <h4 class="text-lg font-medium text-gray-800">1. Làm thế nào để liên hệ hỗ trợ?</h4>
                    <p class="mt-2 text-gray-600">Bạn có thể gọi hotline, gửi email hoặc trò chuyện với chatbot 💬</p>
                </div>
                <div class="bg-white p-5 shadow-md rounded-lg hover:shadow-xl transition duration-300">
                    <h4 class="text-lg font-medium text-gray-800">2. Tôi có thể kiểm tra đơn hàng ở đâu?</h4>
                    <p class="mt-2 text-gray-600">Vào mục "Lịch sử đơn hàng" trong tài khoản để theo dõi nhé~</p>
                </div>
                <div class="bg-white p-5 shadow-md rounded-lg hover:shadow-xl transition duration-300">
                    <h4 class="text-lg font-medium text-gray-800">3. Chính sách đổi trả như thế nào?</h4>
                    <p class="mt-2 text-gray-600">Đổi trả trong 7 ngày nếu sản phẩm còn mới và chưa sử dụng 🍃</p>
                </div>
            </div>
        </div>

        <!-- Chính Sách & Quy Định -->
        <div class="mt-16 max-w-6xl mx-auto text-center">
            <h3 class="text-3xl font-semibold text-indigo-500">📜 Chính Sách & Quy Định</h3>
            <p class="mt-4 text-lg text-gray-700">Chúng mình cam kết bảo vệ quyền lợi của bạn 100% 💖</p>
            <ul class="mt-6 list-disc text-left pl-6 text-gray-600 space-y-2 max-w-lg mx-auto">
                <li>Chính sách bảo mật thông tin cá nhân.</li>
                <li>Giao hàng nhanh, an toàn và rõ ràng.</li>
                <li>Đổi trả dễ dàng trong vòng 7 ngày.</li>
            </ul>
        </div>

        <!-- Chatbox với Icon dễ thương cho bot và người dùng -->
        <div v-if="isChatOpen" id="chatbox"
            class="fixed bottom-20 right-4 bg-white w-80 h-96 shadow-xl rounded-2xl p-4 border-2 border-indigo-300 flex flex-col">
            <!-- Header -->
            <div class="flex justify-between items-center">
                <h4 class="font-semibold text-lg text-indigo-500">🤖 Chatbot Thân Thiện</h4>
                <button @click="toggleChat" class="text-gray-500 hover:text-red-400">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Nội dung tin nhắn -->
            <div class="mt-4 flex-1 overflow-y-auto space-y-3 pr-2">
                <!-- Tin nhắn từ bot -->
                <div class="flex items-start">
                    <!-- Icon Bot dễ thương -->
                    <div class="w-8 h-8 bg-blue-300 text-white rounded-full flex items-center justify-center mr-2">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="bg-indigo-100 text-gray-700 px-3 py-2 rounded-xl max-w-[70%]">
                        Chào bạn yêu ơi! 💖 Có gì mình có thể giúp nè? 🌟
                    </div>
                </div>

                <!-- Ô nhập tin nhắn -->
                <div class="mt-3">
                    <input type="text" placeholder="Nhắn gì đó dễ thương nè~"
                        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    <button
                        class="w-full bg-indigo-400 text-white py-2 mt-2 rounded-md hover:bg-indigo-500 transition-all duration-300">
                        Gửi ✨
                    </button>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    name: "SupportPage",
    data() {
        return {
            isChatOpen: false,
        };
    },
    methods: {
        toggleChat() {
            this.isChatOpen = !this.isChatOpen;
        },
        goToChat() {
            this.$router.push('/chat');
        }
    },
};
</script>

<style scoped>
#chatbot-button {
    animation: float 2s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}

#chatbox {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes wiggle {

    0%,
    100% {
        transform: rotate(-4deg);
    }

    50% {
        transform: rotate(4deg);
    }
}

.animate-wiggle {
    animation: wiggle 1.8s infinite ease-in-out;
}
</style>
