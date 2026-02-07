#!/usr/bin/env node

/**
 * Remove User Script
 *
 * Usage:
 *   node scripts/remove-user.js <username>
 *
 * Example:
 *   node scripts/remove-user.js john
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('\n❌ Error: Invalid arguments');
  console.log('\nUsage:');
  console.log('  node scripts/remove-user.js <username>');
  console.log('\nExample:');
  console.log('  node scripts/remove-user.js john\n');
  process.exit(1);
}

const username = args[0];

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

// Find user
const userIndex = usersData.users.findIndex(u => u.username === username);

if (userIndex === -1) {
  console.error(`❌ User "${username}" not found`);
  process.exit(1);
}

// Remove user
const removedUser = usersData.users[userIndex];
usersData.users.splice(userIndex, 1);

// Write back to file
try {
  fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2) + '\n');
  console.log('\n✅ User removed successfully!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Username: ${removedUser.username}`);
  console.log(`  User ID:  ${removedUser.id}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
} catch (error) {
  console.error('❌ Error writing users.json:', error.message);
  process.exit(1);
}
