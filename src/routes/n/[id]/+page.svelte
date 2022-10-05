<script>
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
    import { db, account } from '../../../scripts/appwrite-client.js';
    import { PUBLIC_AW_DB, PUBLIC_AW_ANON_COLLECTION } from '$env/static/public';
    let id = null;
    let data = null;
    let error = null;
    onMount(async () => {
        const meh = await account.get();
		if (!meh) {
			const anonUser = await account.createAnonymousSession();
		}
        id = $page.params.id;
        
        data = await db.getDocument(PUBLIC_AW_DB, PUBLIC_AW_ANON_COLLECTION, id).catch((err) => {
            error = err;
        });
        window.location.href = data.long_url;
    });
</script>

{#if error}
    <h1>The Link is invalid</h1>
{:else}
    <h1>Loading...</h1>
{/if}