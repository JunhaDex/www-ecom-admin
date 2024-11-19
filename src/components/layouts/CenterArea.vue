<template>
  <main>
    <slot />
  </main>
</template>
<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding: var(--header-height) 1rem var(--footer-height) 1rem;
  @media (min-width: 768px) {
    padding: var(--header-height) 4rem var(--footer-height) 4rem;
  }
}
</style>
