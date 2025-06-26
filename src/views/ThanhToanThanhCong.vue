<template>
    <div class="p-6 bg-gradient-to-b from-blue-100 via-purple-100 to-white min-h-screen">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h1 class="text-3xl font-bold text-blue-900 text-center mb-6">🎉 Cùng xem đơn hàng của ban!</h1>

            <!-- Nếu bị hủy -->
            <div v-if="hoaDon.trangThai === 'DA_HUY'" class="text-center mb-8">
                <div
                    class="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto shadow-lg">
                    <i class="fas fa-times text-2xl"></i>
                </div>
                <p class="text-red-600 mt-2 font-bold text-lg">Đơn hàng đã bị hủy</p>
            </div>

            <!-- Tiến trình đơn hàng chính -->
            <div v-else class="flex justify-between items-center relative mb-10">
                <div v-for="(step, index) in trangThaiSteps" :key="step.value" class="flex-1 text-center relative">
                    <div v-if="index < trangThaiSteps.length - 1" class="absolute top-6 left-1/2 w-full h-1 z-0" :class="{
                        'bg-indigo-400': isStepDone(trangThaiSteps[index + 1].value),
                        'bg-gray-300': !isStepDone(trangThaiSteps[index + 1].value)
                    }" style="transform: translateX(50%)">
                    </div>
                    <div :class="['z-10 relative w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white shadow-lg',
                        isStepDone(step.value) ? getStatusColor(step.value) : 'bg-gray-300 text-gray-500']">
                        <i :class="step.icon" class="text-xl"></i>
                    </div>

                    <div
                        :class="['mt-2 text-sm', isStepDone(step.value) ? 'text-blue-800 font-semibold' : 'text-gray-500']">
                        {{ step.label }}
                    </div>
                </div>
            </div>

            <!-- Tiến trình hoàn trả -->
            <div v-if="isReturnInvolved()" class="mb-10">
                <h2 class="text-lg font-bold text-purple-700 mb-4">🔁 Tiến trình hoàn trả</h2>
                <div class="flex items-center justify-start space-x-10">

                    <!-- Bước 1: Yêu cầu trả hàng -->
                    <div class="flex flex-col items-center">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                            :class="isReturnStepDone('YEU_CAU_TRA_HANG') ? 'bg-yellow-600' : 'bg-gray-300'">
                            <i class="fas fa-undo"></i>
                        </div>
                        <p class="mt-2 text-sm font-semibold"
                            :class="isReturnStepDone('YEU_CAU_TRA_HANG') ? 'text-yellow-700' : 'text-gray-500'">
                            Yêu cầu trả hàng
                        </p>
                    </div>

                    <!-- Thanh nối -->
                    <div class="w-12 h-1 rounded transition-all duration-300" :class="hoaDon.trangThai === 'TRA_HANG_KHONG_THANH_CONG' || isReturnStepDone('DA_TRA_HANG')
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'">
                    </div>

                    <!-- Nếu KHÔNG phải là thất bại, thì hiện bước "Đã trả hàng" và thanh nối tiếp theo -->
                    <template v-if="hoaDon.trangThai !== 'TRA_HANG_KHONG_THANH_CONG'">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                                :class="isReturnStepDone('DA_TRA_HANG') ? 'bg-purple-700' : 'bg-gray-300'">
                                <i class="fas fa-box-open"></i>
                            </div>
                            <p class="mt-2 text-sm font-semibold"
                                :class="isReturnStepDone('DA_TRA_HANG') ? 'text-purple-700' : 'text-gray-500'">
                                Đã trả hàng
                            </p>
                        </div>

                        <div class="w-12 h-1 rounded transition-all duration-300"
                            :class="isReturnStepDone('DA_HOAN_TIEN') ? 'bg-green-500' : 'bg-gray-300'">
                        </div>
                    </template>
                    <!-- Ngược lại (trả hàng thất bại) thì hiện luôn thanh đỏ ngắn hơn -->
                    <template v-else>
                        <div class="w-12 h-1 rounded transition-all duration-300 bg-red-500"></div>
                    </template>

                    <!-- Bước 3: Đã hoàn tiền hoặc Trả hàng thất bại -->
                    <div class="flex flex-col items-center">
                        <div v-if="hoaDon.trangThai === 'TRA_HANG_KHONG_THANH_CONG'"
                            class="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg bg-red-600">
                            <i class="fas fa-ban"></i>
                        </div>
                        <div v-else class="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                            :class="isReturnStepDone('DA_HOAN_TIEN') ? 'bg-green-700' : 'bg-gray-300'">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <p class="mt-2 text-sm font-semibold" :class="hoaDon.trangThai === 'TRA_HANG_KHONG_THANH_CONG'
                            ? 'text-red-600'
                            : isReturnStepDone('DA_HOAN_TIEN')
                                ? 'text-green-700'
                                : 'text-gray-500'">
                            {{ hoaDon.trangThai === 'TRA_HANG_KHONG_THANH_CONG' ? 'Trả hàng thất bại' : 'Đã hoàn tiền'
                            }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Thông tin đơn hàng -->
            <div class="space-y-4" v-if="hoaDon">
                <div class="text-blue-800 font-medium">
                    <p>Mã hóa đơn: <strong>{{ hoaDon.maHoaDon }}</strong></p>
                    <p>Ngày đặt: {{ formatDate(hoaDon.ngayTao) }}</p>
                    <p>Trạng thái: <span :class="getStatusClass(hoaDon.trangThai)">{{ hoaDon.trangThai }}</span></p>
                </div>

                <!-- Sản phẩm -->
                <div class="mt-4 space-y-3">
                    <div v-for="ct in hoaDon.chiTietHoaDons" :key="ct.id"
                        class="flex justify-between items-center bg-purple-50 border border-purple-200 p-3 rounded-md shadow-sm">
                        <div>
                            <p class="text-indigo-900 font-semibold">{{ ct.sanPhamChiTiet.sanPham.tenSanPham }}</p>
                            <p class="text-sm text-gray-600">Số lượng: {{ ct.soLuong }}</p>
                            <p class="text-sm text-gray-600">Đơn giá: {{ formatPrice(ct.gia) }}</p>
                        </div>
                        <div class="text-right text-blue-700 font-semibold">
                            {{ formatPrice(ct.soLuong * ct.gia) }}
                        </div>
                    </div>
                </div>

                <div class="text-right mt-4 text-xl text-indigo-800 font-bold">
                    Tổng tiền: {{ formatPrice(hoaDon.tongTien) }}
                </div>
            </div>

            <div v-else class="text-center text-gray-500 mt-10">
                Đang tải thông tin đơn hàng...
            </div>

            <!-- Nút mở modal timeline -->
            <div class="mt-8 text-center">
                <button @click="showTimeline = true"
                    class="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
                    🕓 Xem tiến trình đơn hàng
                </button>
            </div>

            <!-- Modal timeline -->
            <div v-if="showTimeline" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative animate-fade-in-up">
                    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        @click="showTimeline = false">
                        <i class="fas fa-times"></i>
                    </button>
                    <h2 class="text-xl font-bold text-indigo-700 mb-4">🕓 Timeline đơn hàng</h2>
                    <div class="relative border-l-2 border-indigo-300 pl-6 max-h-96 overflow-y-auto">
                        <div v-for="log in fakeTimeline" :key="log.trangThai" class="mb-6 relative group">
                            <span
                                class="absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center shadow-md ring-2 ring-white"
                                :class="[getStatusColor(log.trangThai), 'text-white']">
                                <i class="fas fa-check text-xs"></i>
                            </span>
                            <div
                                class="bg-indigo-50 p-4 rounded-lg shadow-sm group-hover:bg-white transition-all duration-200">
                                <h3 class="text-sm font-semibold text-indigo-700">{{ log.label }}</h3>
                                <p class="text-xs text-gray-500">{{ formatDate(log.thoiGian) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Nút test trạng thái -->
            <div class="mt-10 text-center space-x-2 flex flex-wrap justify-center">
                <button v-for="tr in testStatuses" :key="tr.value" @click="hoaDon.trangThai = tr.value"
                    :class="tr.class + ' text-white px-3 py-2 rounded shadow-sm'">
                    {{ tr.label }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showTimeline: false,
            fakeTimeline: [
                { trangThai: 'CHO_XAC_NHAN', label: 'Chờ xác nhận', thoiGian: '2025-06-22T09:00:00' },
                { trangThai: 'DA_XAC_NHAN', label: 'Đã xác nhận', thoiGian: '2025-06-22T10:00:00' },
                { trangThai: 'DANG_XU_LY', label: 'Đang xử lý', thoiGian: '2025-06-22T11:00:00' },
                { trangThai: 'CHO_GIAO_HANG', label: 'Chờ giao hàng', thoiGian: '2025-06-22T13:00:00' },
                { trangThai: 'DANG_GIAO_HANG', label: 'Đang giao hàng', thoiGian: '2025-06-22T15:00:00' },
                { trangThai: 'DA_GIAO_HANG', label: 'Đã giao hàng', thoiGian: '2025-06-22T18:00:00' },
                { trangThai: 'HOAN_THANH', label: 'Hoàn thành', thoiGian: '2025-06-22T20:00:00' }
            ],
            hoaDon: {
                maHoaDon: 'HD999999',
                ngayTao: new Date().toISOString(),
                trangThai: 'CHO_XAC_NHAN',
                tongTien: 35000000,
                chiTietHoaDons: [
                    {
                        id: 1,
                        soLuong: 1,
                        gia: 15000000,
                        sanPhamChiTiet: {
                            sanPham: {
                                tenSanPham: 'Laptop Asus Zenbook'
                            }
                        }
                    },
                    {
                        id: 2,
                        soLuong: 2,
                        gia: 10000000,
                        sanPhamChiTiet: {
                            sanPham: {
                                tenSanPham: 'Màn hình LG 24 inch'
                            }
                        }
                    }
                ]
            },
            trangThaiSteps: [
                { label: 'Chờ xác nhận', value: 'CHO_XAC_NHAN', icon: 'fas fa-clock' },
                { label: 'Đã xác nhận', value: 'DA_XAC_NHAN', icon: 'fas fa-check-circle' },
                { label: 'Đang xử lý', value: 'DANG_XU_LY', icon: 'fas fa-cogs' },
                { label: 'Chờ giao hàng', value: 'CHO_GIAO_HANG', icon: 'fas fa-truck-loading' },
                { label: 'Đang giao hàng', value: 'DANG_GIAO_HANG', icon: 'fas fa-shipping-fast' },
                { label: 'Đã giao hàng', value: 'DA_GIAO_HANG', icon: 'fas fa-box' },
                { label: 'Hoàn thành', value: 'HOAN_THANH', icon: 'fas fa-smile' }
            ],
            testStatuses: [
                { label: 'Chờ xác nhận', value: 'CHO_XAC_NHAN', class: 'bg-yellow-500' },
                { label: 'Đã xác nhận', value: 'DA_XAC_NHAN', class: 'bg-blue-400' },
                { label: 'Đang xử lý', value: 'DANG_XU_LY', class: 'bg-indigo-500' },
                { label: 'Chờ giao hàng', value: 'CHO_GIAO_HANG', class: 'bg-indigo-600' },
                { label: 'Đang giao hàng', value: 'DANG_GIAO_HANG', class: 'bg-blue-600' },
                { label: 'Đã giao hàng', value: 'DA_GIAO_HANG', class: 'bg-green-500' },
                { label: 'Hoàn thành', value: 'HOAN_THANH', class: 'bg-green-700' },
                { label: 'Yêu cầu trả', value: 'YEU_CAU_TRA_HANG', class: 'bg-yellow-600' },
                { label: 'Đã trả hàng', value: 'DA_TRA_HANG', class: 'bg-purple-600' },
                { label: 'Trả không thành công', value: 'TRA_HANG_KHONG_THANH_CONG', class: 'bg-red-600' },
                { label: 'Đã hoàn tiền', value: 'DA_HOAN_TIEN', class: 'bg-green-500' },
                { label: 'Đã hủy', value: 'DA_HUY', class: 'bg-red-700' }
            ]
        };
    },
    methods: {
        isReturnStepDone(step) {
            const trangThai = this.hoaDon.trangThai;

            // Nhánh trả hàng thất bại
            if (trangThai === 'TRA_HANG_KHONG_THANH_CONG') {
                return ['YEU_CAU_TRA_HANG', 'TRA_HANG_KHONG_THANH_CONG'].includes(step);
            }

            // Nhánh trả hàng thành công
            const steps = ['YEU_CAU_TRA_HANG', 'DA_TRA_HANG', 'DA_HOAN_TIEN'];
            const indexCurrent = steps.indexOf(trangThai);
            const indexStep = steps.indexOf(step);
            return indexStep <= indexCurrent && indexStep !== -1;
        },
         getStatusColor(status) {
            const map = {
                CHO_XAC_NHAN: 'bg-yellow-200 text-yellow-800',
                DA_XAC_NHAN: 'bg-blue-200 text-blue-800',
                DANG_XU_LY: 'bg-purple-200 text-purple-800',
                CHO_GIAO_HANG: 'bg-pink-200 text-pink-800',
                DANG_GIAO_HANG: 'bg-indigo-200 text-indigo-800',
                DA_GIAO_HANG: 'bg-green-200 text-green-800',
                HOAN_THANH: 'bg-emerald-200 text-emerald-800',

                DA_HUY: 'bg-red-200 text-red-800',
                YEU_CAU_TRA_HANG: 'bg-yellow-300 text-yellow-800',
                DA_TRA_HANG: 'bg-purple-300 text-purple-800',
                TRA_HANG_KHONG_THANH_CONG: 'bg-red-300 text-red-800',
                DA_HOAN_TIEN: 'bg-green-300 text-green-800'
            };
            return map[status] || 'bg-gray-300 text-gray-500';
        },
        formatDate(dateStr) {
            return new Date(dateStr).toLocaleString('vi-VN');
        },
        formatPrice(v) {
            return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        },
        getStatusClass(status) {
            const map = {
                DA_HUY: 'text-red-600 font-semibold',
                HOAN_THANH: 'text-green-700 font-semibold',
                DA_HOAN_TIEN: 'text-green-600 font-semibold'
            };
            return map[status] || 'text-blue-800 font-semibold';
        },
        isStepDone(stepValue) {
            const order = this.trangThaiSteps.map(s => s.value);
            const currentIndex = order.indexOf(this.hoaDon.trangThai);
            const stepIndex = order.indexOf(stepValue);
            return stepIndex <= currentIndex;
        },
        isReturnInvolved() {
            return ['YEU_CAU_TRA_HANG', 'DA_TRA_HANG', 'TRA_HANG_KHONG_THANH_CONG', 'DA_HOAN_TIEN'].includes(this.hoaDon.trangThai);
        }
    }
};
</script>
