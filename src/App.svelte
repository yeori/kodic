<script>
  import SearchView from './view/SearchView.svelte'
  import TopNav from './view/TopNav.svelte'
  import env from './service/env'
  console.log('[ENV]', env)
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
