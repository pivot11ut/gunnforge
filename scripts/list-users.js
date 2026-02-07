#!/usr/bin/env node

/**
 * List Users Script
 *
 * Usage:
 *   node scripts/list-users.js
 */

const fs = require('fs');
const path = require('path');

// Read existing users
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

try {
  const fileContent = fs.readFileSync(usersPath, 'utf-8');
  const usersData = JSON.parse(fileContent);

  console.log('\n📋 Current Users:\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (usersData.users.length === 0) {
    console.log('  No users found');
  } else {
    usersData.users.forEach(user => {
      console.log(`  ID: ${user.id} | Username: ${user.username}`);
    });
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n  Total users: ${usersData.users.length}\n`);
} catch (error) {
  console.error('❌ Error reading users.json:', error.message);
  process.exit(1);
}
