<template>
  <button class="btn" :disabled="disabled">
    <i v-if="prefixIcon" class="icon" :style="prefixIconStyle"></i>
    <slot />
    <i v-if="suffixIcon" class="icon" :style="suffixIconStyle"></i>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  prefixIcon?: string
  suffixIcon?: string
  disabled?: boolean
}>()
const prefixIconStyle = computed(() => ({
  '--icon-url': props.prefixIcon ? `url("${props.prefixIcon}")` : 'none',
}))

const suffixIconStyle = computed(() => ({
  '--icon-url': props.suffixIcon ? `url("${props.suffixIcon}")` : 'none',
}))
</script>
<style scoped>
.icon {
  width: 1.4rem; /*match the line-height 1.5 of other btns*/
  height: 1.4rem;
  mask-image: var(--icon-url);
  -webkit-mask-image: var(--icon-url);
  background-color: currentColor;
}
</style>
