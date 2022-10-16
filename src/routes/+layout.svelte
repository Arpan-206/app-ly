<script>
	import { account } from '../scripts/appwrite-client.js';
	import { onMount } from 'svelte';

	let url = ``;

	onMount(() => (url = window.location.href));
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

	function logout() {
		account.deleteSessions();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>App-ly</title>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content="App-ly | Shorten URLs Quickly" />
	<meta property="og:description" content="Shorten Long URLs quickly and easily!" />
	<meta property="og:image" content="/App-ly.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content="App-ly | Shorten URLs Quickly" />
	<meta property="twitter:description" content="Shorten Long URLs quickly and easily!" />
	<meta property="twitter:image" content="/App-ly.png" />
</svelte:head>

<main class="container">
	<nav>
		<ul>
			<li><a href="/"><strong>App-ly</strong></a></li>
		</ul>
		<ul>
			{#if email}<li><a href="/dashboard">My Dashboard</a></li>
				<li>
					<details role="list" dir="rtl">
						<summary aria-haspopup="listbox" role="link">{email}</summary>
						<ul role="listbox">
							<li><button on:click={logout} class="outline secondary">Log out</button></li>
						</ul>
					</details>
				</li>{/if}
			<li>
				{#if !email}
					<a href="/auth/register" role="button" class="outline">Register</a>{' '}
					<a href="/auth/login" role="button">Login</a>
				{/if}
			</li>
		</ul>
	</nav>
	<slot />
</main>
