<template>
  <div class="w-full overflow-x-auto">
    <div class="image-upload">
      <div v-for="(img, idx) in listThumb" class="image-thumbnail" :key="idx">
        <img :src="img" alt="thumbnail" />
        <span class="btn-delete" @click="deleteImage(idx)">✕</span>
      </div>
      <div v-if="maxCount >= listThumb.length" class="upload-box" @click="clickFileInput">
        이미지 업로드
      </div>
      <input type="file" multiple ref="fileSelectRef" @change="handleFileChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const listFile = ref<File[]>([])
const listThumb = ref<string[]>([])
const fileSelectRef = ref<HTMLInputElement>()
const props = defineProps<{
  maxCount: number
}>()

defineExpose({ checkout })

function handleFileChange() {
  console.log('handleFileChange')
  const listImage = fileSelectRef.value!.files
  const images = Array.from(listImage || [])
  images.forEach((img) => {
    listFile.value.push(img)
    const reader = new FileReader()
    reader.onload = (e) => {
      listThumb.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(img)
  })
}

function checkout() {
  return listFile.value
}

function clickFileInput() {
  console.log('clickFileInput')
  fileSelectRef.value!.click()
}

function deleteImage(idx: number) {
  console.log('deleteImage', idx)
  listThumb.value.splice(idx, 1)
  listFile.value.splice(idx, 1)
}
</script>
<style scoped>
.image-upload {
  --img-size: 160px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  width: min-content;

  & input {
    display: none;
  }

  & .image-thumbnail {
    position: relative;
    width: var(--img-size);
    height: var(--img-size);
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-delete {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 0.875rem;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  & .upload-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--img-size);
    height: var(--img-size);
    background-color: #f0f0f0;
    border-radius: 8px;
    color: #666;
    font-size: 0.875rem;
    cursor: pointer;
  }
}
</style>
