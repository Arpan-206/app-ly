<script>
	import { account } from '../../../scripts/appwrite-client.js';

	async function registerF(e) {
		const formData = new FormData(e.target);
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('password2');
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		const data = await account.create('unique()', email, password).catch((err) => {
            alert('An error occured');
            return;
        });

		window.location.href = '/';
	}
</script>

<h1>Register</h1>
<form on:submit|preventDefault={registerF}>
	<label for="email">Email address</label>
	<input type="email" id="email" name="email" placeholder="Email address" required />
	<small>We'll never share your email with anyone else.</small>

	<label for="password">Password</label>
	<input type="password" id="password" name="password" placeholder="Password" required />

	<label for="password2">Confirm Password</label>
	<input type="password" id="password2" name="password2" placeholder="Confirm Password" required />
	<button type="submit">Submit</button>
</form>
