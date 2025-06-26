import { createRouter, createWebHistory } from 'vue-router';
import home from './views/Home.vue';
import SanPham from './views/SanPham.vue';
import Slideshow from "../src/components/Slideshow.vue";
import DanhMucSP from "../src/components/DanhMucSP.vue";
import PhieuGiamGia from "../src/components/PhieuGiamGia.vue";
import DotGiamGia from "../src/components/DotGiamGia.vue";
import HoTro from "../src/components/HoTro.vue";
import TraCuuDon from "../src/components/TraCuuDon.vue";
import ChiTietSanPham from "../src/views/ChiTietSanPham.vue";
import TatCaPhieu from "../src/views/TatCaPhieu.vue";
import TrangDotGiamGia from "../src/views/TrangDotGiamGia.vue";
import HoTroKhachHang from "../src/views/HoTroKhachHang.vue";
import Chat from "../src/views/Chat.vue";
import GioHang from "../src/views/GioHang.vue";
import ThanhToan from "../src/views/ThanhToan.vue";


const routes = [
  { path: '/', component: home },
  { path: '/slideshow', component: Slideshow },
  { path: '/danhMucSP', component: DanhMucSP },
  { path: '/phieuGiamGia', component: PhieuGiamGia },
  { path: '/dotGiamGia', component: DotGiamGia },
  { path: '/hoTro', component: HoTro },
  { path: '/sanPham',name: 'SanPham', component: SanPham },
  { path: '/tatCaPhieuGiamGia', component: TatCaPhieu },
  { path: '/trangDotGiamGia', component: TrangDotGiamGia },
  { path: '/chitietsanPham', component: ChiTietSanPham },
  { path: '/hoTroKhachHang', component: HoTroKhachHang },
  { path: '/chat', component: Chat },
  { path: '/gioHang',name: 'GioHang', component: GioHang },
  { path: '/thanhToan',name: 'ThanhToan', component: ThanhToan },
  { path: '/traCuuDon',name: 'TraCuuDon', component: TraCuuDon },
  {
    path: '/chiTietSanPham/:id',
    component: ChiTietSanPham,
    props: true // Để truyền tham số vào component
  },
  {
  path: '/thanhCong',
  name: 'ThanhToanThanhCong',
  component: () => import('../src/views/ThanhToanThanhCong.vue')
}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // Luôn cuộn lên đầu khi chuyển route
  }
});


export default router;
