<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wide">Tất cả sản phẩm</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Sidebar lọc -->
      <aside class="bg-white p-6 rounded-2xl shadow-xl md:col-span-1 space-y-6 border border-gray-200">
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Phân loại</label>
          <multiselect v-model="filters.category" :options="categoryOptions" :allow-empty="true"
            placeholder="Chọn loại" class="w-full" label="label" track-by="value" />
        </div>

        <div>
  <label class="block font-semibold text-gray-700 mb-2">Hãng</label>
  <multiselect
    v-model="filters.brand"
    :options="brandOptions"
    :allow-empty="true"
    placeholder="Chọn hãng"
    class="w-full"
    label="label"
    track-by="value"
  />
</div>


  <div>
  <label class="block font-semibold text-gray-700 mb-2">Khoảng giá (VND)</label>
  <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 min-h-[140px]">
    <!-- Giá hiển thị trên cùng -->
    <div class="flex justify-between text-sm text-gray-600 font-medium">
      <span>Tối thiểu: {{ formatPrice(minPriceGlobal) }}</span>
      <span>Tối đa: {{ formatPrice(maxPriceGlobal) }}</span>
    </div>

    <!-- Ô nhập số -->
    <div class="flex items-center justify-between gap-2">
      <input
        type="number"
        v-model.number="filters.priceMin"
        :min="minPriceGlobal"
        :max="filters.priceMax - 1000000"
        step="1000000"
        class="w-1/2 p-2 rounded-lg border border-gray-300 text-sm"
        placeholder="Từ"
      />
      <input
        type="number"
        v-model.number="filters.priceMax"
        :min="filters.priceMin + 1000000"
        :max="maxPriceGlobal"
        step="1000000"
        class="w-1/2 p-2 rounded-lg border border-gray-300 text-sm"
        placeholder="Đến"
      />
    </div>

    <!-- Slider đôi -->
    <div class="flex items-center gap-2">
      <input
        type="range"
        v-model.number="filters.priceMin"
        :min="minPriceGlobal"
        :max="filters.priceMax - 1000000"
        step="1000000"
        class="w-full accent-blue-500"
      />
      <input
        type="range"
        v-model.number="filters.priceMax"
        :min="filters.priceMin + 1000000"
        :max="maxPriceGlobal"
        step="1000000"
        class="w-full accent-blue-500"
      />
    </div>
  </div>
</div>





        <div>
          <label class="block font-semibold text-gray-700 mb-2">Tìm kiếm theo tên</label>
          <input v-model="filters.search" type="text" placeholder="Tìm sản phẩm" class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div class="pt-2">
          <button @click="resetFilters" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full flex items-center justify-center gap-2 text-sm font-semibold">
            <i class="fa-solid fa-trash"></i> Xóa bộ lọc
          </button>
        </div>
      </aside>

      <!-- Danh sách sản phẩm -->
      <!-- Danh sách sản phẩm -->
<section class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div v-for="sp in products" :key="sp.id"
    class="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100">
    <div>
      <router-link :to="`/chiTietSanPham/${sp.id}`">
<img :src="getImageUrl(sp.hinhAnh)" alt="" class="w-full h-40 object-contain mb-4 rounded-xl transition-transform hover:scale-105" />
      </router-link>
      <h2 class="text-lg font-bold text-gray-800 line-clamp-2">{{ sp.tenSanPham }}</h2>
      <p class="text-gray-500 text-sm mb-1">
        {{ sp.thuongHieu?.tenThuongHieu || 'Không rõ hãng' }}
      </p>
      <p class="text-blue-600 font-bold text-lg mb-3">
  {{ formatPrice(getMinPrice(sp.chiTietSanPhams)) }} ₫ - {{ formatPrice(getMaxPrice(sp.chiTietSanPhams)) }} ₫
