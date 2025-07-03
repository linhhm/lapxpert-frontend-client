<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 mt-12 rounded-t-3xl shadow-inner">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Logo & Description -->
      <div>
        <h2 class="text-3xl font-bold text-blue-400 tracking-wide">LapXpert</h2>
        <p class="mt-3 text-gray-300 text-sm leading-relaxed">
          Chuyên cung cấp các sản phẩm laptop chất lượng cao, chính hãng, giá hợp lý. Dịch vụ uy tín - hỗ trợ tận tâm.
        </p>
      </div>

      <!-- Navigation Links -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-3">Danh mục</h3>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><router-link to="/san-pham?category=gaming" class="hover:text-blue-400 transition">Laptop Gaming</router-link></li>
          <li><router-link to="/san-pham?category=office" class="hover:text-blue-400 transition">Laptop Văn phòng</router-link></li>
          <li><router-link to="/san-pham?category=do-hoa" class="hover:text-blue-400 transition">Laptop Đồ họa</router-link></li>
          <li><router-link to="/san-pham?category=hoc-tap" class="hover:text-blue-400 transition">Laptop Học tập</router-link></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-3">Liên hệ</h3>
        <ul class="space-y-2 text-sm text-gray-300">
          <li>
            📧 Email: 
            <a href="mailto:hmailinh9@gmail.com" class="text-blue-400 hover:underline ml-1">hmailinh9@gmail.com</a>
          </li>
          <li>
            📞 Hotline: 
            <a href="tel:+84382400878" class="text-blue-400 hover:underline ml-1">+84 382 400 878</a>
          </li>
          <li>
            📍 Địa chỉ: 123 Nguyễn Trãi, Thanh Xuân, Hà Nội
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
      &copy; 2025 <span class="text-blue-400 font-semibold">LapXpert</span>. All Rights Reserved.
    </div>
  </footer>
</template>
