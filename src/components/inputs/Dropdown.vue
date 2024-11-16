<template>
  <details class="input-dropdown">
    <summary>
      <slot name="summary" />
    </summary>
    <ul>
      <slot />
    </ul>
  </details>
</template>
<style scoped>
.input-dropdown {
  position: relative;

  & summary {
    list-style: none;
    outline: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  & ul {
    position: absolute;
    right: 0;
    top: calc(100% + 0.5rem);
    width: 12rem;
    padding: 0.5rem 0.75rem;
    z-index: 50;
    opacity: 0;
    background-color: theme('colors.background');
    border-radius: 8px;
    box-shadow: theme('boxShadow.md');
  }

  &[open] ul {
    opacity: 1;
  }
}
</style>
