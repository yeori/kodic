<script>
  import { tick } from 'svelte'
  import { writable } from 'svelte/store'
  import GroupDefinitionView from '../component/GroupDefinitionView.svelte'
  // import api from '../service/api'
  import search, { currentSearch } from '../store/search-store'

  let inputEl
  let keyword
  let activeDef
  let activeGroup

  const keywords = writable([])

  let defToCopy = null
  let textArea

  const searchWord = (/** @type {String} */ word) => {
    search.searchWord(word)
  }
  const typing = () => {
    // console.log(inputEl.value)
  }

  const typed = () => {
    console.log('[word]', keyword)
    const kw = keyword.trim()
    if (!kw) {
      return
    }

    keywords.update((arr) => {
      arr.push(kw)
      return arr
    })
    inputEl.value = ''
    searchWord(kw)
  }
  const setActiveDef = (e) => {
    if (activeDef === e.detail) {
      activeDef = null
    } else {
      activeDef = e.detail
    }
    activeGroup = null
  }
  const setActiveGroup = (e) => {
    activeDef = null
    if (activeGroup === e.detail) {
      activeGroup = null
    } else {
      activeGroup = e.detail
    }
  }
  const copyToClipboard = (content) => {
    tick().then(() => {
      textArea.value = content
      textArea.select()
      document.execCommand('copy')
      defToCopy = null
    })
  }
  const copyDefinition = (e) => {
    const def = e.detail
    const content = def.toText()
    defToCopy = def
    copyToClipboard(content)
  }
  const copyGroup = (e) => {
    const group = e.detail
    const content = group.toText()
    defToCopy = group
    copyToClipboard(content)
  }
</script>

<div class="search">
  {#if defToCopy}
    <textarea class="buf" bind:this={textArea} />
  {/if}
  <div class="inner">
    <form on:submit|preventDefault={typed}>
      <input
        type="text"
        bind:this={inputEl}
        bind:value={keyword}
        on:input={typing}
      />
    </form>
  </div>
  {#if $currentSearch}
    <div class="result">
      <div class="max-width">
        {#if $currentSearch.pending}
          <div class="pending">검색중</div>
        {:else}
          <div class="groups">
            {#each $currentSearch.groups as group}
              <GroupDefinitionView
                {group}
                bind:activeDef
                bind:activeGroup
                on:selected={setActiveDef}
                on:selectGroup={setActiveGroup}
                on:copy={copyDefinition}
                on:copy-group={copyGroup}
              />
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .search {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    .buf {
      position: fixed;
      width: 0;
      height: 0;
      top: -100px;
      left: -100px;
      overflow: hidden;
      appearance: none;
      border: none;
      background-color: transparent;
      resize: none;
    }
    .inner {
      padding: 8px 0;
      form {
        display: flex;
        justify-content: center;
        input {
          // appearance: none;
          background-color: aliceblue;
          border: none;
          outline: none;
          padding: 4px 8px;
          color: black;
          font-size: 1.25rem;
        }
      }
    }
    .result {
      font-size: 1rem;
      font-weight: 300;
      flex: 1 1 auto;
      overflow-y: auto;
      padding: 8px 0px 32px;
      .max-width {
        max-width: 560px;
        margin: auto;
        .groups {
          display: flex;
          flex-direction: column;
          row-gap: 8px;
        }
      }
    }
  }
</style>
