<svelte:options immutable={true}/>
<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">
</svelte:head>

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
	header {
		font-family: "Special Elite", sans-serif;
	}

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
		margin: 15px;
		font-weight: bold;
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

	<header>
		<h1>svelte-text-converter</h1>
	</header>

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
		<button on:click={() => copied.copy(outputRef)}>Copy</button>
		<button on:click={handleClear}>Clear&nbsp;&times;</button>
	</div >

	<div style="height: 30px;">
		{#if $copied}
		<small style="align-self: center;">Copied!</small>
		{/if}
	</div>

	<div>
		<a 
			href="https://github.com/gojutin/svelte-text-converter" 
			target="_blank" 
			rel="noopener noreferrer"
		>View on GitHub</a>
	</div>

</Layout>