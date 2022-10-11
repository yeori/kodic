<script>
  import AppIcon from './AppIcon.svelte'
  import { createEventDispatcher } from 'svelte'
  export let pos = { top: true, left: false }
  export let copy = true
  export let tts = true
  export let bookmark = true
  const btn = {
    size: '16px',
  }
  const ed = createEventDispatcher()
  const dispatch = (/** @type {string} */ command) => {
    ed('command', { type: command })
  }
</script>

<div
  class="ctrl"
  class:top={pos.top}
  class:left={pos.left}
  class:right={!pos.left}
>
  {#if copy}
    <button class="nude" on:click={() => dispatch('copy')}
      ><AppIcon icon="content_copy" filled={true} fsize={btn.size} /></button
    >
  {/if}
  {#if tts}
    <button class="nude" on:click={() => dispatch('tts')}
      ><AppIcon
        icon="record_voice_over"
        filled={true}
        fsize={btn.size}
      /></button
    >
  {/if}
  {#if bookmark}
    <button class="nude" on:click={() => dispatch('bookmark')}
      ><AppIcon icon="bookmark" filled={true} fsize={btn.size} /></button
    >
  {/if}
  <div class="round" />
</div>

<style lang="scss">
  .ctrl {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    column-gap: 2px;
    transform: translate(0px, calc(-100%));
    background-color: #444;
    // padding: 4px 8px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    button.nude {
      padding: 4px 6px;
      color: #c0d2ea;
      &:hover {
        color: #8abdff;
      }
      &:active {
        color: #4274b6;
      }
    }
    .round {
      display: block;
      width: 4px;
      height: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-color: #444;
      pointer-events: none;
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #242424;
        border-bottom-right-radius: 100%;
      }
    }
  }
</style>
