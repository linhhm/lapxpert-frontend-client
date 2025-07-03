<template>
  <div class="max-w-screen-xl mx-auto px-4 py-10" v-if="productBase && danhSachChiTiet.length">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Ảnh sản phẩm -->
      <div>
        <img :src="productBase.image" alt="" class="w-full rounded-xl object-contain h-[400px] shadow-lg" />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ productBase.name }}</h1>
        <p class="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 text-lg font-medium">
          <i class="fas fa-tag text-blue-500"></i>
          <span>Thương hiệu: {{ productBase.brand }}</span>
        </p>
        <div class="text-green-600 font-semibold">Còn hàng</div>

        <!-- Giá -->
        <div class="text-3xl font-bold text-blue-600">
          <template v-if="selectedOption">
            {{ formatPrice(selectedOption.giaBan) }}
          </template>
          <template v-else-if="minMaxPrice">
            {{ formatPrice(minMaxPrice.min) }} - {{ formatPrice(minMaxPrice.max) }}
          </template>
          <template v-else>
            Đang cập nhật giá
          </template>
        </div>

        <!-- Bộ chọn cấu hình -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-white font-semibold mb-1 block">RAM</label>
            <select v-model="selectedRam" class="w-full border p-2 rounded-xl">
              <option disabled value="">Chọn RAM</option>
              <option v-for="ram in uniqueRams" :key="ram">{{ ram }}</option>
            </select>
          </div>

          <div>
            <label class="text-white font-semibold mb-1 block">Màu sắc</label>
            <div class="flex flex-wrap gap-2">
              <div v-for="color in uniqueColors" :key="color" :title="color" @click="selectedColor = color"
                class="w-10 h-10 rounded-full border-2 cursor-pointer transition duration-200" :class="[
                  selectedColor === color ? 'ring-4 ring-white scale-110' : '',
                ]" :style="{ backgroundColor: colorMap[color] || 'gray' }"></div>
            </div>
          </div>
          <div>
            <label class="font-semibold text-gray-700 block mb-1">Màn hình</label>
            <select v-model="selectedManHinh" class="w-full border p-2 rounded-xl">
              <option disabled value="">Chọn màn hình</option>
              <option v-for="manHinh in uniqueManHinhs" :key="manHinh">{{ manHinh }}</option>
            </select>
          </div>
          <div>
            <label class="text-white font-semibold mb-1 block">CPU</label>
            <select v-model="selectedCpu" class="w-full border p-2 rounded-xl">
              <option disabled value="">Chọn CPU</option>
              <option v-for="cpu in uniqueCpus" :key="cpu">{{ cpu }}</option>
            </select>
          </div>

          <div>
            <label class="text-white font-semibold mb-1 block">GPU</label>
            <select v-model="selectedGpu" class="w-full border p-2 rounded-xl">
              <option disabled value="">Chọn GPU</option>
              <option v-for="gpu in uniqueGpus" :key="gpu">{{ gpu }}</option>
            </select>
          </div>

          <div>
            <label class="text-white font-semibold mb-1 block">Bộ nhớ</label>
            <select v-model="selectedBoNho" class="w-full border p-2 rounded-xl">
              <option disabled value="">Chọn bộ nhớ</option>
              <option v-for="boNho in uniqueBoNhos" :key="boNho">{{ boNho }}</option>
            </select>
          </div>
        </div>

        <!-- Số lượng -->
        <div class="mt-4">
          <label class="text-white font-semibold mr-4">Số lượng:</label>
          <input type="number" v-model.number="quantity" min="1"
            class="border rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24" />
        </div>

        <!-- Nút -->
        <div class="flex gap-6 mt-6">
          <button :disabled="!selectedOption" @click="handleMuaNgay"
            class="flex-1 bg-purple-200 text-purple-800 hover:bg-purple-300 py-2 px-4 rounded-xl font-semibold shadow-sm transition-all duration-300 text-sm">
            Mua ngay
          </button>
          <button :disabled="!selectedOption" @click="handleThemVaoGio"
            class="flex-1 bg-blue-100 text-blue-800 hover:bg-blue-200 py-2 px-4 rounded-xl font-semibold flex items-center justify-center gap-1 shadow-sm transition-all duration-300 text-sm0">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
    <!-- Mô tả chi tiết -->
    <div class="mt-12 bg-white p-6 rounded-2xl shadow-xl text-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">📝 Mô tả chi tiết sản phẩm</h2>
        <p class="text-gray-700 dark:text-gray-300 text-center whitespace-pre-line leading-relaxed">
        Mô tả:  {{ productBase.description || 'Chưa có mô tả chi tiết.' }}
        </p>
        <div v-if="selectedOption">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-base">
            <div><span class="font-semibold">🖥 Màn hình:</span> {{ selectedOption.moTaManHinh || 'Đang cập nhật' }}
            </div>
            <div><span class="font-semibold">🧠 CPU:</span> {{ selectedOption.moTaCpu || 'Đang cập nhật' }}</div>
            <div><span class="font-semibold">💾 RAM:</span> {{ selectedOption.moTaRam || 'Đang cập nhật' }}</div>
            <div><span class="font-semibold">🎮 GPU:</span> {{ selectedOption.moTaGpu || 'Đang cập nhật' }}</div>
            <div><span class="font-semibold">💽 Bộ nhớ:</span> {{ selectedOption.moTaBoNho || 'Đang cập nhật' }}</div>
            <div><span class="font-semibold">🎨 Màu sắc:</span> {{ selectedOption.moTaMauSac || 'Đang cập nhật' }}</div>
          </div>
        </div>
        <div v-else>
          <p class="italic text-gray-500 mb-4">Vui lòng chọn cấu hình để xem mô tả chi tiết.</p>
          <!-- Gợi ý mô tả chung nếu chưa chọn -->
          <ul class="list-disc ml-6 space-y-1 text-base">
            <li v-if="uniqueCpus.length"><strong>CPU:</strong> {{ uniqueCpus.join(', ') }}</li>
            <li v-if="uniqueRams.length"><strong>RAM:</strong> {{ uniqueRams.join(', ') }}</li>
            <li v-if="uniqueGpus.length"><strong>GPU:</strong> {{ uniqueGpus.join(', ') }}</li>
            <li v-if="uniqueBoNhos.length"><strong>Bộ nhớ:</strong> {{ uniqueBoNhos.join(', ') }}</li>
            <li v-if="uniqueManHinhs.length"><strong>Màn hình:</strong> {{ uniqueManHinhs.join(', ') }}</li>
            <li v-if="uniqueColors.length"><strong>Màu sắc:</strong> {{ uniqueColors.join(', ') }}</li>
          </ul>
        </div>
    </div>
  </div>
  <!-- Loading -->
  <div v-else class="text-center text-white py-20 text-xl">
    Đang tải dữ liệu sản phẩm...
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChiTietSanPhamStore } from '../stores/chiTietSanPhamStore';
import { storeToRefs } from 'pinia';
import axios from '../apis/axios';
import { useMuaNgayStore } from '../stores/muaNgayStore';
import { useGioHangStore } from '../stores/gioHangStore';

