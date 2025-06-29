<template>
    <section class="py-12 px-6 bg-gradient-to-r from-red-300 to-orange-200 text-blue-700 text-center">
        <h2 class="text-4xl font-bold text-white">🎉 Sự Kiện Khuyến Mãi Lớn 🎉</h2>
        <p class="text-lg mt-2 text-white">Cơ hội mua sắm với giá cực sốc! Nhanh tay trước khi hết hạn!</p>

        <!-- Sử dụng grid-responsive cho các độ phân giải khác nhau -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            <div v-for="event in events" :key="event.id"
                class="p-6 bg-white text-black rounded-lg shadow-lg relative transform hover:scale-105 hover:shadow-2xl transition duration-300">
                <span class="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold z-10">
  {{ event.discount }}% OFF
</span>

                <img :src="event.image" :alt="event.title"
                    class="w-full h-48 object-cover rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                <h3 class="mt-4 text-2xl font-semibold text-gray-800">{{ event.title }}</h3>
                <p class="mt-2 text-gray-600">{{ event.description }}</p>
                <p class="text-sm text-red-500 mt-1">⏳ Hết hạn: {{ event.deadline }}</p>
                <p class="mt-2 text-lg font-bold text-red-500">
                    {{ event.price }} VND
                    <span v-if="event.originalPrice" class="line-through text-gray-500">
                        {{ event.originalPrice }} VND
                    </span>
                </p>
                <router-link :to="event.link">
                    <button class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                        {{ event.cta || 'Xem chi tiết' }}
                    </button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            events: [
                {
                    id: 1,
                    title: "Black Friday",
                    description: "Giảm giá cực sốc lên đến 50% cho tất cả sản phẩm công nghệ!",
                    discount: 50,
                    price: "14.990.000",
                    originalPrice: "29.990.000",
                    image: "https://cdn.tgdd.vn/Products/Images/44/316941/msi-gaming-gf63-thin-12uc-i7-887vn-glr-2-750x500.jpg",
                    link: "/",
                    cta: "Mua ngay",
                    deadline: "30/11/2025"
                },
                {
                    id: 2,
                    title: "Sale Tết 2025",
                    description: "Ưu đãi đặc biệt đón năm mới, mua ngay để nhận quà tặng hấp dẫn!",
                    discount: 30,
                    price: "20.990.000",
                    originalPrice: "29.990.000",
                    image: "https://cdn.tgdd.vn/Products/Images/44/322072/lenovo-loq-gaming-15iax9-i5-83gs000jvn-hinh-15-750x500.jpg",
                    link: "/",
                    cta: "Mua ngay",
                    deadline: "01/02/2025"
                },
                {
                    id: 3,
                    title: "Flash Sale 12.12",
                    description: "Chỉ trong hôm nay! Giảm giá cực mạnh, nhanh tay kẻo lỡ!",
                    discount: 40,
                    price: "17.990.000",
                    originalPrice: "29.990.000",
                    image: "https://cdn.tgdd.vn/Products/Images/44/328944/dell-inspiron-15-3520-i5-71043883-5-750x500.jpg",
                    link: "/",
                    cta: "Mua ngay",
                    deadline: "12/12/2025"
                },
                {
                    id: 4,
                    title: "Giảm Giá Mùa Hè",
                    description: "Mùa hè này, giảm giá lên đến 40% cho các sản phẩm gia dụng!",
                    discount: 40,
                    price: "3.990.000",
                    originalPrice: "6.500.000",
                    image: "https://cdn.tgdd.vn/Products/Images/44/330599/robot-hut-bui-xiaomi-robot-vacuum-mop-pro-1-750x500.jpg",
                    link: "/",
                    cta: "Mua ngay",
                    deadline: "15/06/2025"
                },
                {
                    id: 5,
                    title: "Flash Sale 11.11",
                    description: "Mua 1 tặng 1, chỉ trong ngày 11.11! Giảm giá siêu sốc!",
                    discount: 70,
                    price: "999.000",
                    originalPrice: "3.500.000",
                    image: "https://cdn.tgdd.vn/Products/Images/44/330699/smartphone-xiaomi-redmi-note-12-1-750x500.jpg",
                    link: "/",
                    cta: "Mua ngay",
                    deadline: "11/11/2025"
                },
                {
                    id: 6,
                    title: "Khuyến Mãi Sinh Nhật",
                    description: "Chúc mừng sinh nhật, giảm giá đặc biệt cho tất cả sản phẩm!",
                    discount: 25,
                    price: "1.990.000",
                    originalPrice: "2.500.000",
                    image: "https://cdn.tgdd.vn/Products/Images/44/318001/smartwatch-xiaomi-mi-watch-lite-1-750x500.jpg",
                    link: "/",
                    cta: "Mua ngay",
                    deadline: "20/10/2025"
                }
            ]
        };
    }
};
</script>