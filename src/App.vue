<template>
  <div>
    <Navbar />
    <router-view />
     <div id="chatbot-button"
            class="fixed bottom-4 right-4 bg-indigo-400 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-indigo-500 transition"
            @click="toggleChat">
            <i class="fas fa-robot text-2xl"></i>
        </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Navbar, Footer }
};
</script>