const gioHangStore = useGioHangStore();
const muaNgayStore = useMuaNgayStore();


const route = useRoute();
const sanPhamId = route.params.id;

const productBase = ref(null);
const quantity = ref(1);

const selectedRam = ref('');
const selectedColor = ref('');
const selectedCpu = ref('');
const selectedGpu = ref('');
const selectedBoNho = ref('');
const selectedManHinh = ref('');

const chiTietStore = useChiTietSanPhamStore();
const { danhSachChiTiet } = storeToRefs(chiTietStore);

onMounted(() => {
  fetchSanPhamBase();
  chiTietStore.fetchChiTietBySanPhamId(sanPhamId);
});
function handleMuaNgay() {
  if (!selectedOption.value) {
    alert("Vui lòng chọn đầy đủ cấu hình!");
    return;
  }

  if (selectedOption.value.soLuongTon < quantity.value) {
    alert("Sản phẩm không đủ số lượng trong kho!");
    return;
  }

  const sp = {
    ...selectedOption.value,
    sanPham: productBase.value,
    soLuong: quantity.value
  };

  muaNgayStore.setMuaNgaySanPham(sp);
  localStorage.setItem("muaNgayTam", JSON.stringify(sp));
  window.location.href = "/thanhToan";
}

async function handleThemVaoGio() {
  if (!selectedOption.value) {
    alert("Vui lòng chọn đầy đủ cấu hình!");
    return;
  }

  try {
    if (!gioHangStore.gioHangId) {
      await gioHangStore.fetchItems(); // tạo mới nếu chưa có
    }

    const item = gioHangStore.items.find(i => i.sanPhamChiTiet.id === selectedOption.value.id);
    const existingQty = item ? item.soLuong : 0;

    if (existingQty + quantity.value > selectedOption.value.soLuongTon) {
      alert(`Chỉ còn ${selectedOption.value.soLuongTon} sản phẩm trong kho!`);
      return;
    }

    await gioHangStore.themSP(selectedOption.value.id, quantity.value); // ⚠️ phải hỗ trợ quantity
    alert("Đã thêm vào giỏ hàng!");
  } catch (err) {
    console.error("Lỗi thêm vào giỏ:", err);
    alert("Thêm vào giỏ thất bại!");
  }
}
async function fetchSanPhamBase() {
  try {
    const res = await axios.get(`/chi-tiet-san-pham/${sanPhamId}`);
    const data = res.data;
    let images = [];
    try {
      images = JSON.parse(data.hinhAnh);
    } catch (e) {
      console.warn("Lỗi parse hình ảnh:", e);
    }

    productBase.value = {
      id: data.id,
      name: data.tenSanPham || 'Đang cập nhật',
      brand: data.thuongHieu?.tenThuongHieu || 'Không rõ',
      image: images[0] || '',
      description: data.moTa || '',
    };
  } catch (err) {
    console.error('Lỗi fetchSanPhamBase:', err);
  }
}
const colorMap = {
  'Đen': '#000000',
  'Trắng': '#ffffff',
  'Xám': '#808080',
  'Đỏ': '#e74c3c',
  'Hồng': '#ff69b4',
  'Tím': '#9b59b6',
  'Xanh': '#3498db',
  'Xanh lá': '#2ecc71',
  'Vàng': '#f1c40f',
  'Cam': '#e67e22',
  'Nâu': '#8b4513',
  'Xanh ngọc': '#1abc9c',
  'Bạc': '#c0c0c0',
  'Xanh đậm': '#0d47a1',
  'Hồng nhạt': '#ffc0cb',
  'Xanh pastel': '#a8dadc',
  'Hồng pastel': '#f9c6d0',
};

