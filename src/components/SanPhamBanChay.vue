<template>
    <div class="relative">
      <swiper :modules="[Navigation, Autoplay]" :slides-per-view="1" :space-between="20" :loop="true"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :breakpoints="{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }" class="swiper-container">
  
        <swiper-slide v-for="product in products" :key="product.slug">
          <div class="p-5 border border-gray-200 rounded-2xl shadow bg-white text-center hover:shadow-lg transition">
            <img :src="product.image" :alt="product.name" class="w-full aspect-[4/3] object-contain rounded-xl">
            <h3 class="mt-3 font-semibold text-lg text-gray-900">{{ product.name }}</h3>
            <div class="flex items-center justify-center gap-2 mt-2">
              <del class="text-gray-500 text-sm">{{ formatPrice(product.originalPrice) }}</del>
              <p class="text-red-500 font-bold text-lg">{{ formatPrice(product.price) }}</p>
            </div>
            <router-link :to="`/product/${product.slug}`"
              class="mt-3 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all inline-block">
              Mua ngay
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
  
      <button class="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-200 text-blue-300 p-3 shadow-md">
      </button>
      <button class="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-200 text-blue-300 p-3 shadow-md">
      </button>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/autoplay";
  
  export default {
    components: { Swiper, SwiperSlide },
    props: {
      products: Array
    },
    setup() {
      return { Navigation, Autoplay };
    },
    methods: {
      formatPrice(price) {
        return Number(price).toLocaleString("vi-VN") + " VND";
      }
    }
  };
  </script>
  