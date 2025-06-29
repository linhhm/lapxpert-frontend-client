<template>
  <div
    class="max-w-screen-xl mx-auto px-4 py-10"
    v-if="productBase && selectedVariant"
  >
    <!-- Ảnh sản phẩm -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="relative">
        <img
          :src="productBase.image"
          alt=""
          class="w-full rounded-xl object-contain h-[400px] shadow-lg"
        />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-white">{{ productBase.name }}</h1>
        <div class="flex items-center space-x-4">
          <div class="text-green-600 font-semibold">Còn hàng</div>
        </div>
        <div class="text-3xl font-bold text-blue-600">
          {{
            selectedVariant?.giaBan
              ? formatPrice(selectedVariant.giaBan)
              : "Đang cập nhật"
          }}
        </div>
        <p class="text-white text-justify">{{ productBase.description }}</p>

        <!-- Thông tin chi tiết -->
        <div class="space-y-2 text-white">
          <div><b>Hãng:</b> {{ productBase.brand }}</div>
          <div><b>Màu:</b> {{ selectedVariant?.moTaMauSac || "..." }}</div>
          <div><b>CPU:</b> {{ selectedVariant?.moTaCpu || "..." }}</div>
          <div><b>RAM:</b> {{ selectedVariant?.moTaRam || "..." }}</div>
          <div><b>GPU:</b> {{ selectedVariant?.moTaGpu || "..." }}</div>
          <div><b>Bộ nhớ:</b> {{ selectedVariant?.moTaBoNho || "..." }}</div>
        </div>

        <!-- Chọn cấu hình -->
        <div class="mt-4">
          <label class="text-white font-semibold mb-2 block"
            >Chọn cấu hình:</label
          >
          <select
            v-model="selectedVariant"
            class="w-full border rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="variant in variants"
              :key="variant.id"
              :value="variant"
            >
              {{ variant.moTaCpu }} / {{ variant.moTaRam }} /
              {{ variant.moTaBoNho }} / {{ variant.moTaMauSac }}
            </option>
          </select>
        </div>

        <!-- Chọn số lượng -->
        <div class="mt-4">
          <label class="text-white font-semibold mr-4">Số lượng:</label>
          <input
            type="number"
            v-model.number="quantity"
            min="1"
            class="border rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
          />
        </div>

        <!-- Nút hành động -->
        <div class="flex gap-6 mt-6">
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl transition-all"
          >
            Mua ngay
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>

    <!-- Thông số kỹ thuật -->
    <div class="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg text-black">
      <h2 class="text-2xl font-bold mb-4">Thông số kỹ thuật</h2>
      <table class="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td class="pr-4 pl-24 text-right font-semibold">Màn hình:</td>
            <td>{{ selectedVariant.moTaManHinh }}</td>
          </tr>
          <tr>
            <td class="pr-4 pl-24 text-right font-semibold">CPU:</td>
            <td>{{ selectedVariant.moTaCpu }}</td>
          </tr>
          <tr>
            <td class="pr-4 pl-24 text-right font-semibold">RAM:</td>
            <td>{{ selectedVariant.moTaRam }}</td>
          </tr>
          <tr>
            <td class="pr-4 pl-24 text-right font-semibold">Đồ họa:</td>
            <td>{{ selectedVariant.moTaGpu }}</td>
          </tr>
          <tr>
            <td class="pr-4 pl-24 text-right font-semibold">Bộ nhớ:</td>
            <td>{{ selectedVariant.moTaBoNho }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Loading -->
  <div v-else class="text-center text-white py-20 text-xl">
    Đang tải dữ liệu sản phẩm...
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      productBase: {
        id: null,
        name: "Đang cập nhật",
        image: "",
        brand: "Không rõ",
        description: "",
      },
      variants: [],
      selectedVariant: null,
      quantity: 1,
    };
  },
  mounted() {
    const route = useRoute();
    const sanPhamId = this.$route.params.id; // Lấy ID từ URL
    this.fetchSanPham(sanPhamId);
    this.fetchChiTietSanPham(sanPhamId);
  },
  methods: {
    async fetchSanPham(sanPhamId) {
      try {
        const sanPhamId = this.$route.params.id;
        const res = await axios.get(
          `http://localhost:8080/api/v1/san-pham-online/${sanPhamId}`
        );
        const data = res.data;

        // Parse hình ảnh
        let images = [];
        try {
          images = JSON.parse(data.hinhAnh);
        } catch (e) {
          console.warn("Lỗi parse hình ảnh:", e);
        }

        this.productBase = {
          id: data.id,
          name: data.tenSanPham || "Đang cập nhật",
          brand: data.thuongHieu?.tenThuongHieu || "Không rõ",
          image: images[0] || "", // Đường dẫn ảnh đầu tiên
          description: data.moTa || "",
        };
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    },

    async fetchChiTietSanPham(id) {
      try {
        const res = await axios.get(
          `/chi-tiet-san-pham/by-san-pham/?sanPhamId=${id}`
        );
        this.variants = res.data;
        if (this.variants.length > 0) {
          this.selectedVariant = this.variants[0];
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
      }
    },
    formatPrice(value) {
      if (!value) return "Đang cập nhật";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>
