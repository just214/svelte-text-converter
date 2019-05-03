<svelte:options immutable={true}/>
<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">
</svelte:head>

<script>
	import Layout from './components/Layout.svelte';
	import Counts from './components/Counts.svelte';
	import CopyButton from './components/CopyButton.svelte';
	import options from './lib/options.js';
	import Case from './lib/case.min.js'; // Case is available on the global window.

	// Input
	let inputValue = "";
	let inputProps = {
		name: 'input-value',
		rows: 5,
		placeholder: 'Enter your text here',
		['aria-label']: 'input-value',
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
		['aria-label']: 'output-value',
	}

	// Clear
	const handleClear = () => {
		if (window.confirm("Are you sure you want to clear the value?")) {
			inputValue = ""
		}
	}
</script>

<style>
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
		margin: 15px;
		font-weight: bold;
	}

	div.button-wrapper {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	/* The button styles are global so they can be shared by the copy-button component */
	:global(button) {
		border-radius: 16px;
		padding: 3px 8px;
		cursor: pointer;
		margin: 5px;
	}

	:global(button:hover) {
		opacity: .8
	}

</style>

<Layout>

	<h1 slot="header">svelte-text-converter</h1>

	<textarea {...inputProps} bind:value={inputValue}  />

	<select name="conversion-type" aria-label="Conversion Type" bind:value={selection}>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>

	<textarea 
		{...outputProps} 
		bind:value={outputValue} 
		bind:this={outputRef} 
	/>

	<div class="button-wrapper">
		<Counts {inputValue} />
	</div>

	<div class="button-wrapper">
		<CopyButton target={outputRef}/>
		<button on:click={handleClear}>Clear&nbsp;&times;</button>
	</div >

	<a 
		slot="footer"
		href="https://github.com/gojutin/svelte-text-converter" 
		target="_blank" 
		rel="noopener noreferrer"
	>View on GitHub</a>


</Layout>