import { Client, Databases, Account } from 'appwrite';
import { PUBLIC_AW_ENDPOINT, PUBLIC_AW_PROJECT } from '$env/static/public';

export const client = new Client().setEndpoint(PUBLIC_AW_ENDPOINT).setProject(PUBLIC_AW_PROJECT);

export const db = new Databases(client);

export const account = new Account(client);
