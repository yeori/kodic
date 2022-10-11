<script>
  import SearchView from './view/SearchView.svelte'
  import TopNav from './view/TopNav.svelte'
</script>

<main>
  <TopNav />
  <div class="main-area">
    <SearchView />
  </div>
</main>

<style lang="scss">
  main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    .main-area {
      flex: 1 1 auto;
      overflow-y: hidden;
      display: flex;
    }
  }
</style>