</p>



    </div>
    <div class="flex gap-2 mt-auto">
      <button @click="muaNgay(sp)" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">Mua ngay</button>
      <button @click="themVaoGio(sp)"
        class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-1">
        <i class="fa-solid fa-cart-shopping"></i> Giỏ
      </button>
    </div>
  </div>
</section>

    </div>

    <!-- Phân trang -->
    <div class="flex justify-center mt-12 gap-2">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium">←</button>
      <span class="px-4 py-2 font-bold text-black bg-white rounded-xl border border-gray-300">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium">→</button>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import axios from 'axios'

export default {
  components: { Multiselect },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
      products: [],
      minPriceGlobal: 0,
      maxPriceGlobal: 60000000, // Sẽ được cập nhật sau khi fetch
      filters: {
        priceMin: 0,
        priceMax: 60000000,
        category: null,
        brand: null,
        search: ""
      },
      categoryOptions: [
        { label: "Laptop Gaming", value: "gaming" },
        { label: "Laptop Văn phòng", value: "office" },
        { label: "Macbook", value: "macbook" }
      ],
      brandOptions: [
        { label: "Asus", value: "asus" },
        { label: "Dell", value: "dell" },
        { label: "Apple", value: "mac" },
        { label: "MSI", value: "msi" }
      ]
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(sp => {
        const matchCategory = true; // Tạm bỏ lọc category
        const matchBrand = !this.filters.brand || sp.thuongHieu?.tenThuongHieu?.toLowerCase() === this.filters.brand.label.toLowerCase();
        const matchPrice = sp.giaBan >= this.filters.priceMin && sp.giaBan <= this.filters.priceMax;
        const matchSearch = sp.tenSanPham?.toLowerCase().includes(this.filters.search.toLowerCase());
        return matchCategory && matchBrand && matchPrice && matchSearch;
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredProducts.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1;
    }
  },
  methods: {
    formatPrice(value) {
      if (!value) return "0";
      return new Intl.NumberFormat('vi-VN').format(value);
    },
    getMinPrice(list) {
      if (!list || list.length === 0) return 0;
      return Math.min(...list.map(ct => ct.giaBan || 0));
    },
    getMaxPrice(list) {
      if (!list || list.length === 0) return 0;
      return Math.max(...list.map(ct => ct.giaBan || 0));
    },
    resetFilters() {
      this.filters = {
        priceMin: this.minPriceGlobal,
        priceMax: this.maxPriceGlobal,
        category: null,
        brand: null,
        search: ""
      };
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    muaNgay(sp) {
      alert(`Mua ngay: ${sp.tenSanPham}`);
    },
    themVaoGio(sp) {
      alert(`Đã thêm ${sp.tenSanPham} vào giỏ hàng`);
    },
    getImageUrl(imageStr) {
      try {
        const images = JSON.parse(imageStr);
        if (!images || images.length === 0) return '/images/default.jpg';
        if (images[0].startsWith('http')) return images[0];
        return `http://localhost:8080/images/${images[0]}`;
      } catch (e) {
        return '/images/default.jpg';
      }
    },
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:8080/api/san-pham-online');
        this.products = res.data;

        const allPrices = res.data.flatMap(sp =>
          (sp.chiTietSanPhams || []).map(ct => ct.giaBan || 0)
        );

        if (allPrices.length > 0) {
          const min = Math.min(...allPrices);
          const max = Math.max(...allPrices);
          this.minPriceGlobal = min;
          this.maxPriceGlobal = max;

          // Gán vào filters ngay lần đầu load
          this.filters.priceMin = min;
          this.filters.priceMax = max;
        }

      } catch (err) {
        console.error("Lỗi khi load sản phẩm từ backend:", err);
      }
    }
  },
  watch: {
    'filters.priceMin'(val) {
      if (val > this.filters.priceMax) {
        this.filters.priceMin = this.filters.priceMax;
      }
    },
    'filters.priceMax'(val) {
      if (val < this.filters.priceMin) {
        this.filters.priceMax = this.filters.priceMin;
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>


