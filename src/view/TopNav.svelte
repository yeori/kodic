<script>
  import logo from '../assets/logo.svg'
  import { uiStore } from '../store/ui-store'
  import AppIcon from '../component/AppIcon.svelte'
  const menus = [{ text: 'home' }, { text: 'favorite' }]
</script>

<nav>
  <div class="logo" style="--logo-path: url('{logo}')" />
  {#each menus as m}
    <div class="menu">{m.text}</div>
  {/each}

  {#if !$uiStore.online}
    <div class="offline">
      <AppIcon class="red" icon="signal_disconnected" />
    </div>
  {/if}
</nav>

<style lang="scss">
  nav {
    display: flex;
    .logo {
      width: 32px;
      height: 32px;
      background-image: var(--logo-path);
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .menu {
      padding: 4px 8px;
    }
    .offline {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 16px;
      .red {
        color: crimson;
      }
    }
  }
</style>
