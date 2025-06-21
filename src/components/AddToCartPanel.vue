<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">✕</button>

      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Chọn cấu hình</h2>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="font-semibold text-gray-700 block mb-1">RAM</label>
            <select v-model="selectedRam" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn RAM</option>
              <option v-for="ram in uniqueRams" :key="ram" :value="ram">
                RAM #{{ ram }}
              </option>
            </select>
          </div>

          <div>
            <label class="font-semibold text-gray-700 block mb-1">Màu sắc</label>
            <select v-model="selectedColor" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn màu</option>
              <option v-for="color in uniqueColors" :key="color" :value="color">
                Màu #{{ color }}
              </option>
            </select>
          </div>

          <div>
            <label class="font-semibold text-gray-700 block mb-1">CPU</label>
            <select v-model="selectedCpu" class="w-full border p-2 rounded-lg">
              <option disabled value="">Chọn CPU</option>
              <option v-for="cpu in uniqueCpus" :key="cpu" :value="cpu">
                CPU #{{ cpu }}
              </option>
            </select>
          </div>
        </div>

        <button @click="xacNhan"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  chiTietSanPhams: Array
})
const emit = defineEmits(['chonSPCT', 'close'])

const selectedRam = ref('')
const selectedColor = ref('')
const selectedCpu = ref('')

const uniqueRams = computed(() => [...new Set(props.chiTietSanPhams.map(ct => ct.ramId))])
const uniqueColors = computed(() => [...new Set(props.chiTietSanPhams.map(ct => ct.mauSacId))])
const uniqueCpus = computed(() => [...new Set(props.chiTietSanPhams.map(ct => ct.cpuId))])

const selectedOption = computed(() => {
  return props.chiTietSanPhams.find(ct =>
    ct.ramId === selectedRam.value &&
    ct.mauSacId === selectedColor.value &&
    ct.cpuId === selectedCpu.value
  )
})

const xacNhan = () => {
  if (!selectedOption.value) {
    alert('Vui lòng chọn đầy đủ cấu hình!');
    return;
  }
  emit('chonSPCT', selectedOption.value)
}

watch(() => props.chiTietSanPhams, () => {
  selectedRam.value = ''
  selectedColor.value = ''
  selectedCpu.value = ''
})
</script>
