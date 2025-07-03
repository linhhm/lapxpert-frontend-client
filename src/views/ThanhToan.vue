<template>
    <div class="p-6 bg-gradient-to-b from-blue-200 via-purple-200 to-white min-h-screen">
        <h1 class="text-4xl font-bold text-center text-blue-900 mb-8">Thanh toán</h1>

        <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div class="flex border-b border-blue-300 mb-6">
                <button :class="[
                    'px-4 py-2 font-semibold',
                    activeTab === 'hoaDon'
                        ? 'text-blue-800 border-b-4 border-blue-500'
                        : 'text-gray-500'
                ]" @click="activeTab = 'hoaDon'">
                    Thông tin hóa đơn
                </button>
                <button :class="[
                    'px-4 py-2 font-semibold',
                    activeTab === 'thanhToan'
                        ? 'text-blue-800 border-b-4 border-blue-500'
                        : 'text-gray-500'
                ]" @click="activeTab = 'thanhToan'">
                    Thanh toán
                </button>
            </div>
            <div v-if="activeTab === 'hoaDon'">
                <!-- Danh sách sản phẩm -->
                <div v-for="item in selectedItems" :key="item.sanPhamChiTiet.id"
                    class="flex items-center gap-4 p-4 border border-indigo-100 rounded-lg bg-indigo-50 shadow-sm mb-4">

                    <!-- Hình ảnh -->
                    <img :src="getImageUrl(item.sanPhamChiTiet.hinhAnh)" alt="product image"
                        class="w-20 h-20 object-cover rounded-lg border border-indigo-300 shadow" />

                    <!-- Thông tin sản phẩm -->
                    <div class="flex-1">
                        <p class="text-indigo-800 font-semibold text-base">
                            {{ item.sanPhamChiTiet.sanPham.tenSanPham }}
                        </p>
                        <p class="text-sm text-indigo-500">
                            RAM: {{ item.sanPhamChiTiet.ram?.moTaRam || item.sanPhamChiTiet.moTaRam || 'N/A' }} |
                            CPU: {{ item.sanPhamChiTiet.cpu?.moTaCpu || item.sanPhamChiTiet.moTaCpu || 'N/A' }} |
                            Màu: {{ item.sanPhamChiTiet.mauSac?.moTaMauSac || item.sanPhamChiTiet.moTaMauSac || 'N/A' }} |
                            Màn: {{ item.sanPhamChiTiet.manHinh?.moTaManHinh || item.sanPhamChiTiet.moTaManHinh || 'N/A' }}
                        </p>
                        <p class="text-xs text-gray-600 mt-1" v-if="Array.isArray(item.serialNumbers)">
                            Seri:
                            {{item.serialNumbers.map(sn => sn.serialNumber).join(', ')}}
                        </p>

                    </div>

                    <!-- Giá và số lượng -->
                    <div class="text-right space-y-1">
                        <div>
                            <span class="text-indigo-800 font-bold"
                                v-if="item.giaTaiThoiDiemThem < item.sanPhamChiTiet.giaBan">
                                {{ formatPrice(item.giaTaiThoiDiemThem) }}
                                <span class="text-xs text-gray-400 line-through ml-1">
                                    {{ formatPrice(item.sanPhamChiTiet.giaBan) }}
                                </span>
                            </span>
                            <span class="text-indigo-800 font-bold" v-else>
                                {{ formatPrice(item.giaTaiThoiDiemThem) }}
                            </span>
                        </div>
                        <div class="text-sm text-gray-700">
                            Số lượng: <strong>{{ item.soLuong }}</strong>
                        </div>
                        <div class="text-sm text-indigo-900 font-semibold">
                            Tổng: {{ formatPrice(item.giaTaiThoiDiemThem * item.soLuong) }}
                        </div>
                    </div>
                </div>
                <!-- Tổng tiền hiển thị ở cả 2 tab -->
                <div class="text-right text-lg text-indigo-900 font-semibold mt-6">
                    Tổng tiền sản phẩm: {{ formatPrice(tongTien) }}
                </div>
                <div class="text-right text-lg text-rose-600 font-bold mt-2">
                    Tổng tiền cần thanh toán: {{ formatPrice(tongSauGiam) }}
                </div>


                <!-- Thông tin nhận hàng -->
                <div>
                    <h2 class="text-xl font-semibold text-blue-900 mb-4">Thông tin nhận hàng</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-blue-800 mb-1">Họ và tên</label>
                            <input type="text"
                                class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Nguyễn Tiến Duy" v-model="thongTinKhachHang.hoTen" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-blue-800 mb-1">Số điện thoại</label>
                            <input type="text" v-model="thongTinKhachHang.soDienThoai"
                                class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="0348549656" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-blue-800 mb-1">Email</label>
                            <input type="email" v-model="thongTinKhachHang.email"
                                class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="email@gmail.com" />
                        </div>
                    </div>

                    <!-- Địa chỉ và thêm mới -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-blue-800 mb-1">Địa chỉ nhận hàng</label>
                        <div v-if="!showAddressForm"
                            class="flex justify-between items-center bg-blue-50 px-4 py-3 rounded-md">
                            <!-- <p class="text-sm text-blue-700">
                            Số 39, xã An Bình, huyện Văn Yên, tỉnh Yên Bái
                            <span class="text-xs text-red-500 ml-2">(Địa chỉ mặc định)</span>
                        </p> -->
                            <button @click="showAddressForm = true"
                                class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm">
                                Thêm mới
                            </button>
                        </div>

                        <div v-else class="space-y-4">
                            <input type="text" v-model="thongTinKhachHang.duong"
                                class="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Nhập địa chỉ cụ thể (VD: Số nhà, tên đường...)" />
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <!-- Tỉnh / Thành phố -->
                                <select v-model="selectedProvince"
                                    class="w-full border border-blue-300 rounded-md px-3 py-2">
                                    <option disabled value="">Chọn Tỉnh / Thành phố</option>
                                    <option v-for="item in provinces" :key="item.ProvinceID" :value="item">
                                        {{ item.ProvinceName }}
                                    </option>
                                </select>

                                <!-- Quận / Huyện -->
                                <select v-model="selectedDistrict"
                                    class="w-full border border-blue-300 rounded-md px-3 py-2"
                                    :disabled="!selectedProvince">
                                    <option disabled value="">Chọn Quận / Huyện</option>
                                    <option v-for="item in districts" :key="item.DistrictID" :value="item">
                                        {{ item.DistrictName }}
                                    </option>
                                </select>

                                <!-- Phường / Xã -->
                                <select v-model="selectedWard"
                                    class="w-full border border-blue-300 rounded-md px-3 py-2"
                                    :disabled="!selectedDistrict">
                                    <option disabled value="">Chọn Phường / Xã</option>
                                    <option v-for="item in wards" :key="item.WardCode" :value="item">
                                        {{ item.WardName }}
                                    </option>
                                </select>

                                <button @click="showAddressForm = false"
                                    class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md text-sm">
                                    Chọn lại địa chỉ mặc định
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="activeTab === 'thanhToan'" class="space-y-6">
                <!-- Phiếu giảm giá -->
                <div class="mb-4 flex items-center gap-2">
                    <input v-model="maGiamGia" type="text" placeholder="Nhập mã giảm giá"
                        class="flex-1 border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <button @click="apDungMaGiamGia"
                        class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white font-semibold rounded-md">
                        Áp dụng
                    </button>
                </div>
                <!-- Tổng tiền sản phẩm -->
                <div class="flex justify-between items-center text-lg font-semibold text-indigo-900">
                    <span>Tổng tiền hàng:</span>
                    <span>{{ formatPrice(tongTien) }}</span>
                </div>

                <!-- Giảm giá -->
                <div class="flex justify-between items-center text-base text-indigo-800 font-medium">
                    <span>Giảm giá:</span>
                    <span>- {{ formatPrice(giamGia) }}</span>
                </div>

                <!-- Phí vận chuyển -->
                <div class="flex justify-between items-center text-base text-gray-700">
                    <span>Phí vận chuyển:</span>
                    <span>{{ formatPrice(phiVanChuyen) }}</span>
                </div>

                <!-- Tổng đơn sau giảm -->
                <div class="flex justify-between items-center text-xl font-bold text-blue-900 border-t pt-4">
                    <span>Tổng tiền cần thanh toán:</span>
                    <span>{{ formatPrice(tongSauGiam) }}</span>
                </div>

                <!-- Hình thức thanh toán -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label
                        class="flex items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow"
                        :class="{ 'border-blue-500 ring-2 ring-blue-400': phuongThucThanhToan === 'TIEN_MAT' }">
                        <input type="radio" class="hidden" v-model="phuongThucThanhToan" value="TIEN_MAT" />
                        Thanh toán khi nhận hàng
                    </label>
                    <!-- 
                    <label
                        class="flex items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow"
                        :class="{ 'border-blue-500 ring-2 ring-blue-400': phuongThucThanhToan === 'VNPAY' }">
                        <input type="radio" class="hidden" v-model="phuongThucThanhToan" value="VNPAY" />
                        <img src="/public/images/vnpay.png" alt="VNPAY" class="h-20" />
                    </label>

                    <label
                        class="flex items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow"
                        :class="{ 'border-blue-500 ring-2 ring-blue-400': phuongThucThanhToan === 'MOMO' }">
                        <input type="radio" class="hidden" v-model="phuongThucThanhToan" value="MOMO" />
                        <img src="/public/images/momo.png" alt="MOMO" class="h-20" />
                    </label> -->
                </div>

            </div><br>


            <div class="text-right">
                <button @click="huyThanhToan"
                    class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md">
                    Hủy
                </button>
                <button @click="handleThanhToan"
                    class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md">
                    Tiếp tục
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { useGioHangStore } from '../stores/gioHangStore';
import { useThanhToanStore } from '../stores/thanhToanStore';
import { laySerialTamThoi } from '../apis/thanhToanApi';
import { getProvinces, getDistricts, getWards } from '../apis/ghnApi';
import { getVoucherByCode } from '../apis/phieuGiamGiaApi';
import { useMuaNgayStore } from '../stores/muaNgayStore';
import { onMounted, nextTick } from 'vue';