const selectedOption = computed(() =>
  danhSachChiTiet.value.find(
    (v) =>
      v.moTaRam === selectedRam.value &&
      v.moTaMauSac === selectedColor.value &&
      v.moTaCpu === selectedCpu.value &&
      v.moTaGpu === selectedGpu.value &&
      v.moTaBoNho === selectedBoNho.value &&
      v.moTaManHinh === selectedManHinh.value
  )
);

const minMaxPrice = computed(() => {
  if (!danhSachChiTiet.value.length) return null;
  const prices = danhSachChiTiet.value.map((v) => v.giaBan);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
});

const uniqueRams = computed(() => [...new Set(danhSachChiTiet.value.map(v => v.moTaRam))]);
const uniqueColors = computed(() => [...new Set(danhSachChiTiet.value.map(v => v.moTaMauSac))]);
const uniqueCpus = computed(() => [...new Set(danhSachChiTiet.value.map(v => v.moTaCpu))]);
const uniqueGpus = computed(() => [...new Set(danhSachChiTiet.value.map(v => v.moTaGpu))]);
const uniqueBoNhos = computed(() => [...new Set(danhSachChiTiet.value.map(v => v.moTaBoNho))]);
const uniqueManHinhs = computed(() => [...new Set(danhSachChiTiet.value.map(v => v.moTaManHinh))]);

function formatPrice(value) {
  if (!value) return 'Đang cập nhật';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}
</script>
