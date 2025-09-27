#!/usr/bin/env node

const { pbkdf2Sync, randomBytes } = require('node:crypto');

const ITERATIONS = 210000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

function printUsage() {
  console.error('Usage: node scripts/generate-admin-credentials.cjs "your-strong-password"');
}

const password = process.argv[2];

if (typeof password !== 'string' || password.length === 0) {
  printUsage();
  process.exit(1);
}

const salt = randomBytes(16).toString('base64');
const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('base64');

console.log('\nCopy these values into your .env file:');
console.log(`ADMIN_PASSWORD_SALT=${salt}`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log(`ADMIN_PASSWORD_ITERATIONS=${ITERATIONS}`);
console.log('\nRemember to keep them secret and never commit .env files to version control.');
