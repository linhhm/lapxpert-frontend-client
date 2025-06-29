<template>
    <div class="h-screen bg-indigo-50 flex items-center justify-center p-4">
        <!-- Khung chat -->
        <div
            class="w-full max-w-2xl h-full max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 bg-white">
            <!-- Header -->
            <div class="bg-indigo-100 text-indigo-700 p-4 text-lg font-bold flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-store text-2xl"></i>
                    <span>Shop Đáng Yêu</span>
                </div>
                <button @click="closeChat" class="text-indigo-500 hover:text-red-400 transition text-xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Tin nhắn -->
            <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-indigo-50">
                <div v-for="msg in messages" :key="msg.id" class="flex"
                    :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'">
                    <div :class="msg.sender === 'me'
                        ? 'bg-indigo-200 text-gray-900 rounded-br-none'
                        : 'bg-white border border-indigo-200 text-gray-700 rounded-bl-none'"
                        class="p-3 max-w-xs rounded-2xl shadow-sm">
                        <span>{{ msg.text }}</span>
                    </div>
                </div>
            </div>

            <!-- Gợi ý -->
            <div class="bg-white p-3 border-t flex flex-wrap gap-2 justify-start">
                <button v-for="s in messageSuggestions" :key="s" @click="sendMessage(s)"
                    class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition text-sm">
                    {{ s }}
                </button>
            </div>

            <!-- Nhập tin -->
            <div class="bg-white p-4 border-t flex items-center gap-3">
                <input v-model="newMessage" @keyup.enter="sendMessage(newMessage)" type="text"
                    placeholder="Nhắn gì cho shop nè..."
                    class="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <button @click="sendMessage(newMessage)"
                    class="text-white bg-indigo-400 hover:bg-indigo-500 px-5 py-3 rounded-full transition">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage: "",
            messageSuggestions: [
                "Shop ơi còn hàng không?",
                "Phí ship bao nhiêu vậy?",
                "Có ưu đãi gì không ạ?",
                "Em muốn đổi size được không?"
            ],
            messages: []
        };
    },
    mounted() {
        // Tin nhắn chào tự động khi vào chat
        this.messages.push({
            id: 1,
            sender: "shop",
            text: "🎉 Shop xin chào! Bạn cần hỗ trợ gì nè?"
        });
    },
    methods: {
        sendMessage(text) {
            if (!text.trim()) return;
            this.messages.push({ id: Date.now(), sender: "me", text });
            this.newMessage = "";

            // Giả lập phản hồi shop
            setTimeout(() => {
                this.messages.push({
                    id: Date.now() + 1,
                    sender: "shop",
                    text: "Shop đã nhận được tin nhắn của bạn, bạn chờ ít phút để shop phản hồi bạn yêu nha ~"
                });
            }, 800);
        },
        closeChat() {
                this.$router.push("/hoTroKhachHang"); // Điều hướng về trang chủ
            }
        }
  };
</script>