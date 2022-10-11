<script>
  import { createEventDispatcher } from 'svelte'
  import AppIcon from './AppIcon.svelte'
  import DictControl from './DictControl.svelte'
  import Keyword from './Keyword.svelte'
  export let def
  export let titleVisible = true
  export let activeDef = null
  const dispatch = createEventDispatcher()

  const defClicked = () => dispatch('selected', def)
  const requestCopy = () => dispatch('copy', def)

  const handleCommand = (e) => {
    const command = e.detail.type
    if (command === 'copy') {
      requestCopy()
    }
  }
</script>

<div class="def">
  {#if titleVisible}
    <div class="title">
      <h5>
        <span>{def.word}</span>{#if def.hanja}
          <!-- <span class="kw hanja">{def.hanja}</span> -->
          <Keyword text={def.hanja} />
        {/if}
      </h5>
    </div>
  {/if}
  <div
    class="hover"
    class:on={activeDef === def}
    class:off={activeDef !== def}
    data-seq={def.seq}
  >
    <div class="body" on:click={defClicked}>
      {#if def.category > 0}
        <Keyword text={def.cateName} theme="blue" />
      {/if}<span class="desc">{def.definition}</span>
    </div>
    {#if activeDef === def}
      <DictControl on:command={handleCommand} />
    {/if}
  </div>
  {#if def.seq === 2227243 || def.seq === 2227248}
    <AppIcon class="bookmark" icon="bookmark" filled={true} color="#88c4fb" />
  {/if}
</div>

<style lang="scss">
  .def {
    position: relative;
    padding-left: 12px;
    .title {
      h5 {
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
    .hover {
      position: relative;
      border-radius: 4px;
      border-top-right-radius: 0;
      &.on {
        background-color: #444;
      }
      .body {
        line-height: 1.5;
        padding: 4px;
        cursor: pointer;
        &:hover {
          color: #82b8ff;
        }
        &:active {
          // color: #4b7bbb;
          transform: translate(1px, 1px);
        }
      }
    }
    :global(.bookmark) {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, 0);
      font-size: 18px;
    }
  }
</style>
