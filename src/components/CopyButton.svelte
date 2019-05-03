<script>
  import {copied} from '../stores';
  export let target;
</script>

<button style="width: 80px;" on:click={() => copied.copy(target)}>
  {#if $copied}
    Copied!
  {:else}
    Copy
  {/if}
</button>
