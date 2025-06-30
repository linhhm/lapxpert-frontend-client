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
  // Giả lập: nếu người dùng nhập vào bất kỳ mã nào không rỗng thì cho chuyển trang
  if (this.maTraCuu.trim() !== '') {
    this.$router.push({ name: 'ThanhToanThanhCong', params: { maHoaDon: this.maTraCuu } });
  } else {
    alert('Vui lòng nhập mã hóa đơn!');
  }
}

}
}
</script>

<style scoped>
input::placeholder {
  color: #94a3b8;
}
</style>
