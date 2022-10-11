<script>
  import DictEntryView from './DictEntryView.svelte'
  import Keyword from './Keyword.svelte'
  import { createEventDispatcher } from 'svelte'
  import DictControl from './DictControl.svelte'
  export let group
  export let activeDef = null
  export let activeGroup = null

  const dispatch = createEventDispatcher()

  const first = group.definitions[0]
  const setActiveDef = (e) => dispatch('selected', e.detail)
  const showControl = () => dispatch('selectGroup', group)
  const handleCommand = (e) => {
    const command = e.detail.type
    if (command === 'copy') {
      dispatch('copy-group', group)
    }
  }
</script>

<div class="group">
  <div class="title">
    <h5>
      <span class="word" on:click={showControl}>{first.word}</span
      >{#if first.hanja}
        <Keyword text={first.hanja} />
      {/if}
    </h5>
  </div>
  <div class="defs" class:active={activeGroup === group}>
    <div class="bar" />
    {#each group.definitions as definition}
      <DictEntryView
        def={definition}
        titleVisible={false}
        bind:activeDef
        on:selected={setActiveDef}
        on:copy={(e) => dispatch('copy', e.detail)}
      />
    {/each}
    {#if activeGroup === group}
      <DictControl tts={false} on:command={handleCommand} />
    {/if}
  </div>
</div>

<style lang="scss">
  .group {
    padding: 0 16px;
    position: relative;
    .title {
      h5 {
        font-size: 1.1rem;
        font-weight: 400;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        column-gap: 8px;
        .word {
          cursor: pointer;
          &:hover {
            color: #82b8ff;
          }
          &:active {
            color: #4b7bbb;
            transform: translate(1px, 1px);
          }
        }
      }
    }
    .defs {
      position: relative;
      .bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        bottom: 0;
        background-color: #3e6ca5;
      }
      &.active {
        background-color: #444;
      }
    }
  }
</style>
