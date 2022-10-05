<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { db, account } from '../../../scripts/appwrite-client.js';
	import { PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION } from '$env/static/public';
	let alias = null;
	let data = null;
	let error = null;
	onMount(async () => {
		const meh = await account.get();
		if (!meh) {
			const anonUser = await account.createAnonymousSession();
		}
		alias = $page.params.alias;

		data = await db.listDocuments(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION).catch((err) => {
			error = err;
		});
		for (let i = 0; i < data.documents.length; i++) {
			if (data.documents[i].alias === alias) {
				let datad = data.documents[i];
				if (datad.active) {
					window.location.href = data.documents[i].long_url;
				}
                else
                {
                    alert('This link is inactive. Please contact the owner of this link to activate it.');
                    return;
                }
			}
		}
	});
</script>

{#if error}
	<h1>The Link is invalid</h1>
{:else}
	<h1>Loading...</h1>
{/if}
