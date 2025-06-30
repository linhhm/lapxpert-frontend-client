<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wide">Tất cả sản phẩm</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Sidebar lọc -->
      <aside class="bg-white p-6 rounded-2xl shadow-xl md:col-span-1 space-y-6 border border-gray-200">
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Phân loại</label>
          <multiselect v-model="filters.category" :options="categoryOptions" :allow-empty="true" placeholder="Chọn loại"
            class="w-full" label="label" track-by="value" />
        </div>

        <div>
          <label class="block font-semibold text-gray-700 mb-2">Hãng</label>
          <multiselect v-model="filters.brand" :options="brandOptions" :allow-empty="true" placeholder="Chọn hãng"
            class="w-full" label="label" track-by="value" />
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
              <input type="number" v-model.number="filters.priceMin" :min="minPriceGlobal"
                :max="filters.priceMax - 1000000" step="1000000"
                class="w-1/2 p-2 rounded-lg border border-gray-300 text-sm" placeholder="Từ" />
              <input type="number" v-model.number="filters.priceMax" :min="filters.priceMin + 1000000"
                :max="maxPriceGlobal" step="1000000" class="w-1/2 p-2 rounded-lg border border-gray-300 text-sm"
                placeholder="Đến" />
            </div>

            <!-- Slider đôi -->
            <div class="flex items-center gap-2">
              <input type="range" v-model.number="filters.priceMin" :min="minPriceGlobal"
                :max="filters.priceMax - 1000000" step="1000000" class="w-full accent-blue-500" />
              <input type="range" v-model.number="filters.priceMax" :min="filters.priceMin + 1000000"
                :max="maxPriceGlobal" step="1000000" class="w-full accent-blue-500" />
            </div>
          </div>
        </div>





        <div>
          <label class="block font-semibold text-gray-700 mb-2">Tìm kiếm theo tên</label>
          <input v-model="filters.search" type="text" placeholder="Tìm sản phẩm"
            class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div class="pt-2">
          <button @click="resetFilters"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full flex items-center justify-center gap-2 text-sm font-semibold">
            <i class="fa-solid fa-trash"></i> Xóa bộ lọc
          </button>
        </div>
      </aside>

      <!-- Danh sách sản phẩm -->
      <section class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="sp in products" :key="sp.id"
          class="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100">
          <div>
            <router-link :to="`/chiTietSanPham/${sp.id}`">
              <img :src="getImageUrl(sp.hinhAnh)" alt=""
                class="w-full h-40 object-contain mb-4 rounded-xl transition-transform hover:scale-105" />
            </router-link>
            <h2 class="text-lg font-bold text-gray-800 line-clamp-2">{{ sp.tenSanPham }}</h2>
            <p class="text-gray-500 text-sm mb-1">
              {{ sp.thuongHieu?.tenThuongHieu || 'Không rõ hãng' }}
            </p>
            <p class="text-blue-600 font-bold text-lg mb-3">
              {{ formatPrice(getMinPrice(sp.chiTietSanPhams)) }} ₫ - {{ formatPrice(getMaxPrice(sp.chiTietSanPhams)) }}
              ₫
            </p>



          </div>
          <div class="flex gap-2 mt-auto">
            <button @click="muaNgay(sp)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold">Mua
              ngay</button>
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
      <span class="px-4 py-2 font-bold text-black bg-white rounded-xl border border-gray-300">{{ currentPage }} / {{
        totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium">→</button>
    </div>
  </div>
  <!-- PANEL CHỌN CẤU HÌNH GỘP VÀO TRONG FILE -->
  <div v-if="showPanel" class="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
      <button @click="showPanel = false"
        class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">✕</button>

      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Chọn cấu hình</h2>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="font-semibold text-gray-700 block mb-1">RAM</label>
            <select v-model="selectedRam" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn RAM</option>
              <option v-for="ram in uniqueRamsWithLabel" :key="ram.id" :value="ram.id">{{ ram.name }}</option>
            </select>
          </div>

          <div>
            <label class="font-semibold text-gray-700 block mb-1">Màu sắc</label>
            <div class="flex flex-wrap gap-3">
              <div v-for="color in uniqueColorsWithLabel" :key="color.id" :title="color.name"
                @click="selectedColor = color.id" :class="[
                  'w-8 h-8 rounded-full cursor-pointer border-2',
                  selectedColor === color.id ? 'border-blue-600' : 'border-gray-300'
                ]" :style="{ backgroundColor: getColorHex(color.name) }"></div>
            </div>
          </div>

          <div>
            <label class="font-semibold text-gray-700 block mb-1">CPU</label>
            <select v-model="selectedCpu" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn CPU</option>
              <option v-for="cpu in uniqueCpusWithLabel" :key="cpu.id" :value="cpu.id">{{ cpu.name }}</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-gray-700 block mb-1">GPU</label>
            <select v-model="selectedGpu" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn GPU</option>
              <option v-for="gpu in uniqueGpusWithLabel" :key="gpu.id" :value="gpu.id">{{ gpu.name }}</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-gray-700 block mb-1">Số lượng</label>
            <div class="flex items-center gap-2">
              <button @click="soLuongChon = Math.max(1, soLuongChon - 1)"
                class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold flex items-center justify-center">-</button>
              <input type="number" v-model.number="soLuongChon" min="1" :max="selectedOption?.soLuongTon || 1"
                class="w-16 text-center border border-gray-300 rounded-lg py-1 px-2" />
              <button @click="soLuongChon = Math.min((selectedOption?.soLuongTon || 1), soLuongChon + 1)"
                class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold flex items-center justify-center">+</button>
            </div>
          </div>

          <div>
            <label class="font-semibold text-gray-700 block mb-1">BoNho</label>
            <select v-model="selectedBoNho" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn BoNho</option>
              <option v-for="boNho in uniqueBoNhoWithLabel" :key="boNho.id" :value="boNho.id">{{ boNho.name }}</option>
            </select>
          </div>

          <div v-if="selectedOption" class="bg-gray-100 p-4 rounded-lg text-center mt-4">
            <p class="text-blue-600 font-bold text-lg">
              {{ formatPrice(selectedOption.giaKhuyenMai || selectedOption.giaBan) }}
              <span v-if="selectedOption.giaKhuyenMai && selectedOption.giaKhuyenMai < selectedOption.giaBan"
                class="text-gray-500 line-through text-sm ml-2">
                {{ formatPrice(selectedOption.giaBan) }}
              </span>
            </p>
          </div>

        </div>

        <button @click="xacNhanCauHinh"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Xác nhận
        </button>
      </div>
    </div>
  </div>

</template>
<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { useProductStore } from '../stores/SanPhamstore'
import { useChiTietSanPhamStore } from '../stores/chiTietSanPhamStore'
import { mapState } from 'pinia'
import { useMuaNgayStore } from '../stores/muaNgayStore';
import { useGioHangStore } from '../stores/gioHangStore';



export default {
  components: { Multiselect },
  data() {
    const productStore = useProductStore();
    const chiTietSanPhamStore = useChiTietSanPhamStore();
    const gioHangStore = useGioHangStore();

    return {
      soLuongChon: 1,
      productStore,
      dangMuaNgay: false,
      chiTietSanPhamStore,
      gioHangStore,
      showPanel: false,
      sanPhamDangChon: null,
      chiTietSanPhams: [],
      selectedRam: '',
      selectedColor: '',
      selectedCpu: '',
      selectedGpu: '',
      selectedBoNho: '',
      currentPage: 1,
      itemsPerPage: 8,
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
    }

  },

  computed: {
    ...mapState(useProductStore, ['products', 'minPrice', 'maxPrice']),
    filteredProducts() {
      return this.products.filter(sp => {
        const matchBrand = !this.filters.brand || sp.thuongHieu?.tenThuongHieu?.toLowerCase() === this.filters.brand.label.toLowerCase();
        const matchSearch = sp.tenSanPham?.toLowerCase().includes(this.filters.search.toLowerCase());
        const minPrice = this.getMinPrice(sp.chiTietSanPhams);
        const maxPrice = this.getMaxPrice(sp.chiTietSanPhams);
        const matchPrice = maxPrice >= this.filters.priceMin && minPrice <= this.filters.priceMax;
        return matchBrand && matchSearch && matchPrice;
      });
    },
    uniqueRamsWithLabel() {
      const seen = new Set();
      return this.chiTietSanPhams
        .filter(ct => {
          if (!seen.has(ct.ramId)) {
            seen.add(ct.ramId);
            return true;
          }
          return false;
        })
        .map(ct => ({ id: ct.ramId, name: ct.moTaRam || `RAM ${ct.ramId}` }));
    },

    uniqueColorsWithLabel() {
      const seen = new Set();
      return this.chiTietSanPhams
        .filter(ct => {
          if (!seen.has(ct.mauSacId)) {
            seen.add(ct.mauSacId);
            return true;
          }
          return false;
        })
        .map(ct => ({ id: ct.mauSacId, name: ct.moTaMauSac || `Màu ${ct.mauSacId}` }));
    },

    uniqueCpusWithLabel() {
      const seen = new Set();
      return this.chiTietSanPhams
        .filter(ct => {
          if (!seen.has(ct.cpuId)) {
            seen.add(ct.cpuId);
            return true;
          }
          return false;
        })
        .map(ct => ({ id: ct.cpuId, name: ct.moTaCpu || `CPU ${ct.cpuId}` }));
    },

    uniqueGpusWithLabel() {
      const seen = new Set();
      return this.chiTietSanPhams
        .filter(ct => {
          if (!seen.has(ct.gpuId)) {
            seen.add(ct.gpuId);
            return true;
          }
          return false;
        })
        .map(ct => ({ id: ct.gpuId, name: ct.moTaGpu || `GPU ${ct.gpuId}` }));
    },

    uniqueBoNhoWithLabel() {
      const seen = new Set();
      return this.chiTietSanPhams
        .filter(ct => {
          if (!seen.has(ct.boNhoId)) {
            seen.add(ct.boNhoId);
            return true;
          }
          return false;
        })
        .map(ct => ({ id: ct.boNhoId, name: ct.moTaBoNho || `Bộ nhớ ${ct.boNhoId}` }));
    },

    uniqueRams() {
      return [...new Set(this.chiTietSanPhams.map(ct => ct.ramId))];
    },
    uniqueColors() {
      return [...new Set(this.chiTietSanPhams.map(ct => ct.mauSacId))];
    },
    uniqueCpus() {
      return [...new Set(this.chiTietSanPhams.map(ct => ct.cpuId))];
    },
    uniqueGpus() {
      return [...new Set(this.chiTietSanPhams.map(ct => ct.gpuId))];
    },
    uniqueBoNho() {
      return [...new Set(this.chiTietSanPhams.map(ct => ct.boNhoId))];
    },
    selectedOption() {
      return this.chiTietSanPhams.find(ct =>
        ct.ramId === this.selectedRam &&
        ct.mauSacId === this.selectedColor &&
        ct.cpuId === this.selectedCpu &&
        ct.gpuId === this.selectedGpu &&
        ct.boNhoId === this.selectedBoNho
      );
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
    getColorHex(name) {
      const mapColor = {
        "Đỏ": "#ff4d4f",
        "Xanh lá": "#52c41a",
        "Xanh dương": "#1890ff",
        "Đen": "#000000",
        "Trắng": "#ffffff",
        "Vàng": "#fadb14",
        "Tím": "#722ed1",
        "Cam": "#fa8c16",
        // ... thêm màu khác nếu cần
      };
      return mapColor[name] || "#ccc"; // fallback màu xám nhạt nếu không tìm thấy
    },
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
    async xacNhanCauHinh() {
      if (!this.selectedRam || !this.selectedColor || !this.selectedCpu || !this.selectedGpu || !this.selectedBoNho) {
        alert("Vui lòng chọn đầy đủ cấu hình!");
        return;
      }

      if (!this.selectedOption) {
        alert("Không tìm thấy cấu hình phù hợp!");
        return;
      }

      if (this.selectedOption.soLuongTon === 0) {
        alert("Sản phẩm bạn chọn đã hết hàng!");
        return;
      }
      if (this.dangMuaNgay) {
        const muaNgayStore = useMuaNgayStore();
        const option = {
          ...this.selectedOption,
          sanPham: this.sanPhamDangChon,
          soLuong: this.soLuongChon // 🟢 Thêm dòng này
        };

        muaNgayStore.setMuaNgaySanPham(option);
        localStorage.setItem("muaNgayTam", JSON.stringify(option)); // Lưu lại cả số lượng
        this.showPanel = false;
        this.$router.push("/thanhToan");
        return;
      }

      try {
        if (!this.gioHangStore.gioHangId) {
          await this.gioHangStore.fetchItems(); // tạo mới nếu chưa có
        }

        const cartItem = this.gioHangStore.items.find(i => i.sanPhamChiTiet.id === this.selectedOption.id);
        const existingQty = cartItem ? cartItem.soLuong : 0;
        if (existingQty + 1 > this.selectedOption.soLuongTon) {
          alert(`Chỉ còn ${this.selectedOption.soLuongTon} sản phẩm trong kho!`);
          return;
        }

        await this.gioHangStore.themSP(this.selectedOption.id);
        this.showPanel = false;
        alert("Đã thêm sản phẩm vào giỏ!");
      } catch (err) {
        console.error("Lỗi khi thêm vào giỏ:", err);
        alert("Thêm vào giỏ thất bại!");
      }
    },
    async fetchChiTietSanPham(sanPhamId) {
      this.isLoadingChiTiet = true;
      try {
        await this.chiTietSanPhamStore.fetchChiTietBySanPhamId(sanPhamId);
        this.chiTietSanPhams = this.chiTietSanPhamStore.danhSachChiTiet;

        if (this.chiTietSanPhams.length > 0) {
          this.showPanel = true;
        } else {
          alert("Không có cấu hình cho sản phẩm này!");
        }

      } catch (err) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
        this.chiTietSanPhams = [];
      } finally {
        this.isLoadingChiTiet = false;
      }
      this.selectedRam = '';
      this.selectedColor = '';
      this.selectedCpu = '';
      this.selectedGpu = '';
      this.selectedBoNho = '';

    },
    chonChiTietSanPham(spct) {
      console.log("Đã chọn SPCT:", spct);
      this.showPanel = false;

      // 🔜 Ở đây bạn có thể gọi hàm thêm vào giỏ hàng nếu có store giỏ
      // this.gioHangStore.themSP(spct);
    },
    resetFilters() {
      this.filters = {
        priceMin: this.minPrice,
        priceMax: this.maxPrice,
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
    async muaNgay(sp) {
      this.dangMuaNgay = true; // đánh dấu là hành động mua ngay
      this.sanPhamDangChon = sp;
      await this.fetchChiTietSanPham(sp.id);
      this.showPanel = true;
    },
    async themVaoGio(sp) {
      this.dangMuaNgay = false; // không phải mua ngay
      this.sanPhamDangChon = sp;
      await this.fetchChiTietSanPham(sp.id);
      this.soLuongChon = 1;
      this.showPanel = true;
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
    }
  },
  mounted() {
    this.productStore.fetchProducts().then(() => {
      this.filters.priceMin = this.minPrice;
      this.filters.priceMax = this.maxPrice;
    });
  }
}

</script>
