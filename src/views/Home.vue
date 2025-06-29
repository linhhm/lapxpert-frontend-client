<template>
  <div class="min-h-screen bg-blue-50">
    <section id="slideshow">
      <Slideshow />
    </section>
    <section id="danhMucSP">
      <DanhMucSP />
    </section>
    <section id="phieuGiamGia">
      <PhieuGiamGia />
    </section>
    <section id="dotGiamGia">
      <DotGiamGia />
    </section>
    <section id="hoTro">
      <HoTro />
    </section>
  </div>
</template>

<script>
import Slideshow from "../components/Slideshow.vue";
import DanhMucSP from "../components/DanhMucSP.vue";
import PhieuGiamGia from "../components/PhieuGiamGia.vue";
import DotGiamGia from "../components/DotGiamGia.vue";
import HoTro from "../components/HoTro.vue";

export default {
  components: {
    Slideshow,
    DanhMucSP,
    PhieuGiamGia,
    DotGiamGia,
    HoTro
  }
};
</script>
