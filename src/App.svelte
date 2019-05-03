<svelte:options immutable={true}/>

<script>
	import Layout from './components/layout.svelte';
	import Counts from './components/counts.svelte';
	import options from './lib/options.js';
	import Case from './lib/case.min.js'; // Case is available on the global window.
	import {copied} from './stores';

	// Input
	let inputValue = "";
	let inputProps = {
		name: 'input-value',
		placeholder: 'Enter your text here',
		rows: 5,
	}

	// Selection
	let selection = "upper";

	// Output
	let outputRef;
	$: caseFn = Case[selection];
	$: outputValue = caseFn(inputValue);
	let outputProps = {
		name: 'output-value',
		placeholder: 'Your converted text will appear here',
		rows: 5,
		readonly: true,
	}

	// Clear
	const handleClear = () => {
		if (window.confirm("Are you sure you want to clear the value?")) {
			inputValue = ""
		}
	}

</script>

<style>
	label {
		font-weight: bold;
		margin-bottom: 5px;
	}
  textarea {
		width: 100%;
		border-radius: 10px;
		border: 2px solid #333;
		font-size: 20px;
	}

	textarea:read-only {
		color: #fff;
		background: #333;
	}

	select {
		width: 200px;
		height: 40px;
		margin-bottom: 15px;
	}

	div.button-wrapper {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	button {
		border-radius: 16px;
		padding: 3px 8px;
		cursor: pointer;
		margin: 5px;
	}
	button:hover {
		opacity: .8
	}
</style>

<Layout>

<label for={inputProps.name}>INPUT</label>
<textarea {...inputProps} bind:value={inputValue}  />

<label for="conversion-type">CONVERSION</label>
<select name="conversion-type" bind:value={selection}>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<label for={outputProps.name}>OUTPUT</label>
<textarea 
	{...outputProps} 
	bind:value={outputValue} 
	bind:this={outputRef} 
/>
<div class="button-wrapper">
	<Counts {inputValue} />
</div>

<div class="button-wrapper">
	<button on:click={() => copied.copy(outputRef)}>Copy</button>
	<button on:click={handleClear}>Clear&nbsp;&times;</button>
</div >

<div style="text-align: center;height: 30px;">
	{#if $copied}
	<small style="align-self: center;">Copied!</small>
	{/if}
</div>

<div style="text-align: center">
	<a 
		href="https://github.com/gojutin/svelte-text-converter" 
		target="_blank" 
		rel="noopener noreferrer"
	>View on GitHub</a>
</div>


</Layout>