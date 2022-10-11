<script>
  export let icon = ''
  export let filled = false
  export let color = null
  export let fsize = null
</script>

<span
  class={`icon material-symbols-outlined ${$$props.class || ''}`}
  class:filled
  style="--fg-color: {color || 'inherite'}; --font-size: {fsize || '24px'}"
  >{icon}</span
>

<!-- markup (zero or more items) goes here -->
<style lang="scss">
  .icon {
    user-select: none;
    color: var(--fg-color);
    &.material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
      font-size: var(--font-size);
      &.filled {
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
      }
    }
  }
</style>
