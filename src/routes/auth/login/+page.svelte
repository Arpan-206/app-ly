<script>
	import { account } from '../../../scripts/appwrite-client.js';

	async function registerF(e) {
		const formData = new FormData(e.target);
		const email = formData.get('email');
		const password = formData.get('password');

		await account.createEmailSession(email, password).catch(() => {
			alert('An error occured');
			return;
		});

		window.location.href = '/';
	}
</script>

<h1>Login</h1>
<form on:submit|preventDefault={registerF}>
	<label for="email">Email address</label>
	<input type="email" id="email" name="email" placeholder="Email address" required />
	<small>We'll never share your email with anyone else.</small>

	<label for="password">Password</label>
	<input type="password" id="password" name="password" placeholder="Password" required />
	<button type="submit">Submit</button>
</form>
