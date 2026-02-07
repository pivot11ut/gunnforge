#!/usr/bin/env node

/**
 * Add User Script
 *
 * Usage:
 *   node scripts/add-user.js <username> <password>
 *
 * Example:
 *   node scripts/add-user.js john SecurePassword123!
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('\n❌ Error: Invalid arguments');
  console.log('\nUsage:');
  console.log('  node scripts/add-user.js <username> <password>');
  console.log('\nExample:');
  console.log('  node scripts/add-user.js john SecurePassword123!\n');
  process.exit(1);
}

const [username, password] = args;

// Validate inputs
if (username.length < 3) {
  console.error('❌ Username must be at least 3 characters long');
  process.exit(1);
}

if (password.length < 8) {
  console.error('❌ Password must be at least 8 characters long');
  process.exit(1);
}

// Read existing users
const usersPath = path.join(__dirname, '..', 'data', 'users.json');
let usersData;

try {
  const fileContent = fs.readFileSync(usersPath, 'utf-8');
  usersData = JSON.parse(fileContent);
} catch (error) {
  console.error('❌ Error reading users.json:', error.message);
  process.exit(1);
}

// Check if username already exists
const existingUser = usersData.users.find(u => u.username === username);
if (existingUser) {
  console.error(`❌ User "${username}" already exists`);
  process.exit(1);
}

// Generate new user ID
const maxId = Math.max(...usersData.users.map(u => parseInt(u.id)), 0);
const newId = (maxId + 1).toString();

// Hash the password
console.log('🔐 Hashing password...');
const passwordHash = bcrypt.hashSync(password, 10);

// Create new user object
const newUser = {
  id: newId,
  username: username,
  passwordHash: passwordHash
};

// Add new user to array
usersData.users.push(newUser);

// Write back to file
try {
  fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2) + '\n');
  console.log('\n✅ User added successfully!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Username: ${username}`);
  console.log(`  Password: ${password}`);
  console.log(`  User ID:  ${newId}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('⚠️  Make sure to save this password securely!');
  console.log('💡 Tip: The user can now login at /login\n');
} catch (error) {
  console.error('❌ Error writing users.json:', error.message);
  process.exit(1);
}
