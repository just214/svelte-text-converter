<script>
  export let inputValue;
  $: counts = [
    {
      label: "Character Count",
      value: inputValue.length
    },
    {
      label: "Word Count",
      value: inputValue ? inputValue.trim().split(/\s+/).length : 0
    }
  ];
</script>

<style>
  span.tag {
    text-align: center;
    border-radius: 12px;
    background: steelblue;
    color: rgb(236, 241, 245);
    margin: 10px;
    padding: 4px 8px;
    width: 200px;
    font-weight: bold;
  }
</style>

{#each counts as count}
<span class="tag">{count.label}: {count.value} </span>
{/each}
