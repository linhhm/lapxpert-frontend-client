<template>
    <div class="max-w-screen-xl mx-auto px-4 py-10">
      <!-- Phần chính -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Ảnh sản phẩm -->
        <div class="relative">
          <img :src="product.image" alt="" class="w-full rounded-xl object-contain h-[400px] shadow-lg"/>
          <!-- Ảnh phụ -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 bg-opacity-70 bg-gray-900 py-2 rounded-b-xl">
            <img v-for="(img, index) in product.gallery" :key="index" :src="img" class="w-16 h-16 object-cover rounded-lg border hover:scale-105 transition-all"/>
          </div>
        </div>
  
        <!-- Thông tin sản phẩm -->
        <div class="space-y-6">
          <h1 class="text-3xl font-bold text-white">{{ product.name }}</h1>
          <div class="flex items-center space-x-4">
            <div class="flex items-center text-yellow-500">
              <span class="mr-2">⭐ {{ product.rating }}</span>
              <span class="text-white text-sm">({{ product.reviews }} đánh giá)</span>
            </div>
            <div class="text-green-600 font-semibold">Còn hàng</div>
          </div>
          <div class="text-3xl font-bold text-justify text-blue-600">{{ formatPrice(product.price) }}</div>
          <p class="text-justify text-white">{{ product.description }}</p>
  
          <!-- Thông tin chi tiết -->
          <div class="space-y-2 text-justify">
            <b>Loại:</b> {{ product.type }}<br>
            <b>Màu:</b> {{ product.color }}<br>
            <b>Chất liệu:</b> {{ product.material }}<br>
            <b>Hãng:</b> {{ product.brand }}<br>
          </div>
  
          <!-- Chọn size + số lượng -->
          <div class="flex items-center gap-6">
            <select v-model="selectedSize" class="border rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option v-for="size in product.sizes" :key="size">{{ size }}</option>
            </select>
            <input type="number" v-model.number="quantity" min="1" class="border rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"/>
          </div>
  
          <!-- Nút hành động -->
          <div class="flex gap-6">
            <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl transition-all">Mua ngay</button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
  
      <!-- Mô tả kỹ thuật -->
      <div class="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl text-black font-bold mb-4">Thông số kỹ thuật</h2>
        <table class="table-auto text-sm text-black w-full">
          <tbody>
            <tr><td class="pr-4 pl-24 text-right font-semibold">Màn hình:</td><td class="text-justify">{{ product.specs.display }}</td></tr>
            <tr><td class="pr-4 pl-24 text-right font-semibold">CPU:</td><td class="text-justify">{{ product.specs.cpu }}</td></tr>
            <tr><td class="pr-4 pl-24 text-right font-semibold">Camera:</td><td class="text-justify">{{ product.specs.camera }}</td></tr>
            <tr><td class="pr-4 pl-24 text-right font-semibold">RAM:</td><td class="text-justify">{{ product.specs.ram }}</td></tr>
            <tr><td class="pr-4 pl-24 text-right font-semibold">Đồ họa:</td><td class="text-justify">{{ product.specs.gpu }}</td></tr>
          </tbody>
        </table>
      </div>
  
      <!-- Sản phẩm tương tự -->
      <div class="mt-12">
        <h2 class="text-xl font-bold mb-4">Sản phẩm tương tự</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="item in relatedProducts" :key="item.id" class="border rounded-lg p-4 hover:shadow-md transition-all">
            <img :src="item.image" class="w-full h-40 object-cover mb-4 rounded-md"/>
            <p class="font-semibold text-sm">{{ item.name }}</p>
            <p class="text-blue-600 font-bold">{{ formatPrice(item.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSize: "512GB - 8 GB RAM",
        quantity: 1,
        product: {
          id: 1,
          name: "Laptop Gaming Lenovo Legion 5",
          price: 9710000,
          rating: 4.5,
          reviews: 154,
          image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg",
          gallery: [
            "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg",
            "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg",
          ],
          description: "Laptop Lenovo Legion 5 là dòng máy gaming tầm trung nổi bật với hiệu năng mạnh mẽ, thiết kế hiện đại và độ bền cao. Máy được trang bị vi xử lý AMD Ryzen hoặc Intel thế hệ mới, kết hợp card đồ họa NVIDIA GeForce RTX, mang lại trải nghiệm chơi game mượt mà và xử lý đa nhiệm hiệu quả. Màn hình 15.6 inch Full HD với tần số quét cao giúp hiển thị hình ảnh sắc nét và sống động. Bàn phím RGB, hệ thống tản nhiệt tốt cùng âm thanh sống động khiến Legion 5 trở thành lựa chọn lý tưởng cho cả game thủ và người dùng chuyên nghiệp.",
          type: "Regular",
          color: "Đen",
          material: "Kim Loại",
          brand: "Lenovo",
          sizes: ["512GB - 8 GB RAM", "1TB - 16 GB RAM", "2TB - 32 GB RAM"],
          specs: {
            display: "13.3-inch LED-backlit display with IPS",
            cpu: "2.3GHz dual-core Intel Core i5",
            camera: "720p FaceTime HD camera",
            ram: "8 GB RAM",
            gpu: "Intel Iris Plus Graphics 640"
          }
        },
        relatedProducts: [
          { id: 2, name: "Laptop Gaming Lenovo Legion 5", price: 9710000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
          { id: 3, name: "Laptop Gaming Lenovo Legion 5", price: 9710000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
          { id: 4, name: "Laptop Gaming Lenovo Legion 5", price: 9710000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" },
          { id: 5, name: "Laptop Gaming Lenovo Legion 5", price: 9710000, image: "https://cdn.tgdd.vn/Products/Images/44/328235/asus-gaming-tuf-f15-fx507zc4-i5-hn330w-2-750x500.jpg" }
        ]
      };
    },
    methods: {
      formatPrice(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tùy chỉnh các lớp để tạo giao diện mượt mà và chuyên nghiệp */
  </style>
  