<script>
	import { onMount } from 'svelte';
	import { db, account } from '../../scripts/appwrite-client.js';
	import { PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION } from '$env/static/public';
	import { Query } from 'appwrite';
	let data = null;
	let docs = [];
	function truncate(str, n) {
		return str.length > n ? str.slice(0, n - 1) + '...' : str;
	}
	onMount(async () => {
		const meh = await account.get();
		if (!meh) {
			alert('You are not logged in. Please login to continue.');
			window.location.href = '/login';
		}

		data = await db.listDocuments(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION).catch();
		for (let i = 0; i < data.documents.length; i++) {
			if (data.documents[i].userID === meh.$id) {
				docs.push(data.documents[i]);
				docs = docs;
			}
		}
	});

	async function toggleActive(e) {
		let id = e.target.id;
		id = id.split('-')[1];
		let active = e.target.checked;
		await db.updateDocument(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION, id, {
			active: active
		});
	}

	async function verifyAlias(e) {
		// let id = e.target.id;
		// id = id.split('-')[1];

		let checkAlias = await db
			.listDocuments(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION, [
				Query.equal('alias', [e.target.value])
			])
			.catch(() => {});
		if (checkAlias.total > 0) {
			e.target.ariaInvalid = true;
			return;
		} else {
			e.target.ariaInvalid = false;
		}
		console.log(checkAlias);
	}

	async function changeAlias(e) {
		let id = e.target.id;
		id = id.split('-')[2];
		let alias = document.getElementById('alias-' + id).value;
		await db.updateDocument(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION, id, {
			alias: alias
		});
		document.location.reload();
	}

	async function deleteLink(e) {
		let id = e.target.id;
		id = id.split('-')[1];
		console.log(id);
		await db.deleteDocument(PUBLIC_AW_DB, PUBLIC_AW_LOGIN_COLLECTION, id);
		document.location.reload();
	}
</script>

<h1>My Dashboard</h1>
<div class="container">
	<h2>My Links</h2>
	<table role="grid">
		<thead>
			<tr>
				<th scope="col">Long URL</th>
				<th scope="col">Short URL</th>
				<th scope="col">Clicks</th>
				<th scope="col">Active</th>
				<th scope="col">Alias</th>
				<th scope="col">Delete?</th>
			</tr>
		</thead>
		{#each docs as doc}
			<tbody>
				<tr>
					<td><a href={doc.long_url}>{truncate(doc.long_url, 20)}</a></td>
					<td
						><a
							href={window.location.href.split('//')[0] +
								'//' +
								window.location.href.split('/')[2] +
								'/l/' +
								doc.alias}
							>{window.location.href.split('//')[0] +
								'//' +
								window.location.href.split('/')[2] +
								'/l/' +
								doc.alias}</a
						></td
					>
					<td>{doc.clicks}</td>
					<td
						><input
							type="checkbox"
							id={'active-' + doc.$id}
							name={'active-' + doc.$id}
							checked={doc.active}
							on:change={toggleActive}
						/></td
					>
					<td
						><div class="grid">
							<input value={doc.alias} id={'alias-' + doc.$id} on:change={verifyAlias} /><button
								id={'btn-alias-' + doc.$id}
								class="outline"
								on:click={changeAlias}>Edit!</button
							>
						</div></td
					>
					<td
						><button
							class="outline"
							id={'delete-' + doc.$id}
							style="border-color: #e53935; color: #e53935;"
							on:click={deleteLink}>Delete</button
						></td
					>
				</tr>
			</tbody>
		{:else}
			<p>No links yet, create one over <a href="/">here</a>.</p>
		{/each}
	</table>
</div>
<div>
	<h2>QR Codes for the links</h2>
	{#each docs as doc}
		<div>
			<h3>{doc.alias}</h3>
			<img
				src={`https://api.qrserver.com/v1/create-qr-code/?data=${
					window.location.href.split('/d')[0] + 'n/' + doc.alias
				}&color=3949ab`}
				alt="QR Code"
				style="width: 200px; height: 100%;"
			/>
		</div>
		<br />
	{/each}
</div>
