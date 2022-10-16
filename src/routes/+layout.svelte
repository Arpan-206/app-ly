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

    function logout(e) {
        account.deleteSessions();
        window.location.href = '/';
    }
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
			{#if email}<li><a href="/dashboard">My Dashboard</a></li>
			<li>
				<details role="list" dir="rtl">
					<summary aria-haspopup="listbox" role="link"
						>{email}</summary
					>
					<ul role="listbox">
						<li><button on:click={logout}>Log out</button></li>
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