import axios from '../apis/axios';
// import { getVoucherByCode } from '../apis/phieuGiamGiaApi';

export default {
    name: 'ThanhToanView',
    data() {
        return {
            thongTinKhachHang: {
                hoTen: '',
                soDienThoai: '',
                duong: '',
                email: "",
            },
            phiVanChuyen: 0,
            selectedVoucher: null,
            maGiamGia: '', // ✅ thêm biến mã giảm giá
            phuongThucThanhToan: null,
            vouchers: [],
            activeTab: 'hoaDon',
            provinces: [],
            districts: [],
            wards: [],
            selectedProvince: null,
            selectedDistrict: null,
            selectedWard: null,
            duongChiTiet: '',
            selectedIds: [],
            selectedItems: [],
            showAddressForm: false
        };
    },
    mounted: async function () {
        await nextTick(); // Chờ store khởi tạo xong sau F5

        const idsStr = this.$route.query.sanPhamIds;

        if (idsStr) {
            // Trường hợp từ giỏ hàng
            this.selectedIds = idsStr.split(',').map(id => Number(id));
            await this.loadSelectedItems();
        } else if (this.muaNgayStore.muaNgaySanPham) {
            // Trường hợp từ "mua ngay"
            const sp = this.muaNgayStore.muaNgaySanPham;
            const soLuong = sp.soLuong || 1; // ✅ Ưu tiên lấy từ store nếu có
            this.selectedItems = [{
                sanPhamChiTiet: sp,
                soLuong,
                giaTaiThoiDiemThem: sp.giaKhuyenMai || sp.giaBan,

            }];

            try {
                const res = await laySerialTamThoi(sp.id, 1);
                this.selectedItems[0].serialNumbers = res.data;
            } catch (err) {
                console.error("Lỗi lấy serial sản phẩm mua ngay:", err);
                this.selectedItems[0].serialNumbers = [];
            }
        }

        await this.fetchProvinces();
    },
    computed: {
        muaNgayStore() {
            return useMuaNgayStore(); // ✅ Bổ sung dòng này
        },
        gioHangStore() {
            return useGioHangStore();
        },
        tongTien() {
            return this.selectedItems.reduce((total, item) => {
                const gia = item?.giaTaiThoiDiemThem || 0;
                const soLuong = item?.soLuong || 0;
                return total + gia * soLuong;
            }, 0);
        },
        giamGia() {
            if (!this.selectedVoucher) return 0;
            const { loai, giaTri } = this.selectedVoucher;
            if (loai === 'PHAN_TRAM') return (this.tongTien * giaTri) / 100;
            return giaTri;
        },
        tongSauGiam() {
            return this.tongTien + this.phiVanChuyen - this.giamGia;
        }
    },
    methods: {
        chonThemSanPham() {
            this.$router.push({ name: 'SanPham' }); // hoặc name router phù hợp với trang danh sách sản phẩm
        },
        async apDungMaGiamGia() {
            if (!this.maGiamGia) return;

            try {
                const res = await getVoucherByCode(this.maGiamGia.trim());
                this.selectedVoucher = res.data;

                if (!this.selectedVoucher) {
                    alert("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
                }
            } catch (err) {
                console.error("Không tìm thấy mã giảm giá:", err);
                this.selectedVoucher = null;
                alert("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
            }
        },
        async fetchProvinces() {
            try {
                const res = await getProvinces();
                this.provinces = res.data.data;
            } catch (err) {
                console.error('Lỗi lấy tỉnh/thành:', err);
            }
        },
        async fetchDistricts() {
            if (!this.selectedProvince) return;
            try {
                const res = await getDistricts(this.selectedProvince.ProvinceID);
                this.districts = res.data.data;
            } catch (err) {
                console.error('Lỗi lấy quận/huyện:', err);
            }
        },
        async fetchWards() {
            if (!this.selectedDistrict) return;
            try {
                const res = await getWards(this.selectedDistrict.DistrictID);
                this.wards = res.data.data;
            } catch (err) {
                console.error('Lỗi lấy phường/xã:', err);
            }
        },
        getImageUrl(imageStr) {
            try {
                const imgs = JSON.parse(imageStr);
                if (!imgs || imgs.length === 0) return '/images/default.jpg';
                if (imgs[0].startsWith('http')) return imgs[0];
                return `http://localhost:8080/images/${imgs[0]}`;
            } catch {
                return '/images/default.jpg';
            }
        },
        formatPrice(v) {
            return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        },
        async loadSelectedItems() {
            await this.gioHangStore.fetchItems();
            const allItems = this.gioHangStore.items;
            this.selectedItems = allItems.filter(item =>
                this.selectedIds.includes(item.sanPhamChiTiet.id)
            );

            for (const item of this.selectedItems) {
                try {
                    const res = await laySerialTamThoi(item.sanPhamChiTiet.id, item.soLuong);
                    item.serialNumbers = res.data;
                } catch (err) {
                    item.serialNumbers = [];
                    console.error(`Lỗi khi lấy serial cho sản phẩm ${item.sanPhamChiTiet.id}:`, err);
                }
            }
        },
        huyThanhToan() {
            this.muaNgayStore.clearMuaNgaySanPham(); // ✅ xoá khi huỷ
            this.$router.push({ name: 'SanPham' });
        },
        async apDungMaGiamGia() {
            if (!this.maGiamGia) return;

            try {
                const res = await getVoucherByCode(this.maGiamGia.trim());
                this.selectedVoucher = res.data;
            } catch (err) {
                console.error("Không tìm thấy mã giảm giá:", err);
                this.selectedVoucher = null;
                alert("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
            }
        },
        async handleThanhToan() {
            const thanhToanStore = useThanhToanStore();
            const gioHangStore = useGioHangStore();

            const serialIds = this.selectedItems.flatMap(item =>
                (item.serialNumbers || []).map(sn => sn.id)
            );

            const request = {
                thongTinKhachHang: {
                    hoTen: this.thongTinKhachHang.hoTen,
                    email: this.thongTinKhachHang.email,
                    soDienThoai: this.thongTinKhachHang.soDienThoai,
                    duong: this.thongTinKhachHang.duong,
                    phuongXa: this.selectedWard?.WardName || '',
                    quanHuyen: this.selectedDistrict?.DistrictName || '',
                    tinhThanh: this.selectedProvince?.ProvinceName || '',
                },
                serialIds: serialIds,
                phuongThucThanhToan: this.phuongThucThanhToan,
            };

            try {
                let res;
                if (this.muaNgayStore.muaNgaySanPham) {
                    res = await this.muaNgayStore.muaNgay({
                        ...request,
                        sanPhamChiTietId: this.muaNgayStore.muaNgaySanPham.id,
                        soLuong: this.muaNgayStore.muaNgaySanPham.soLuong || 1
                    });
                    this.muaNgayStore.clearMuaNgaySanPham();
                } else {
                    if (!gioHangStore.gioHangId) {
                        alert("Giỏ hàng không hợp lệ. Vui lòng thử lại!");
                        return;
                    }

                    request.thongTinKhachHang = {
                        ...request.thongTinKhachHang,
                        sanPhamChiTietIds: this.selectedItems.map(i => i.sanPhamChiTiet.id),
                        soLuong: this.selectedItems.map(i => i.soLuong),
                    };

                    res = await thanhToanStore.thanhToanOnline(request);
                    await gioHangStore.clearCart();
                }
                alert("Thanh toán thành công!");
                this.$router.push({
                    name: 'ThanhToanThanhCong',
                    params: { maHoaDon: res.maHoaDon }
                });
            } catch (err) {
                alert("Thanh toán thất bại. Vui lòng thử lại!");
                console.error("Lỗi khi thanh toán:", err);
            }
        }
    },

    watch: {
        selectedProvince(newVal) {
            this.selectedDistrict = null;
            this.selectedWard = null;
            this.districts = [];
            this.wards = [];
            if (newVal) this.fetchDistricts();
        },
        selectedDistrict(newVal) {
            this.selectedWard = null;
            this.wards = [];
            if (newVal) this.fetchWards();
        }
    }
};
</script>
