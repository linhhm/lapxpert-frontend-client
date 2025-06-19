<template>
  <div
    class="relative w-full h-[400px] overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl shadow-xl"
    @mouseenter="pause = true" @mouseleave="pause = false">
    <!-- Slide Images -->
    <div v-for="(slide, index) in slides" :key="index"
      class="absolute inset-0 transition-all duration-1000 ease-in-out flex justify-center items-center" :class="{
        'opacity-100 scale-100 z-10': index === currentSlide,
        'opacity-0 scale-95 z-0': index !== currentSlide
      }">
      <img :src="slide.image" alt="Slide Image"
        class="max-h-[240px] w-auto object-contain rounded-xl shadow-xl border border-white" />
    </div>

    <!-- Overlay Text -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent rounded-2xl flex flex-col justify-center items-start px-12 z-20">
      <transition name="slide-fade" mode="out-in">
        <div :key="currentSlide">
          <h1 class="text-white text-5xl font-black drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-3 leading-tight">
            Chào mừng đến với <span class="text-blue-400">LapXpert</span>
          </h1>
          <p class="text-white text-lg font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] tracking-wide mb-4">
            Khám phá trải nghiệm mua sắm laptop đỉnh cao, chuyên nghiệp và uy tín.
          </p>
          <button @click="$router.push('/SanPham')"
            class="mt-6 px-6 py-2 border-2 border-white text-white font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition duration-300">
            Khám phá ngay
          </button>

        </div>
      </transition>
    </div>

    <!-- Slide Controls -->
    <button @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-blue-100 transition z-30">
      <i class="fa-solid fa-chevron-left text-blue-500 text-xl"></i>
    </button>
    <button @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-blue-100 transition z-30">
      <i class="fa-solid fa-chevron-right text-blue-500 text-xl"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/334689/gigabyte-g5-mf5-rc555-i5-9rc55mf5feiaa1vn0c0-2-638766105805495419-750x500.jpg"
        },
        {
          image: "https://cdn.tgdd.vn/Products/Images/44/323920/hp-15-fd0234tu-i5-9q969pa-1-1-750x500.jpg"
        },
        {
          image: "https://cdn.tgdd.vn/Products/Images/44/313333/lenovo-ideapad-slim-3-15iah8-i5-83er00evn-glr-2-750x500.jpg"
        }
      ],
      currentSlide: 0,
      pause: false
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    autoSlide() {
      setInterval(() => {
        if (!this.pause) {
          this.nextSlide();
        }
      }, 6000); // giữ 6 giây
    }
  },
  mounted() {
    this.autoSlide();
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s ease;
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
</style>