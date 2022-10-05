<script>
	import { account } from '../scripts/appwrite-client.js';
	import { onMount } from 'svelte';
	import '@picocss/pico/css/pico.min.css';
	let email = null;
	onMount(async () => {
		const meh = await account.get().catch();
		if (!meh) {
			return;
		}
		if (meh.email === '') {
			return;
		}
		email = meh.email;
	});
</script>

<svelte:head>
	<title>App-ly</title>
</svelte:head>

<main class="container">
	<nav>
		<ul>
			<li><a href="/"><strong>App-ly</strong></a></li>
		</ul>
		<ul>
			{#if email}<li><a href="/dashboard">My Dashboard</a></li>{/if}
			<li>
				{#if !email}<a href="/auth/register" role="button" class="outline">Register</a>{' '}
					<a href="/auth/login" role="button">Login</a>{:else}{email}{/if}
			</li>
		</ul>
	</nav>
	<slot />
</main>
