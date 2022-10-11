<script>
  export let text = 'TEXT'
  export let theme = 'black'
</script>

<span class="kw {theme}">{text}</span>

<style lang="scss">
  .kw {
    font-size: 0.9rem;
    padding: 2px 6px;
    border-radius: 4px;
    &.black {
      background-color: black;
      color: #ccc;
    }
    &.green {
      background-color: rgb(19, 50, 1);
      color: rgb(226, 255, 180);
    }
    &.blue {
      background-color: #002780;
      color: #b1dcff;
    }
  }
</style>
