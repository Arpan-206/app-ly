<script>
	import { db, account } from '../scripts/appwrite-client.js';

	import { ID, Query } from 'appwrite';
	import {
		PUBLIC_AW_DB,
		PUBLIC_AW_ANON_COLLECTION,
		PUBLIC_AW_LOGIN_COLLECTION
	} from '$env/static/public';

	let short_url = '';
    let logged = false;
	async function shorten(e) {
		const formData = new FormData(e.target);
		const long_url = formData.get('long_url');
		let meh = await account.get().catch();
		
		if (!meh) {
			const anonUser = await account.createAnonymousSession();
			meh = await account.get().catch();
		}
		if (meh.email === '') {
			logged = false;
		} else {
			logged = true;
		}
		if (!logged) {
			const data = await db
				.createDocument(PUBLIC_AW_DB, PUBLIC_AW_ANON_COLLECTION, ID.unique(), {
					long_url: long_url
				})
				.catch((err) => {
					alert('An error occured');
				});
			short_url = window.location.href + 'n/' + data.$id;
			document.querySelector('dialog').open = true;
		} else {
            let mStr = Math.random().toString(36).substring(2,7);
            let checkAlias = await db
			.listDocuments(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION, [
				Query.equal('alias', [mStr])
			])
			.catch((err) => {});
            if (checkAlias.total > 0) {
                mStr = Math.random().toString(36).substring(2,7);
            }
			const data = await db
				.createDocument(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION, ID.unique(), {
					long_url: long_url,
                    userID: meh.$id,
                    alias: mStr
				})
				.catch((err) => {
					alert('An error occured');
				});
			short_url = window.location.href + 'l/' + data.alias;
			document.querySelector('dialog').open = true;
		}
	}

	function closeDialog() {
		document.querySelector('dialog').open = false;
	}
</script>

<h1>App-ly</h1>
<p>App-ly is a basic app to create short links.</p>
<div>
	<form on:submit|preventDefault={shorten}>
		<label for="long_url">
			URL
			<input type="url" id="long_url" name="long_url" placeholder="https://example.com" required />
		</label>
		<button type="submit">Shorten</button>
	</form>
	<dialog>
		<article>
			<header>
				<button aria-label="Close" class="close outline" on:click={closeDialog} />
				Your URL
			</header>
			<p id="url-para">
				This is your shortened URL:
				<a href={short_url} id="short-url">{short_url}</a>
            {#if logged}
                <br/>
                You can change the link in the <a href="/dashboard">dashboard</a>!
            {/if}
			</p>
		</article>
	</dialog>
</div>
